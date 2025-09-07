import React, { useState } from 'react';
import { useCodeCompletion } from '../../hooks/useCodeCompletion';
import { useApp } from '../../context/AppContext';
import { Code, Play, FileText, Lightbulb, Copy, Check } from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import toast from 'react-hot-toast';

export function CodeCompletion() {
  const { suggestions, isLoading, getCodeCompletion, generateCode, analyzeCode } = useCodeCompletion();
  const { addAIResponse } = useApp();
  
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCodeCompletion = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code first');
      return;
    }

    try {
      const suggestion = await getCodeCompletion(code, language);
      addAIResponse({
        message: `Code completion for ${language}:\n${suggestion.code}`,
        type: 'code',
        metadata: { suggestion, language }
      });
      toast.success('Code completion generated!');
    } catch (error) {
      toast.error('Failed to generate code completion');
    }
  };

  const handleCodeGeneration = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }

    try {
      const suggestion = await generateCode(prompt, language);
      addAIResponse({
        message: `Generated code for "${prompt}":\n${suggestion.code}`,
        type: 'code',
        metadata: { suggestion, prompt, language }
      });
      toast.success('Code generated successfully!');
    } catch (error) {
      toast.error('Failed to generate code');
    }
  };

  const handleCodeAnalysis = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to analyze');
      return;
    }

    try {
      const result = await analyzeCode(code);
      setAnalysis(result);
      addAIResponse({
        message: `Code analysis:\n${result}`,
        type: 'code',
        metadata: { analysis: result, code, language }
      });
    } catch (error) {
      toast.error('Failed to analyze code');
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-apple-gray-800 mb-4">Code Assistant</h1>
        <p className="text-apple-gray-600 text-lg">
          Get intelligent code completions, generations, and analysis powered by AI
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Input Section */}
        <div className="space-y-6">
          {/* Language Selection */}
          <div className="card">
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Programming Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
            </select>
          </div>

          {/* Code Input */}
          <div className="card">
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Your Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Enter your ${language} code here...`}
              className="input-field h-48 font-mono text-sm resize-none"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleCodeCompletion}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                {isLoading ? <LoadingSpinner size="sm" className="text-white" /> : <Play className="w-4 h-4" />}
                <span>Complete Code</span>
              </button>
              <button
                onClick={handleCodeAnalysis}
                disabled={isLoading}
                className="btn-secondary flex items-center space-x-2"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : <FileText className="w-4 h-4" />}
                <span>Analyze</span>
              </button>
            </div>
          </div>

          {/* Code Generation */}
          <div className="card">
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Generate Code from Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to build... (e.g., 'Create a function that validates email addresses')"
              className="input-field h-32 resize-none"
            />
            <button
              onClick={handleCodeGeneration}
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2 mt-4"
            >
              {isLoading ? <LoadingSpinner size="sm" className="text-white" /> : <Lightbulb className="w-4 h-4" />}
              <span>Generate Code</span>
            </button>
          </div>
        </div>

        {/* Right Column - Results Section */}
        <div className="space-y-6">
          {/* Code Analysis Results */}
          {analysis && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-apple-gray-800 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Code Analysis</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(analysis, 'analysis')}
                  className="p-2 hover:bg-apple-gray-100 rounded-lg transition-colors duration-200"
                >
                  {copiedId === 'analysis' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-apple-gray-500" />}
                </button>
              </div>
              <div className="bg-apple-gray-50 rounded-xl p-4 whitespace-pre-wrap text-sm text-apple-gray-700">
                {analysis}
              </div>
            </div>
          )}

          {/* Code Suggestions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-apple-gray-800 mb-4 flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Code Suggestions</span>
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border border-apple-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium px-2 py-1 bg-apple-gray-100 text-apple-gray-600 rounded-lg">
                          {suggestion.language}
                        </span>
                        <span className="text-xs text-apple-gray-500">
                          Confidence: {(suggestion.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(suggestion.code, suggestion.id)}
                        className="p-1 hover:bg-apple-gray-100 rounded transition-colors duration-200"
                      >
                        {copiedId === suggestion.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-apple-gray-500" />}
                      </button>
                    </div>
                    
                    <pre className="bg-apple-gray-50 rounded-lg p-3 text-sm font-mono overflow-x-auto text-apple-gray-800">
                      {suggestion.code}
                    </pre>
                    
                    {suggestion.context && (
                      <div className="mt-2 text-xs text-apple-gray-500 bg-white p-2 rounded border-l-2 border-apple-blue">
                        Context: {suggestion.context}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-apple-gray-500">
                  <Code className="w-12 h-12 mx-auto mb-3 text-apple-gray-300" />
                  <p>No suggestions yet. Try completing some code or generating from a prompt!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}