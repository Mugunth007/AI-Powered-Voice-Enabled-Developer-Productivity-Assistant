import { useState, useCallback } from 'react';
import { HuggingFaceAPI } from '../utils/huggingface';
import { CodeSuggestion } from '../types';
import toast from 'react-hot-toast';

export function useCodeCompletion() {
  const [suggestions, setSuggestions] = useState<CodeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCodeCompletion = useCallback(async (code: string, language: string = 'javascript') => {
    try {
      setIsLoading(true);
      const result = await HuggingFaceAPI.completeCode(code, language);
      
      const suggestion: CodeSuggestion = {
        id: Date.now().toString(),
        code: result.completion,
        language,
        confidence: result.confidence,
        context: code,
      };

      setSuggestions(prev => [suggestion, ...prev.slice(0, 4)]); // Keep last 5 suggestions
      return suggestion;
    } catch (error) {
      console.error('Code completion error:', error);
      toast.error('Failed to get code completion');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateCode = useCallback(async (prompt: string, language: string = 'javascript') => {
    try {
      setIsLoading(true);
      const result = await HuggingFaceAPI.generateCode(prompt, language);
      
      const suggestion: CodeSuggestion = {
        id: Date.now().toString(),
        code: result.code,
        language: result.language,
        confidence: result.confidence,
        context: prompt,
      };

      setSuggestions(prev => [suggestion, ...prev.slice(0, 4)]);
      return suggestion;
    } catch (error) {
      console.error('Code generation error:', error);
      toast.error('Failed to generate code');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeCode = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      const analysis = await HuggingFaceAPI.analyzeCode(code);
      toast.success('Code analysis completed!');
      return analysis;
    } catch (error) {
      console.error('Code analysis error:', error);
      toast.error('Failed to analyze code');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    suggestions,
    isLoading,
    getCodeCompletion,
    generateCode,
    analyzeCode,
    setSuggestions,
  };
}