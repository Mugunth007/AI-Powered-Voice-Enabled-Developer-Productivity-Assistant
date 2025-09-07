import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export class HuggingFaceAPI {
  static async generateCode(prompt: string, language: string = 'javascript') {
    try {
      const response = await hf.textGeneration({
        model: 'bigcode/starcoder2-15b',
        inputs: `// Language: ${language}\n// Task: ${prompt}\n`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.1,
          do_sample: true,
          return_full_text: false,
        }
      });

      return {
        code: response.generated_text,
        confidence: 0.85,
        language,
      };
    } catch (error) {
      console.error('Code generation error:', error);
      throw new Error('Failed to generate code');
    }
  }

  static async completeCode(code: string, language: string = 'javascript') {
    try {
      const response = await hf.textGeneration({
        model: 'bigcode/starcoder2-7b',
        inputs: code,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.1,
          do_sample: true,
          return_full_text: false,
        }
      });

      return {
        completion: response.generated_text,
        confidence: 0.9,
      };
    } catch (error) {
      console.error('Code completion error:', error);
      throw new Error('Failed to complete code');
    }
  }

  static async textToSpeech(text: string) {
    try {
      const response = await hf.textToSpeech({
        model: 'microsoft/speecht5_tts',
        inputs: text,
      });

      return response;
    } catch (error) {
      console.error('Text-to-speech error:', error);
      throw new Error('Failed to convert text to speech');
    }
  }

  static async speechToText(audioBlob: Blob) {
    try {
      const response = await hf.automaticSpeechRecognition({
        model: 'openai/whisper-small',
        data: audioBlob,
      });

      return response.text;
    } catch (error) {
      console.error('Speech-to-text error:', error);
      throw new Error('Failed to convert speech to text');
    }
  }

  static async analyzeCode(code: string) {
    try {
      const response = await hf.textGeneration({
        model: 'microsoft/DialoGPT-large',
        inputs: `Analyze this code and provide feedback:\n${code}\n\nAnalysis:`,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.3,
          do_sample: true,
        }
      });

      return response.generated_text;
    } catch (error) {
      console.error('Code analysis error:', error);
      throw new Error('Failed to analyze code');
    }
  }

  static async createWorkflow(description: string) {
    try {
      const response = await hf.textGeneration({
        model: 'microsoft/DialoGPT-large',
        inputs: `Create a development workflow for: ${description}\n\nWorkflow steps:`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.4,
          do_sample: true,
        }
      });

      return response.generated_text;
    } catch (error) {
      console.error('Workflow creation error:', error);
      throw new Error('Failed to create workflow');
    }
  }

  static async chatWithAssistant(message: string, context: string = '') {
    try {
      const prompt = `${context}\nUser: ${message}\nAssistant:`;
      const response = await hf.textGeneration({
        model: 'microsoft/DialoGPT-large',
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false,
        }
      });

      return response.generated_text.trim();
    } catch (error) {
      console.error('Chat error:', error);
      throw new Error('Failed to get assistant response');
    }
  }
}