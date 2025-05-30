import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, LogOut, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`px-6 py-3 flex items-center justify-between shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center space-x-2">
        <Package className="h-6 w-6 text-blue-600" />
        <Link to="/" className="text-xl font-bold">Slooze Commodities</Link>
      </div>
      
      <div className="flex items-center space-x-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm opacity-75 capitalize">{user.role}</span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;