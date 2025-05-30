import React, { useState } from 'react';
import { Search, UserPlus, Mail, Shield, Trash2, Edit } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { User } from '../types';

// Mock users data
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'manager@slooze.com',
    name: 'John Manager',
    role: 'manager'
  },
  {
    id: '2',
    email: 'storekeeper@slooze.com',
    name: 'Sarah Keeper',
    role: 'storekeeper'
  },
  {
    id: '3',
    email: 'mike@slooze.com',
    name: 'Mike Handler',
    role: 'storekeeper'
  },
  {
    id: '4',
    email: 'emma@slooze.com',
    name: 'Emma Thompson',
    role: 'storekeeper'
  }
];

const Users: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const filteredUsers = MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowAddForm(true);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, this would make an API call
      console.log('Deleting user:', id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Users</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage system users and their roles
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={18} />
          <span>Add User</span>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} size={20} />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>
      
      {showAddForm ? (
        <div className={`rounded-lg border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className="text-xl font-semibold mb-6">
            {selectedUser ? 'Edit User' : 'Add New User'}
          </h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser?.name}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                  </div>
                  <input
                    type="email"
                    defaultValue={selectedUser?.email}
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield size={18} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                </div>
                <select
                  defaultValue={selectedUser?.role || 'storekeeper'}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="manager">Manager</option>
                  <option value="storekeeper">Store Keeper</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedUser(null);
                }}
                className={`px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:bg-gray-700'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {selectedUser ? 'Update User' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={`rounded-lg border overflow-hidden ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                        user.role === 'manager'
                          ? theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                          : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className={`p-1 rounded ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700 text-blue-400'
                              : 'hover:bg-gray-100 text-blue-600'
                          }`}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className={`p-1 rounded ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700 text-red-400'
                              : 'hover:bg-gray-100 text-red-600'
                          }`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;