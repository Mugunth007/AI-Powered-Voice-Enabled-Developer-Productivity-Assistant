import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Code, 
  Mic, 
  Workflow, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Zap
} from 'lucide-react';

export function Dashboard() {
  const { metrics, aiResponses, currentWorkflows } = useApp();

  const recentWorkflows = currentWorkflows.slice(0, 3);
  const recentInteractions = aiResponses.slice(0, 5);

  const statsCards = [
    {
      title: 'Total Interactions',
      value: metrics.totalInteractions,
      icon: Zap,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Success Rate',
      value: `${(metrics.successRate * 100).toFixed(1)}%`,
      icon: CheckCircle,
      color: 'green',
      change: '+5%'
    },
    {
      title: 'Avg Response Time',
      value: `${metrics.averageResponseTime.toFixed(1)}s`,
      icon: Clock,
      color: 'purple',
      change: '-8%'
    },
    {
      title: 'Workflows Completed',
      value: metrics.workflowsCompleted,
      icon: Workflow,
      color: 'orange',
      change: '+23%'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-apple-blue to-purple-500 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your AI Assistant</h1>
        <p className="text-blue-100 text-lg">
          Supercharge your development workflow with intelligent automation and voice commands.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-apple-blue',
            green: 'bg-green-50 text-green-500',
            purple: 'bg-purple-50 text-purple-500',
            orange: 'bg-orange-50 text-orange-500'
          };

          return (
            <div key={index} className="card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-500 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-apple-gray-800 mb-1">{stat.value}</div>
              <div className="text-apple-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Interactions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-apple-gray-800">Recent Interactions</h2>
            <TrendingUp className="w-5 h-5 text-apple-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentInteractions.length > 0 ? (
              recentInteractions.map((interaction) => {
                const typeIcons = {
                  voice: Mic,
                  code: Code,
                  workflow: Workflow,
                  text: BarChart3
                };
                const Icon = typeIcons[interaction.type];

                return (
                  <div key={interaction.id} className="flex items-start space-x-3 p-3 hover:bg-apple-gray-50 rounded-xl transition-colors duration-200">
                    <div className="w-8 h-8 bg-apple-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-apple-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-apple-gray-800 text-sm line-clamp-2">{interaction.message}</p>
                      <p className="text-apple-gray-500 text-xs mt-1">
                        {interaction.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-apple-gray-500">
                <Zap className="w-12 h-12 mx-auto mb-3 text-apple-gray-300" />
                <p>No interactions yet. Start by using the voice assistant or code completion!</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Workflows */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-apple-gray-800">Active Workflows</h2>
            <Workflow className="w-5 h-5 text-apple-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentWorkflows.length > 0 ? (
              recentWorkflows.map((workflow) => {
                const statusColors = {
                  pending: 'bg-yellow-100 text-yellow-700',
                  running: 'bg-blue-100 text-apple-blue',
                  completed: 'bg-green-100 text-green-700',
                  failed: 'bg-red-100 text-red-600'
                };

                return (
                  <div key={workflow.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-apple-gray-800">{workflow.title}</h3>
                        <p className="text-sm text-apple-gray-600">{workflow.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[workflow.status]}`}>
                        {workflow.status}
                      </span>
                    </div>
                    <div className="w-full bg-apple-gray-200 rounded-full h-2">
                      <div 
                        className="bg-apple-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${workflow.progress}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-apple-gray-500">
                <Workflow className="w-12 h-12 mx-auto mb-3 text-apple-gray-300" />
                <p>No active workflows. Create one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}