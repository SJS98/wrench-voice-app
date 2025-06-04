
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VehicleType } from '@/types/vehicles';

export interface Garage {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isOpen?: boolean;
  specializations?: string[];
  estimatedTime?: string;
  // Additional properties for mock data compatibility
  reviews?: number;
  openTime?: string;
  closeTime?: string;
  services?: string[];
  supportedVehicles?: VehicleType[];
}

interface GarageCardProps {
  garage: Garage;
  onBookNow?: () => void;
  vehicleId?: string;
  vehicleType?: string;
}

const GarageCard = ({ garage, onBookNow, vehicleId, vehicleType }: GarageCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/garage/${garage.id}`);
  };

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookNow) {
      onBookNow();
    } else {
      const bookingUrl = vehicleId 
        ? `/book-service/${garage.id}?vehicleId=${vehicleId}&vehicleType=${vehicleType}`
        : `/book-service/${garage.id}`;
      navigate(bookingUrl);
    }
  };

  // Use reviews or reviewCount for compatibility
  const displayReviewCount = garage.reviewCount || garage.reviews || 0;

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleViewDetails}
      data-testid="garage-card"
    >
      <div className="aspect-video relative">
        <img
          src={garage.imageUrl}
          alt={garage.name}
          className="w-full h-full object-cover"
        />
        {garage.isOpen !== undefined && (
          <Badge 
            className={`absolute top-2 right-2 ${
              garage.isOpen ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {garage.isOpen ? 'Open' : 'Closed'}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{garage.name}</h3>
            <p className="text-sm text-muted-foreground">{garage.type}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{garage.rating}</span>
            <span className="text-xs text-muted-foreground">({displayReviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{garage.address}</span>
          <span className="text-sm font-medium ml-auto">{garage.distance}</span>
        </div>
        
        {garage.estimatedTime && (
          <div className="flex items-center gap-1 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Est. {garage.estimatedTime}</span>
          </div>
        )}
        
        {garage.specializations && garage.specializations.length > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {garage.specializations.slice(0, 2).map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
              {garage.specializations.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{garage.specializations.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <Button 
            className="flex-1 bg-garage-purple hover:bg-garage-purple/90"
            onClick={handleBookNowClick}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageCard;
