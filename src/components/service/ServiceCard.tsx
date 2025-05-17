
import { cn } from '@/lib/utils';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  iconUrl: string;
}

interface ServiceCardProps {
  service: Service;
  selected?: boolean;
  onClick?: () => void;
}

const ServiceCard = ({ service, selected = false, onClick }: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all",
        selected 
          ? "border-garage-purple bg-garage-purple/5 shadow-sm" 
          : "border-gray-200 hover:border-garage-blue/50 hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 p-3 rounded-full">
          <img src={service.iconUrl} alt={service.name} className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-semibold">₹{service.price}</span>
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
