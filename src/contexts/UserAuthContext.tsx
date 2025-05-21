
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'owner' | 'customer';
  garageId?: string;
}

interface GarageService {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface GarageData {
  id: string;
  name: string;
  status: 'open' | 'closed';
  services: GarageService[];
  rating: number;
  totalBookings: number;
  completedBookings: number;
}

interface UserAuthContextType {
  user: User | null;
  loading: boolean;
  garageData: GarageData | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'owner' | 'customer') => Promise<void>;
  isAuthenticated: boolean;
  registerGarage: (garageData: any) => Promise<void>;
  updateGarageProfile: (garageData: any) => Promise<void>;
  updateGarageStatus: (status: 'open' | 'closed') => Promise<void>;
  addService: (service: Omit<GarageService, 'id'>) => Promise<void>;
  updateService: (service: GarageService) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

// Mock owner data
const MOCK_OWNER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
  role: 'owner',
  garageId: 'garage1'
};

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - replace with Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(MOCK_OWNER);
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

  const register = async (name: string, email: string, password: string, role: 'owner' | 'customer') => {
    setLoading(true);
    try {
      // Mock register - replace with Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        ...MOCK_OWNER,
        name,
        email,
        role,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerGarage = async (garageData: any) => {
    setLoading(true);
    try {
      // Mock garage registration - replace with Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (user) {
        setUser({
          ...user,
          garageId: 'new-garage-id'
        });
      }
    } catch (error) {
      console.error('Garage registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateGarageProfile = async (garageData: any) => {
    setLoading(true);
    try {
      // Mock update - replace with Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Profile update failed:', error);
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
        registerGarage,
        updateGarageProfile,
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
