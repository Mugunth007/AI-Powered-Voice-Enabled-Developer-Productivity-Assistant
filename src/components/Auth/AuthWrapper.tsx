import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { AuthScreen } from './AuthScreen';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-apple-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <AuthScreen />;
  }

  return <>{children}</>;
}