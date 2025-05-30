import React from 'react';
import { Moon, Sun, User, Bell, Shield, Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your account preferences
        </p>
      </div>
      
      <div className={`rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              <div>
                <p className="font-medium">Theme Mode</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <div className="flex items-center">
                  <div className="absolute ml-3">
                    <User size={18} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                  </div>
                  <input
                    type="text"
                    value={user?.name || ''}
                    readOnly
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <div className="flex items-center">
                <div className="absolute ml-3">
                  <Shield size={18} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                </div>
                <input
                  type="text"
                  value={user?.role === 'manager' ? 'Manager' : 'Store Keeper'}
                  readOnly
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={20} />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Receive email alerts for inventory changes
                  </p>
                </div>
              </div>
              
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className="sr-only">Toggle email notifications</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={20} />
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Get notified when products are running low
                  </p>
                </div>
              </div>
              
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className="sr-only">Toggle low stock alerts</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6`}
                />
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={18} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;