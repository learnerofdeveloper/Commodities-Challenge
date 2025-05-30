import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Package, Mail, Lock, AlertCircle, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Package className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Slooze Commodities
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Sign in to your account
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg flex items-center dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                }`}
                placeholder="manager@slooze.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                }`}
                placeholder="manager123 or store123"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <span className="ml-2 text-sm">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm">
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Demo Credentials:
          </p>
          <div className="mt-2 space-y-1">
            <p>Manager: manager@slooze.com / manager123</p>
            <p>Store Keeper: storekeeper@slooze.com / store123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;