import React from 'react';
import { BarChart, TrendingUp, Package, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard: React.FC = () => {
  const { products } = useProducts();
  const { theme } = useTheme();
  
  // Calculate dashboard metrics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockProducts = products.filter(product => product.stock < 100).length;
  
  // Get categories for chart
  const categories = [...new Set(products.map(product => product.category))];
  const categoryData = categories.map(category => {
    const categoryProducts = products.filter(product => product.category === category);
    const value = categoryProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);
    return { category, value };
  }).sort((a, b) => b.value - a.value);
  
  const cardClass = `p-6 rounded-xl shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`;
  const cardIconClass = `p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`;
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Overview of your commodities inventory and performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products Card */}
        <div className={cardClass}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Products</p>
              <h3 className="text-2xl font-bold mt-1">{totalProducts}</h3>
            </div>
            <div className={cardIconClass}>
              <Package size={24} />
            </div>
          </div>
        </div>
        
        {/* Total Stock Card */}
        <div className={cardClass}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Stock</p>
              <h3 className="text-2xl font-bold mt-1">{totalStock.toLocaleString()}</h3>
            </div>
            <div className={cardIconClass}>
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
        
        {/* Total Value Card */}
        <div className={cardClass}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Value</p>
              <h3 className="text-2xl font-bold mt-1">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            </div>
            <div className={cardIconClass}>
              <DollarSign size={24} />
            </div>
          </div>
        </div>
        
        {/* Low Stock Card */}
        <div className={cardClass}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Low Stock Items</p>
              <h3 className="text-2xl font-bold mt-1">{lowStockProducts}</h3>
            </div>
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution Chart */}
        <div className={`${cardClass} lg:col-span-2`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Value by Category</h3>
            <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <BarChart size={18} />
            </div>
          </div>
          
          <div className="space-y-4">
            {categoryData.map(({ category, value }) => (
              <div key={category}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{category}</span>
                  <span>${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full rounded-full bg-blue-600" 
                    style={{ width: `${(value / totalValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Team Activity</h3>
            <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Users size={18} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">JM</div>
              <div>
                <p className="text-sm font-medium">John Manager</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Updated inventory levels for Crude Oil</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">SK</div>
              <div>
                <p className="text-sm font-medium">Sarah Keeper</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Added new product: Silver</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">JM</div>
              <div>
                <p className="text-sm font-medium">John Manager</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Updated price for Gold</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;