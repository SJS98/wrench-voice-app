
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Wrench, Clock } from 'lucide-react';
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
      className={`service-card cursor-pointer ${
        selected ? 'ring-2 ring-primary border-primary/30 bg-primary/5' : 'hover:border-primary/20'
      }`}
      onClick={onClick}
      data-testid="service-card"
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Wrench className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{service.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-bold text-xl text-primary">₹{adjustedPrice.toLocaleString()}</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
              </div>
              
              {selected && (
                <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
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
