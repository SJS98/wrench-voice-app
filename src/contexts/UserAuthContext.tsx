
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

// Mock garage data
const MOCK_GARAGE: GarageData = {
  id: 'garage1',
  name: 'John\'s Auto Repair',
  status: 'open',
  services: [
    {
      id: 'service1',
      name: 'Oil Change',
      price: 1500,
      description: 'Complete oil change service with premium oil'
    },
    {
      id: 'service2',
      name: 'Brake Inspection',
      price: 800,
      description: 'Comprehensive brake system inspection'
    }
  ],
  rating: 4.7,
  totalBookings: 145,
  completedBookings: 132
};

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [garageData, setGarageData] = useState<GarageData | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - replace with Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(MOCK_OWNER);
      setGarageData(MOCK_GARAGE);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setGarageData(null);
  };

  const register = async (name: string, email: string, password: string, role: 'owner' | 'customer' = 'customer') => {
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
        setGarageData(MOCK_GARAGE);
      }
    } catch (error) {
      console.error('Garage registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateGarageProfile = async (updatedGarageData: any) => {
    setLoading(true);
    try {
      // Mock update - replace with Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (garageData) {
        setGarageData({
          ...garageData,
          ...updatedGarageData
        });
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateGarageStatus = async (status: 'open' | 'closed') => {
    setLoading(true);
    try {
      // Mock update status - replace with Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (garageData) {
        setGarageData({
          ...garageData,
          status
        });
      }
    } catch (error) {
      console.error('Status update failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<GarageService, 'id'>) => {
    setLoading(true);
    try {
      // Mock add service - replace with Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (garageData) {
        const newService = {
          ...service,
          id: `service${Date.now()}`
        };
        setGarageData({
          ...garageData,
          services: [...garageData.services, newService]
        });
      }
    } catch (error) {
      console.error('Add service failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (updatedService: GarageService) => {
    setLoading(true);
    try {
      // Mock update service - replace with Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (garageData) {
        const updatedServices = garageData.services.map(service => 
          service.id === updatedService.id ? updatedService : service
        );
        setGarageData({
          ...garageData,
          services: updatedServices
        });
      }
    } catch (error) {
      console.error('Update service failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    setLoading(true);
    try {
      // Mock delete service - replace with Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (garageData) {
        const filteredServices = garageData.services.filter(service => 
          service.id !== serviceId
        );
        setGarageData({
          ...garageData,
          services: filteredServices
        });
      }
    } catch (error) {
      console.error('Delete service failed:', error);
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
        garageData,
        login,
        logout,
        register,
        registerGarage,
        updateGarageProfile,
        isAuthenticated: !!user,
        updateGarageStatus,
        addService,
        updateService,
        deleteService,
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
