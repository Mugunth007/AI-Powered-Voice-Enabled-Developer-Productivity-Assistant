import React from 'react';
import { Brain, Zap } from 'lucide-react';

interface HeaderProps {
  activeView: string;
}

const viewTitles = {
  'dashboard': 'Dashboard',
  'voice-assistant': 'Voice Assistant',
  'code-completion': 'Code Assistant',
  'workflows': 'Workflow Automation',
  'metrics': 'Performance Metrics',
  'settings': 'Settings',
};

export function Header({ activeView }: HeaderProps) {
  return (
    <header className="bg-white border-b border-apple-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-apple-blue to-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-apple-gray-800">AI Assistant</span>
          </div>
          <div className="h-6 w-px bg-apple-gray-200" />
          <h1 className="text-xl font-semibold text-apple-gray-800">
            {viewTitles[activeView as keyof typeof viewTitles] || 'Dashboard'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">AI Online</span>
        </div>
      </div>
    </header>
  );
}