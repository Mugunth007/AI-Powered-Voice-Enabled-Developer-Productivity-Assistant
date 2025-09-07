export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export interface AIResponse {
  id: string;
  message: string;
  timestamp: Date;
  type: 'code' | 'text' | 'workflow' | 'voice';
  metadata?: any;
}

export interface CodeSuggestion {
  id: string;
  code: string;
  language: string;
  confidence: number;
  context: string;
}

export interface WorkflowTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: any;
}

export interface Metrics {
  totalInteractions: number;
  successRate: number;
  averageResponseTime: number;
  codeCompletionAccuracy: number;
  workflowsCompleted: number;
  voiceInteractions: number;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  aiResponses: AIResponse[];
  currentWorkflows: WorkflowTask[];
  metrics: Metrics;
  isVoiceRecording: boolean;
  isProcessing: boolean;
  error: string | null;
}