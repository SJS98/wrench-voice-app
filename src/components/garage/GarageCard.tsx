
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface Garage {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
  services?: string[];
}

interface GarageCardProps {
  garage: Garage;
  isSaved?: boolean;
  className?: string;
}

const GarageCard = ({ garage, isSaved = false, className }: GarageCardProps) => {
  const [saved, setSaved] = useState(isSaved);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <div className={cn("garage-card", className)}>
      <div className="relative">
        <img 
          src={garage.imageUrl} 
          alt={garage.name} 
          className="w-full h-44 object-cover"
        />
        <button
          className="absolute top-2 right-2 bg-white/80 p-2 rounded-full"
          onClick={toggleSave}
        >
          {saved ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#8B5CF6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full", 
            garage.isOpen ? "bg-green-500 text-white" : "bg-gray-500 text-white"
          )}>
            {garage.isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{garage.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{garage.rating}</span>
            <span className="text-muted-foreground">({garage.reviews})</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">{garage.type}</p>
        
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{garage.address} • {garage.distance}</span>
        </div>
        
        {garage.openTime && garage.closeTime && (
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{garage.openTime} - {garage.closeTime}</span>
          </div>
        )}
        
        <div className="mt-3 flex flex-wrap gap-2">
          {garage.services?.slice(0, 3).map((service, index) => (
            <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-full">
              {service}
            </span>
          ))}
          {garage.services && garage.services.length > 3 && (
            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
              +{garage.services.length - 3} more
            </span>
          )}
        </div>
        
        <div className="mt-4 flex justify-between gap-2">
          <Link to={`/garage/${garage.id}`} className="flex-1">
            <Button variant="outline" className="w-full">View Details</Button>
          </Link>
          <Link to={`/book-service/${garage.id}`} className="flex-1">
            <Button className="w-full bg-garage-purple hover:bg-garage-purple/90">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GarageCard;
