import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthContextType } from '../types';

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'manager@slooze.com',
    password: 'manager123',
    name: 'John Manager',
    role: 'manager'
  },
  {
    id: '2',
    email: 'storekeeper@slooze.com',
    password: 'store123',
    name: 'Sarah Keeper',
    role: 'storekeeper'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching credentials
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    
    // Create user object without password
    const { password: _, ...userWithoutPassword } = foundUser;
    const authenticatedUser = userWithoutPassword as User;
    
    // Save to state and localStorage
    setUser(authenticatedUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(authenticatedUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};