
import { UsedVehicle, UsedVehicleFilters, UsedVehicleSorting } from '@/types/usedVehicles';

// Mock data for used vehicles
const mockUsedVehicles: UsedVehicle[] = [
  {
    id: '1',
    title: '2019 Hyundai i20 - Low Mileage, Single Owner',
    type: 'car',
    make: 'Hyundai',
    model: 'i20',
    year: 2019,
    fuelType: 'Petrol',
    transmission: 'Manual',
    color: 'White',
    mileage: 45000,
    condition: 'Excellent',
    price: 650000,
    negotiable: true,
    description: 'Single owner, well maintained Hyundai i20 with regular service history. All documents up to date, insurance valid until Dec 2025.',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=600&auto=format&fit=crop',
    ],
    location: 'Bangalore, Karnataka',
    sellerType: 'Garage',
    sellerId: 'garage1',
    sellerName: 'Auto Care Center',
    sellerRating: 4.7,
    ownerHistory: 1,
    serviceHistory: true,
    createdAt: '2025-05-01T10:30:00Z',
    status: 'Active',
    views: 122
  },
  {
    id: '2',
    title: '2020 Royal Enfield Classic 350 - BS6 Model',
    type: 'bike',
    make: 'Royal Enfield',
    model: 'Classic 350',
    year: 2020,
    fuelType: 'Petrol',
    transmission: 'Manual',
    color: 'Stealth Black',
    mileage: 15000,
    condition: 'Good',
    price: 140000,
    negotiable: true,
    description: 'Well maintained Royal Enfield Classic 350 BS6 model. Comes with additional accessories and fresh servicing.',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=600&auto=format&fit=crop',
    ],
    location: 'Delhi, NCR',
    sellerType: 'Service Center',
    sellerId: 'service1',
    sellerName: 'Royal Motors',
    sellerRating: 4.5,
    ownerHistory: 2,
    serviceHistory: true,
    createdAt: '2025-05-10T15:20:00Z',
    status: 'Active',
    views: 74
  },
  {
    id: '3',
    title: '2018 Maruti Suzuki Swift VXI - Family Car',
    type: 'car',
    make: 'Maruti Suzuki',
    model: 'Swift VXI',
    year: 2018,
    fuelType: 'Petrol',
    transmission: 'Manual',
    color: 'Red',
    mileage: 60000,
    condition: 'Good',
    price: 520000,
    negotiable: true,
    description: 'Family used Swift VXI with complete service history from authorized center. New tires, battery, and recent servicing done.',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop',
    ],
    location: 'Mumbai, Maharashtra',
    sellerType: 'Expired Vehicle',
    sellerId: 'expired1',
    sellerName: 'Express Auto Resale',
    sellerRating: 4.2,
    ownerHistory: 3,
    serviceHistory: false,
    createdAt: '2025-05-05T09:15:00Z',
    status: 'Active',
    views: 185
  },
  {
    id: '4',
    title: '2021 Bajaj Pulsar NS200 - Performance Bike',
    type: 'bike',
    make: 'Bajaj',
    model: 'Pulsar NS200',
    year: 2021,
    fuelType: 'Petrol',
    transmission: 'Manual',
    color: 'Blue',
    mileage: 10000,
    condition: 'Excellent',
    price: 115000,
    negotiable: false,
    description: 'Almost new Pulsar NS200 with all stock parts. No accidents or modifications. Perfect for enthusiasts looking for performance.',
    images: [
      'https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622185135504-6d4856cc4691?q=80&w=600&auto=format&fit=crop',
    ],
    location: 'Pune, Maharashtra',
    sellerType: 'Garage',
    sellerId: 'garage2',
    sellerName: 'Performance Motors',
    sellerRating: 4.8,
    ownerHistory: 1,
    serviceHistory: true,
    createdAt: '2025-05-12T11:45:00Z',
    status: 'Active',
    views: 63
  }
];

export const usedVehiclesService = {
  // Get all used vehicles with filters and sorting
  getUsedVehicles: async (
    filters?: UsedVehicleFilters, 
    sorting?: UsedVehicleSorting
  ): Promise<UsedVehicle[]> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    let filteredVehicles = [...mockUsedVehicles];
    
    // Apply filters
    if (filters) {
      if (filters.vehicleType && filters.vehicleType.length > 0) {
        filteredVehicles = filteredVehicles.filter(v => 
          filters.vehicleType?.includes(v.type)
        );
      }
      
      if (filters.priceRange) {
        filteredVehicles = filteredVehicles.filter(v => 
          v.price >= (filters.priceRange?.min || 0) && 
          v.price <= (filters.priceRange?.max || Infinity)
        );
      }
      
      if (filters.condition && filters.condition.length > 0) {
        filteredVehicles = filteredVehicles.filter(v => 
          filters.condition?.includes(v.condition)
        );
      }
      
      if (filters.sellerType && filters.sellerType.length > 0) {
        filteredVehicles = filteredVehicles.filter(v => 
          filters.sellerType?.includes(v.sellerType)
        );
      }
      
      if (filters.location) {
        filteredVehicles = filteredVehicles.filter(v => 
          v.location.toLowerCase().includes(filters.location?.toLowerCase() || '')
        );
      }
    }
    
    // Apply sorting
    if (sorting) {
      filteredVehicles.sort((a, b) => {
        if (sorting.field === 'price') {
          return sorting.order === 'asc' 
            ? a.price - b.price 
            : b.price - a.price;
        } else {
          // Sort by date
          return sorting.order === 'asc' 
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
    } else {
      // Default sort by newest
      filteredVehicles.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    
    return filteredVehicles;
  },
  
  // Get a specific used vehicle by ID
  getUsedVehicleById: async (id: string): Promise<UsedVehicle | null> => {
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
    const vehicle = mockUsedVehicles.find(v => v.id === id);
    return vehicle || null;
  },
  
  // Contact seller
  contactSeller: async (vehicleId: string, message: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    console.log(`Contacting seller for vehicle ${vehicleId} with message: ${message}`);
    return true;
  },
  
  // Book inspection
  bookInspection: async (vehicleId: string, date: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    console.log(`Booking inspection for vehicle ${vehicleId} on date: ${date}`);
    return true;
  },
  
  // Request to buy
  requestToBuy: async (vehicleId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    console.log(`Sending purchase request for vehicle ${vehicleId}`);
    return true;
  },
  
  // Add vehicle to wishlist
  addToWishlist: async (vehicleId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    console.log(`Adding vehicle ${vehicleId} to wishlist`);
    return true;
  },
  
  // Create new vehicle listing (for sellers)
  createVehicleListing: async (vehicle: Omit<UsedVehicle, 'id' | 'createdAt' | 'status' | 'views'>): Promise<UsedVehicle> => {
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API delay
    
    const newVehicle: UsedVehicle = {
      ...vehicle,
      id: `vehicle-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Approval',
      views: 0
    };
    
    console.log('Created new vehicle listing:', newVehicle);
    return newVehicle;
  }
};
