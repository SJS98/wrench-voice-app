
export type VehicleType = 'car' | 'bike' | 'truck' | 'bus' | 'auto-rickshaw' | 'bicycle';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  type: VehicleType;
  image?: string;
}

// Map vehicle types to their respective icons (from lucide-react)
export const vehicleTypeIcons: Record<VehicleType, string> = {
  'car': 'Car',
  'bike': 'Bike',
  'truck': 'Truck',
  'bus': 'Bus',
  'auto-rickshaw': 'Auto-rickshaw',
  'bicycle': 'Bicycle'
};

// Map vehicle types to their display names
export const vehicleTypeNames: Record<VehicleType, string> = {
  'car': 'Car',
  'bike': 'Bike',
  'truck': 'Truck',
  'bus': 'Bus',
  'auto-rickshaw': 'Auto Rickshaw',
  'bicycle': 'Bicycle'
};
