import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, Users, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const isManager = user?.role === 'manager';
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <aside className={`w-64 border-r ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-y-auto`}>
      <div className="p-4">
        <div className="mb-6 mt-4">
          <h2 className="text-xs uppercase font-semibold opacity-60 tracking-wider mb-3">Main</h2>
          <nav className="space-y-1">
            {isManager && (
              <NavLink to="/dashboard\" className={navLinkClass}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            )}
            
            <NavLink to="/products" className={navLinkClass}>
              <Package size={20} />
              <span>Products</span>
            </NavLink>
          </nav>
        </div>
        
        {isManager && (
          <div className="mb-6">
            <h2 className="text-xs uppercase font-semibold opacity-60 tracking-wider mb-3">Management</h2>
            <nav className="space-y-1">
              <NavLink to="/users" className={navLinkClass}>
                <Users size={20} />
                <span>Users</span>
              </NavLink>
              
              <NavLink to="/orders" className={navLinkClass}>
                <ShoppingCart size={20} />
                <span>Orders</span>
              </NavLink>
            </nav>
          </div>
        )}
        
        <div>
          <h2 className="text-xs uppercase font-semibold opacity-60 tracking-wider mb-3">Account</h2>
          <nav className="space-y-1">
            <NavLink to="/settings" className={navLinkClass}>
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;