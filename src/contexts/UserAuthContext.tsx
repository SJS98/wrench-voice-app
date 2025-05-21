
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

interface CartItem {
  partId: string;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

interface UserAuthContextType {
  user: User | null;
  loading: boolean;
  garageData: GarageData | null;
  cartItems: CartItem[];
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
  addToCart: (partId: string, quantity: number) => Promise<void>;
  removeFromCart: (partId: string) => Promise<void>;
  updateCartItemQuantity: (partId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
    setCartItems([]);
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

  // Cart operations
  const addToCart = async (partId: string, quantity: number) => {
    setLoading(true);
    try {
      // Mock adding to cart - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const existingItemIndex = cartItems.findIndex(item => item.partId === partId);
      
      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + quantity
        };
        setCartItems(updatedCartItems);
      } else {
        // Add new item (in a real app, fetch part details first)
        setCartItems([...cartItems, {
          partId,
          quantity,
          price: 1500, // Mock price, in real app would get from API
          title: "Mock Part Title", // Mock title, in real app would get from API
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=150&auto=format&fit=crop"
        }]);
      }
    } catch (error) {
      console.error('Add to cart failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (partId: string) => {
    setLoading(true);
    try {
      // Mock removing from cart - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      setCartItems(cartItems.filter(item => item.partId !== partId));
    } catch (error) {
      console.error('Remove from cart failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (partId: string, quantity: number) => {
    setLoading(true);
    try {
      // Mock updating cart item quantity - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        setCartItems(cartItems.filter(item => item.partId !== partId));
      } else {
        // Update quantity
        setCartItems(cartItems.map(item => 
          item.partId === partId ? { ...item, quantity } : item
        ));
      }
    } catch (error) {
      console.error('Update cart item quantity failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      // Mock clearing cart - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      setCartItems([]);
    } catch (error) {
      console.error('Clear cart failed:', error);
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
        cartItems,
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
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
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
