import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { 
  Home, 
  Code, 
  Workflow, 
  BarChart3, 
  Mic, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'voice-assistant', label: 'Voice Assistant', icon: Mic },
  { id: 'code-completion', label: 'Code Assistant', icon: Code },
  { id: 'workflows', label: 'Workflows', icon: Workflow },
  { id: 'metrics', label: 'Metrics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="w-64 bg-white border-r border-apple-gray-200 h-screen flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-apple-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center">
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt={user.firstName || 'User'} 
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <div className="font-medium text-apple-gray-800">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-sm text-apple-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-apple-blue text-white shadow-sm'
                      : 'text-apple-gray-600 hover:bg-apple-gray-50 hover:text-apple-gray-800'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-apple-gray-100">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center space-x-3 px-4 py-3 text-apple-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
