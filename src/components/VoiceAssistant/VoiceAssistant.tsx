import React, { useState } from 'react';
import { useVoice } from '../../hooks/useVoice';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Zap } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';

export function VoiceAssistant() {
  const { isListening, startRecording, stopRecording } = useVoice();
  const { isVoiceRecording, isProcessing, aiResponses } = useApp();
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const voiceInteractions = aiResponses.filter(response => response.type === 'voice');

  const handleVoiceToggle = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-apple-gray-800 mb-4">Voice Assistant</h1>
        <p className="text-apple-gray-600 text-lg">
          Interact with your AI assistant using natural voice commands
        </p>
      </div>

      {/* Voice Control Panel */}
      <div className="card text-center space-y-6">
        <div className="flex justify-center">
          <button
            onClick={handleVoiceToggle}
            disabled={isProcessing}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 recording-pulse'
                : 'bg-apple-blue hover:bg-blue-600'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''} shadow-lg hover:shadow-xl`}
          >
            {isProcessing ? (
              <LoadingSpinner size="lg" className="text-white" />
            ) : isListening ? (
              <MicOff className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-apple-gray-800">
            {isProcessing ? 'Processing...' : isListening ? 'Listening...' : 'Tap to speak'}
          </h2>
          <p className="text-apple-gray-600">
            {isProcessing 
              ? 'AI is analyzing your request'
              : isListening 
              ? 'Speak now, tap again to stop'
              : 'Hold to record your voice command'
            }
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              isSpeakerOn
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-apple-gray-50 text-apple-gray-600 border border-apple-gray-200'
            }`}
          >
            {isSpeakerOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{isSpeakerOn ? 'Speaker On' : 'Speaker Off'}</span>
          </button>
        </div>
      </div>

      {/* Voice Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
            isVoiceRecording ? 'bg-red-50 text-red-500' : 'bg-apple-gray-100 text-apple-gray-400'
          }`}>
            <Mic className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-apple-gray-800 mb-1">Voice Input</h3>
          <p className="text-sm text-apple-gray-600">
            {isVoiceRecording ? 'Recording active' : 'Ready to listen'}
          </p>
        </div>

        <div className="card text-center">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
            isProcessing ? 'bg-blue-50 text-apple-blue' : 'bg-apple-gray-100 text-apple-gray-400'
          }`}>
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-apple-gray-800 mb-1">AI Processing</h3>
          <p className="text-sm text-apple-gray-600">
            {isProcessing ? 'Analyzing request' : 'Standby mode'}
          </p>
        </div>

        <div className="card text-center">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
            isSpeakerOn ? 'bg-green-50 text-green-500' : 'bg-apple-gray-100 text-apple-gray-400'
          }`}>
            <Volume2 className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-apple-gray-800 mb-1">Audio Output</h3>
          <p className="text-sm text-apple-gray-600">
            {isSpeakerOn ? 'Speaker enabled' : 'Speaker disabled'}
          </p>
        </div>
      </div>

      {/* Conversation History */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <MessageCircle className="w-5 h-5 text-apple-gray-600" />
          <h2 className="text-xl font-semibold text-apple-gray-800">Conversation History</h2>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {voiceInteractions.length > 0 ? (
            voiceInteractions.map((interaction) => (
              <div key={interaction.id} className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-apple-blue text-white px-4 py-2 rounded-2xl rounded-tr-md max-w-xs">
                    {interaction.metadata?.transcription}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-apple-gray-100 text-apple-gray-800 px-4 py-2 rounded-2xl rounded-tl-md max-w-xs">
                    {interaction.metadata?.response}
                  </div>
                </div>
                <div className="text-xs text-apple-gray-500 text-center">
                  {interaction.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-apple-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-apple-gray-300" />
              <p>No voice conversations yet. Start speaking to see your interactions here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}