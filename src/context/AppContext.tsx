import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AIResponse, WorkflowTask, Metrics } from '../types';

interface AppContextType extends AppState {
  addAIResponse: (response: Omit<AIResponse, 'id' | 'timestamp'>) => void;
  updateWorkflowTask: (id: string, updates: Partial<WorkflowTask>) => void;
  addWorkflowTask: (task: Omit<WorkflowTask, 'id'>) => void;
  setVoiceRecording: (recording: boolean) => void;
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  updateMetrics: (metrics: Partial<Metrics>) => void;
}

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  aiResponses: [],
  currentWorkflows: [],
  metrics: {
    totalInteractions: 0,
    successRate: 0,
    averageResponseTime: 0,
    codeCompletionAccuracy: 0,
    workflowsCompleted: 0,
    voiceInteractions: 0,
  },
  isVoiceRecording: false,
  isProcessing: false,
  error: null,
};

type AppAction = 
  | { type: 'ADD_AI_RESPONSE'; payload: Omit<AIResponse, 'id' | 'timestamp'> }
  | { type: 'UPDATE_WORKFLOW_TASK'; payload: { id: string; updates: Partial<WorkflowTask> } }
  | { type: 'ADD_WORKFLOW_TASK'; payload: Omit<WorkflowTask, 'id'> }
  | { type: 'SET_VOICE_RECORDING'; payload: boolean }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_METRICS'; payload: Partial<Metrics> }
  | { type: 'SET_USER'; payload: any }
  | { type: 'SET_AUTHENTICATED'; payload: boolean };

const AppContext = createContext<AppContextType | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_AI_RESPONSE':
      return {
        ...state,
        aiResponses: [
          ...state.aiResponses,
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date(),
          }
        ],
        metrics: {
          ...state.metrics,
          totalInteractions: state.metrics.totalInteractions + 1,
        }
      };
    
    case 'UPDATE_WORKFLOW_TASK':
      return {
        ...state,
        currentWorkflows: state.currentWorkflows.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      };
    
    case 'ADD_WORKFLOW_TASK':
      return {
        ...state,
        currentWorkflows: [
          ...state.currentWorkflows,
          {
            ...action.payload,
            id: Date.now().toString(),
          }
        ]
      };
    
    case 'SET_VOICE_RECORDING':
      return { ...state, isVoiceRecording: action.payload };
    
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'UPDATE_METRICS':
      return {
        ...state,
        metrics: { ...state.metrics, ...action.payload }
      };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue: AppContextType = {
    ...state,
    addAIResponse: (response) => dispatch({ type: 'ADD_AI_RESPONSE', payload: response }),
    updateWorkflowTask: (id, updates) => dispatch({ type: 'UPDATE_WORKFLOW_TASK', payload: { id, updates } }),
    addWorkflowTask: (task) => dispatch({ type: 'ADD_WORKFLOW_TASK', payload: task }),
    setVoiceRecording: (recording) => dispatch({ type: 'SET_VOICE_RECORDING', payload: recording }),
    setProcessing: (processing) => dispatch({ type: 'SET_PROCESSING', payload: processing }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    updateMetrics: (metrics) => dispatch({ type: 'UPDATE_METRICS', payload: metrics }),
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}