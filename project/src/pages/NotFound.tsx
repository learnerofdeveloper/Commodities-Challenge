import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NotFound: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className={`max-w-md mx-auto mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;