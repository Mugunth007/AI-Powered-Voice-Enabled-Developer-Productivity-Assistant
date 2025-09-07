import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Code, 
  Mic, 
  Workflow,
  BarChart3,
  Activity,
  Target,
  Zap
} from 'lucide-react';

export function Metrics() {
  const { metrics, aiResponses, currentWorkflows, updateMetrics } = useApp();
  const [timeRange, setTimeRange] = useState('7d');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const successfulWorkflows = currentWorkflows.filter(w => w.status === 'completed').length;
      const totalWorkflows = currentWorkflows.length || 1;
      const voiceInteractions = aiResponses.filter(r => r.type === 'voice').length;
      
      updateMetrics({
        successRate: successfulWorkflows / totalWorkflows,
        averageResponseTime: Math.random() * 2 + 0.5,
        codeCompletionAccuracy: 0.85 + Math.random() * 0.1,
        workflowsCompleted: successfulWorkflows,
        voiceInteractions,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentWorkflows, aiResponses, updateMetrics]);

  const getInteractionsByType = () => {
    const types = { voice: 0, code: 0, workflow: 0, text: 0 };
    aiResponses.forEach(response => {
      types[response.type]++;
    });
    return types;
  };

  const interactionTypes = getInteractionsByType();

  const performanceMetrics = [
    {
      title: 'Total Interactions',
      value: metrics.totalInteractions,
      change: '+12%',
      changeType: 'positive',
      icon: Zap,
      color: 'blue'
    },
    {
      title: 'Success Rate',
      value: `${(metrics.successRate * 100).toFixed(1)}%`,
      change: '+5.2%',
      changeType: 'positive',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Avg Response Time',
      value: `${metrics.averageResponseTime.toFixed(1)}s`,
      change: '-8%',
      changeType: 'positive',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Code Accuracy',
      value: `${(metrics.codeCompletionAccuracy * 100).toFixed(1)}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'orange'
    }
  ];

  const interactionData = [
    { type: 'Voice', count: interactionTypes.voice, icon: Mic, color: 'bg-blue-500' },
    { type: 'Code', count: interactionTypes.code, icon: Code, color: 'bg-purple-500' },
    { type: 'Workflow', count: interactionTypes.workflow, icon: Workflow, color: 'bg-green-500' },
    { type: 'Text', count: interactionTypes.text, icon: BarChart3, color: 'bg-orange-500' },
  ];

  const workflowStats = {
    total: currentWorkflows.length,
    completed: currentWorkflows.filter(w => w.status === 'completed').length,
    running: currentWorkflows.filter(w => w.status === 'running').length,
    pending: currentWorkflows.filter(w => w.status === 'pending').length,
    failed: currentWorkflows.filter(w => w.status === 'failed').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-apple-gray-800 mb-2">Performance Metrics</h1>
          <p className="text-apple-gray-600">Monitor your AI assistant's performance and usage analytics</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-apple-blue border-blue-100',
            green: 'bg-green-50 text-green-500 border-green-100',
            purple: 'bg-purple-50 text-purple-500 border-purple-100',
            orange: 'bg-orange-50 text-orange-500 border-orange-100'
          };

          return (
            <div key={index} className="card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-apple-gray-800 mb-1">
                {metric.value}
              </div>
              <div className="text-apple-gray-600 text-sm">
                {metric.title}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Interaction Types */}
        <div className="card">
          <h2 className="text-xl font-semibold text-apple-gray-800 mb-6 flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Interaction Distribution</span>
          </h2>
          
          <div className="space-y-4">
            {interactionData.map((item, index) => {
              const Icon = item.icon;
              const total = Object.values(interactionTypes).reduce((a, b) => a + b, 0) || 1;
              const percentage = (item.count / total) * 100;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-apple-gray-800">{item.type}</span>
                      <span className="text-sm text-apple-gray-600">{item.count}</span>
                    </div>
                    
                    <div className="w-full bg-apple-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm font-medium text-apple-gray-600 w-12 text-right">
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Status */}
        <div className="card">
          <h2 className="text-xl font-semibold text-apple-gray-800 mb-6 flex items-center space-x-2">
            <Workflow className="w-5 h-5" />
            <span>Workflow Status</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {workflowStats.completed}
              </div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-apple-blue mb-1">
                {workflowStats.running}
              </div>
              <div className="text-sm text-blue-700">Running</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {workflowStats.pending}
              </div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {workflowStats.failed}
              </div>
              <div className="text-sm text-red-700">Failed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="card">
        <h2 className="text-xl font-semibold text-apple-gray-800 mb-6 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Recent Activity</span>
        </h2>
        
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {aiResponses.slice(0, 10).map((response, index) => {
            const typeIcons = {
              voice: Mic,
              code: Code,
              workflow: Workflow,
              text: BarChart3
            };
            const Icon = typeIcons[response.type];
            
            return (
              <div key={response.id} className="flex items-start space-x-3 p-3 hover:bg-apple-gray-50 rounded-xl transition-colors duration-200">
                <div className="w-8 h-8 bg-apple-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-apple-gray-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-apple-gray-800 line-clamp-2">
                    {response.message}
                  </p>
                  <p className="text-xs text-apple-gray-500 mt-1">
                    {response.timestamp.toLocaleString()}
                  </p>
                </div>
                
                <div className="text-xs text-apple-gray-400 flex-shrink-0">
                  {response.type}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}