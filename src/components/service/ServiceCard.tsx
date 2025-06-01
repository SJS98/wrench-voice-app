
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { VehicleType } from '@/types/vehicles';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  iconUrl: string;
  compatibleVehicles?: VehicleType[];
}

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onClick: () => void;
  selectedVehicleType?: VehicleType;
}

const ServiceCard = ({ service, selected, onClick, selectedVehicleType }: ServiceCardProps) => {
  // Apply price multiplier based on vehicle type
  const priceMultipliers: Record<VehicleType, number> = {
    'car': 1,
    'bike': 0.6,
    'truck': 2.5,
    'bus': 3,
    'auto-rickshaw': 0.8,
    'bicycle': 0.3
  };
  
  const multiplier = selectedVehicleType ? priceMultipliers[selectedVehicleType] : 1;
  const adjustedPrice = Math.round(service.price * multiplier);

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selected ? 'ring-2 ring-garage-purple bg-garage-purple/5' : ''
      }`}
      onClick={onClick}
      data-testid="service-card"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-bold text-garage-purple">₹{adjustedPrice.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">{service.duration}</span>
              </div>
              
              {selected && (
                <div className="w-6 h-6 bg-garage-purple rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
