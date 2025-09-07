import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HuggingFaceAPI } from '../../utils/huggingface';
import { 
  Workflow, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus,
  Settings,
  ArrowRight
} from 'lucide-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import toast from 'react-hot-toast';

export function Workflows() {
  const { currentWorkflows, addWorkflowTask, updateWorkflowTask, addAIResponse } = useApp();
  const [newWorkflowDescription, setNewWorkflowDescription] = useState('');
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);

  const handleCreateWorkflow = async () => {
    if (!newWorkflowDescription.trim()) {
      toast.error('Please enter a workflow description');
      return;
    }

    setIsCreatingWorkflow(true);
    try {
      const workflowSteps = await HuggingFaceAPI.createWorkflow(newWorkflowDescription);
      
      const newWorkflow = {
        title: newWorkflowDescription.slice(0, 50) + '...',
        description: newWorkflowDescription,
        status: 'pending' as const,
        progress: 0,
        result: workflowSteps,
      };

      addWorkflowTask(newWorkflow);
      addAIResponse({
        message: `Created workflow: ${newWorkflowDescription}\n\nSteps:\n${workflowSteps}`,
        type: 'workflow',
        metadata: { workflow: newWorkflow }
      });

      setNewWorkflowDescription('');
      toast.success('Workflow created successfully!');
    } catch (error) {
      toast.error('Failed to create workflow');
    } finally {
      setIsCreatingWorkflow(false);
    }
  };

  const simulateWorkflowExecution = async (workflowId: string) => {
    updateWorkflowTask(workflowId, { status: 'running', progress: 0 });
    
    // Simulate workflow execution with progress updates
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const progress = (i / steps) * 100;
      updateWorkflowTask(workflowId, { progress });
    }
    
    updateWorkflowTask(workflowId, { 
      status: 'completed', 
      progress: 100,
      result: 'Workflow completed successfully!' 
    });
    
    toast.success('Workflow completed!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'running':
        return <LoadingSpinner size="sm" className="text-apple-blue" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-apple-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'running':
        return 'bg-blue-100 text-apple-blue border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-600 border-red-200';
      default:
        return 'bg-apple-gray-100 text-apple-gray-600 border-apple-gray-200';
    }
  };

  const workflowTemplates = [
    {
      title: 'Code Review Automation',
      description: 'Automatically review code changes and provide feedback',
      icon: '🔍',
    },
    {
      title: 'Documentation Generator',
      description: 'Generate comprehensive documentation from code',
      icon: '📚',
    },
    {
      title: 'Test Case Creation',
      description: 'Create unit tests for existing functions',
      icon: '🧪',
    },
    {
      title: 'API Integration Setup',
      description: 'Set up boilerplate code for API integrations',
      icon: '🔗',
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-apple-gray-800 mb-4">Workflow Automation</h1>
        <p className="text-apple-gray-600 text-lg">
          Create and manage automated development workflows powered by AI
        </p>
      </div>

      {/* Create New Workflow */}
      <div className="card">
        <h2 className="text-xl font-semibold text-apple-gray-800 mb-4 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Create New Workflow</span>
        </h2>
        
        <div className="space-y-4">
          <textarea
            value={newWorkflowDescription}
            onChange={(e) => setNewWorkflowDescription(e.target.value)}
            placeholder="Describe the workflow you want to create... (e.g., 'Create a workflow that automatically generates unit tests for my React components')"
            className="input-field h-32 resize-none"
          />
          
          <button
            onClick={handleCreateWorkflow}
            disabled={isCreatingWorkflow}
            className="btn-primary flex items-center space-x-2"
          >
            {isCreatingWorkflow ? (
              <LoadingSpinner size="sm" className="text-white" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            <span>Create Workflow</span>
          </button>
        </div>
      </div>

      {/* Workflow Templates */}
      <div className="card">
        <h2 className="text-xl font-semibold text-apple-gray-800 mb-4 flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Quick Templates</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {workflowTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => setNewWorkflowDescription(template.description)}
              className="text-left p-4 border border-apple-gray-200 rounded-xl hover:bg-apple-gray-50 transition-all duration-200 hover:border-apple-blue"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <h3 className="font-medium text-apple-gray-800">{template.title}</h3>
                  <p className="text-sm text-apple-gray-600 mt-1">{template.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Workflows */}
      <div className="card">
        <h2 className="text-xl font-semibold text-apple-gray-800 mb-6 flex items-center space-x-2">
          <Workflow className="w-5 h-5" />
          <span>Active Workflows</span>
        </h2>
        
        <div className="space-y-6">
          {currentWorkflows.length > 0 ? (
            currentWorkflows.map((workflow) => (
              <div key={workflow.id} className="border border-apple-gray-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(workflow.status)}
                      <h3 className="font-semibold text-apple-gray-800">{workflow.title}</h3>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </div>
                    <p className="text-apple-gray-600 mb-4">{workflow.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    {workflow.status === 'pending' && (
                      <button
                        onClick={() => simulateWorkflowExecution(workflow.id)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start</span>
                      </button>
                    )}
                    
                    {workflow.status === 'running' && (
                      <button
                        onClick={() => updateWorkflowTask(workflow.id, { status: 'pending', progress: 0 })}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <Pause className="w-4 h-4" />
                        <span>Pause</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-apple-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{workflow.progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-apple-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        workflow.status === 'completed' ? 'bg-green-500' : 'bg-apple-blue'
                      }`}
                      style={{ width: `${workflow.progress}%` }}
                    />
                  </div>
                </div>

                {/* Workflow Steps/Results */}
                {workflow.result && (
                  <div className="bg-apple-gray-50 rounded-xl p-4">
                    <h4 className="font-medium text-apple-gray-800 mb-2 flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Workflow Details</span>
                    </h4>
                    <pre className="text-sm text-apple-gray-700 whitespace-pre-wrap">
                      {typeof workflow.result === 'string' ? workflow.result : JSON.stringify(workflow.result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-apple-gray-500">
              <Workflow className="w-16 h-16 mx-auto mb-4 text-apple-gray-300" />
              <h3 className="text-lg font-medium text-apple-gray-800 mb-2">No Active Workflows</h3>
              <p>Create your first workflow to get started with automation!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}