
import React, { createContext, useContext, useState, ReactNode } from 'react';

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface UserAuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
};

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(MOCK_USER); // For demo, start as logged in
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - in a real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(MOCK_USER);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Mock register - in a real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        ...MOCK_USER,
        name,
        email,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserAuthContext.Provider 
      value={{
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};
