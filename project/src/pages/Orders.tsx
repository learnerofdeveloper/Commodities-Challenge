import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import { Order } from '../types';

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    productId: '1',
    quantity: 50,
    status: 'pending',
    createdBy: 'Sarah Keeper',
    createdAt: '2025-04-10T14:30:00Z',
    updatedAt: '2025-04-10T14:30:00Z',
    notes: 'Urgent order for upcoming shortage'
  },
  {
    id: '2',
    productId: '2',
    quantity: 100,
    status: 'approved',
    createdBy: 'Mike Handler',
    createdAt: '2025-04-09T10:15:00Z',
    updatedAt: '2025-04-09T11:30:00Z',
    notes: 'Standard restock order'
  },
  {
    id: '3',
    productId: '3',
    quantity: 25,
    status: 'completed',
    createdBy: 'Emma Thompson',
    createdAt: '2025-04-08T09:45:00Z',
    updatedAt: '2025-04-08T16:20:00Z'
  },
  {
    id: '4',
    productId: '4',
    quantity: 75,
    status: 'rejected',
    createdBy: 'Sarah Keeper',
    createdAt: '2025-04-07T13:20:00Z',
    updatedAt: '2025-04-07T14:45:00Z',
    notes: 'Budget constraints'
  }
];

const Orders: React.FC = () => {
  const { theme } = useTheme();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [sortField, setSortField] = useState<keyof Order>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || 'Unknown Product';
  };
  
  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800',
      approved: theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800',
      rejected: theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800',
      completed: theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
    };
    return colors[status];
  };
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} className="mr-1" />;
      case 'approved':
        return <CheckCircle size={14} className="mr-1" />;
      case 'rejected':
        return <XCircle size={14} className="mr-1" />;
      case 'completed':
        return <Package size={14} className="mr-1" />;
    }
  };
  
  const filteredOrders = MOCK_ORDERS
    .filter(order => {
      const productName = getProductName(order.productId).toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return (selectedStatus === '' || order.status === selectedStatus) &&
        (productName.includes(searchLower) ||
         order.createdBy.toLowerCase().includes(searchLower) ||
         order.notes?.toLowerCase().includes(searchLower));
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  
  const handleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Orders</h1>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Track and manage product orders
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} size={20} />
          </div>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} size={20} />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`pl-10 pr-8 py-2 rounded-lg border appearance-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div className={`rounded-lg border overflow-hidden ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('createdAt')}
                  >
                    <span>Date</span>
                    {sortField === 'createdAt' && (
                      <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'transform rotate-180' : ''} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
              {filteredOrders.map((order) => (
                <tr key={order.id} className={theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {getProductName(order.productId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.createdBy}
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate">
                      {order.notes || '-'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;