
import { cn } from '@/lib/utils';
import { VehicleType } from '@/types/vehicles';
import VehicleIcon from '@/components/vehicles/VehicleIcon';

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
  selected?: boolean;
  onClick?: () => void;
  selectedVehicleType?: VehicleType;
}

const ServiceCard = ({ service, selected = false, onClick, selectedVehicleType }: ServiceCardProps) => {
  // If compatibleVehicles is not defined, assume service is compatible with all vehicles
  const isCompatible = !service.compatibleVehicles || !selectedVehicleType || 
    service.compatibleVehicles.includes(selectedVehicleType);
  
  // Show price adjustments based on vehicle type
  const getPriceForVehicleType = (basePrice: number, vehicleType?: VehicleType) => {
    if (!vehicleType) return basePrice;
    
    // Price multipliers based on vehicle type
    const multipliers: Record<VehicleType, number> = {
      'car': 1,
      'bike': 0.6,
      'truck': 2.5,
      'bus': 3,
      'auto-rickshaw': 0.8,
      'bicycle': 0.3
    };
    
    return Math.round(basePrice * multipliers[vehicleType]);
  };
  
  const price = selectedVehicleType 
    ? getPriceForVehicleType(service.price, selectedVehicleType) 
    : service.price;

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 transition-all",
        selected 
          ? "border-garage-purple bg-garage-purple/5 shadow-sm" 
          : "border-gray-200 hover:border-garage-blue/50",
        !isCompatible 
          ? "opacity-50 cursor-not-allowed" 
          : "cursor-pointer hover:bg-gray-50"
      )}
      onClick={isCompatible ? onClick : undefined}
    >
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 p-3 rounded-full">
          <img src={service.iconUrl} alt={service.name} className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-medium">{service.name}</h3>
            {service.compatibleVehicles && (
              <div className="ml-2 flex space-x-1">
                {service.compatibleVehicles.map(type => (
                  <VehicleIcon 
                    key={type} 
                    type={type} 
                    className={`h-3 w-3 ${selectedVehicleType === type ? 'text-garage-purple' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-semibold">₹{price}</span>
          <span className="text-xs text-muted-foreground">{service.duration}</span>
        </div>
      </div>
      
      {selected && (
        <div className="mt-3 pt-3 border-t border-dashed border-garage-purple/30">
          <span className="text-sm text-garage-purple flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Selected
          </span>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
