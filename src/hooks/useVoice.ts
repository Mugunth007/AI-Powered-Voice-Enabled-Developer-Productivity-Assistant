import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { audioManager } from '../utils/audio';
import { HuggingFaceAPI } from '../utils/huggingface';
import toast from 'react-hot-toast';

export function useVoice() {
  const { setVoiceRecording, setProcessing, addAIResponse } = useApp();
  const [isListening, setIsListening] = useState(false);

  const startRecording = useCallback(async () => {
    try {
      setIsListening(true);
      setVoiceRecording(true);
      await audioManager.startRecording();
      toast.success('Recording started...');
    } catch (error) {
      console.error('Failed to start recording:', error);
      toast.error('Failed to access microphone');
      setIsListening(false);
      setVoiceRecording(false);
    }
  }, [setVoiceRecording]);

  const stopRecording = useCallback(async () => {
    try {
      setIsListening(false);
      setVoiceRecording(false);
      setProcessing(true);

      const audioBlob = await audioManager.stopRecording();
      
      // Convert speech to text
      const transcribedText = await HuggingFaceAPI.speechToText(audioBlob);
      toast.success('Voice transcribed!');

      // Get AI response
      const aiResponse = await HuggingFaceAPI.chatWithAssistant(
        transcribedText,
        'You are a helpful AI development assistant. Provide concise, practical advice.'
      );

      // Convert response to speech
      const speechBlob = await HuggingFaceAPI.textToSpeech(aiResponse);
      
      // Play the response
      await audioManager.playAudioBlob(speechBlob);

      // Add to context
      addAIResponse({
        message: `User: ${transcribedText}\n\nAssistant: ${aiResponse}`,
        type: 'voice',
        metadata: { transcription: transcribedText, response: aiResponse }
      });

      toast.success('Voice interaction completed!');
    } catch (error) {
      console.error('Voice processing error:', error);
      toast.error('Failed to process voice input');
    } finally {
      setProcessing(false);
    }
  }, [setVoiceRecording, setProcessing, addAIResponse]);

  return {
    isListening,
    startRecording,
    stopRecording,
  };
}