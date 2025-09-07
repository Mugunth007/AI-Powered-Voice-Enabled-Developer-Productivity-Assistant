import React, { useState } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Brain, Sparkles, Code, Mic, Workflow } from 'lucide-react';

export function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Marketing content */}
        <div className="space-y-8 animate-fade-in">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-apple-blue to-purple-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-apple-gray-800">AI Developer Assistant</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-apple-gray-800 mb-6">
              Supercharge Your
              <span className="text-apple-blue block">Development Workflow</span>
            </h1>
            
            <p className="text-xl text-apple-gray-600 mb-8 leading-relaxed">
              Experience the future of coding with our AI-powered assistant. Voice commands, 
              intelligent code completion, and automated workflows at your fingertips.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-apple-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Mic className="w-6 h-6 text-apple-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-apple-gray-800">Voice-Enabled Assistant</h3>
                <p className="text-apple-gray-600">Natural voice commands for hands-free coding</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-apple-gray-100">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-apple-gray-800">Smart Code Completion</h3>
                <p className="text-apple-gray-600">AI-powered suggestions that understand context</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-apple-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Workflow className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-apple-gray-800">Automated Workflows</h3>
                <p className="text-apple-gray-600">Streamline repetitive tasks with intelligent automation</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-apple-gray-500">
            <Sparkles className="w-5 h-5" />
            <span>Powered by cutting-edge AI technology</span>
          </div>
        </div>

        {/* Right side - Auth component */}
        <div className="flex justify-center animate-slide-up">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-lg border border-apple-gray-200 p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-apple-gray-800 mb-2">
                  {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="text-apple-gray-600">
                  {isSignUp ? 'Join thousands of developers already using AI assistance' : 'Sign in to continue your AI-powered journey'}
                </p>
              </div>

              {isSignUp ? (
                <SignUp 
                  afterSignUpUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: 'w-full',
                      card: 'shadow-none border-none',
                      formButtonPrimary: 'btn-primary w-full',
                      formFieldInput: 'input-field',
                      footerActionLink: 'text-apple-blue hover:text-blue-600',
                    }
                  }}
                />
              ) : (
                <SignIn 
                  afterSignInUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: 'w-full',
                      card: 'shadow-none border-none',
                      formButtonPrimary: 'btn-primary w-full',
                      formFieldInput: 'input-field',
                      footerActionLink: 'text-apple-blue hover:text-blue-600',
                    }
                  }}
                />
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-apple-blue hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}