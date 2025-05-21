
import { VehicleType } from './vehicles';

export type VehicleCondition = 'Excellent' | 'Good' | 'Average' | 'Poor';
export type SellerType = 'Garage' | 'Service Center' | 'Expired Vehicle';
export type ListingStatus = 'Active' | 'Pending Approval' | 'Sold';

export interface UsedVehicle {
  id: string;
  title: string;
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  color: string;
  mileage: number;
  condition: VehicleCondition;
  price: number;
  negotiable: boolean;
  description: string;
  images: string[];
  location: string;
  sellerType: SellerType;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  ownerHistory?: number;
  serviceHistory?: boolean;
  createdAt: string;
  status: ListingStatus;
  views: number;
}

export interface UsedVehicleFilters {
  vehicleType?: VehicleType[];
  priceRange?: {
    min: number;
    max: number;
  };
  condition?: VehicleCondition[];
  location?: string;
  sellerType?: SellerType[];
}

export interface UsedVehicleSorting {
  field: 'createdAt' | 'price';
  order: 'asc' | 'desc';
}
