
import React from 'react';
import { Link } from 'react-router-dom';
import { UsedVehicle } from '@/types/usedVehicles';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MapPin, Star } from 'lucide-react';
import VehicleIcon from '@/components/vehicles/VehicleIcon';
import { formatDistanceToNow } from 'date-fns';

interface VehicleCardProps {
  vehicle: UsedVehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const formattedDate = formatDistanceToNow(new Date(vehicle.createdAt), { addSuffix: true });
  
  return (
    <Link to={`/used-vehicles/${vehicle.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          {vehicle.images && vehicle.images.length > 0 ? (
            <img 
              src={vehicle.images[0]} 
              alt={vehicle.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <VehicleIcon type={vehicle.type} size={64} className="text-gray-400" />
            </div>
          )}
          
          <div className="absolute top-2 left-2">
            <Badge className={`
              ${vehicle.condition === 'Excellent' ? 'bg-green-500' : 
                vehicle.condition === 'Good' ? 'bg-blue-500' : 
                'bg-yellow-500'}
            `}>
              {vehicle.condition}
            </Badge>
          </div>
          
          {vehicle.negotiable && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white/80">Negotiable</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium line-clamp-1">{vehicle.title}</h3>
          </div>
          
          <div className="text-xl font-bold text-garage-purple mb-2">
            ₹{vehicle.price.toLocaleString()}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="line-clamp-1">{vehicle.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <VehicleIcon type={vehicle.type} size={14} />
              {vehicle.make} {vehicle.model}
            </Badge>
            <Badge variant="outline">{vehicle.year}</Badge>
            <Badge variant="outline">{vehicle.fuelType}</Badge>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {vehicle.sellerRating}
              </Badge>
              <span className="text-xs ml-2">{vehicle.sellerName}</span>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              {vehicle.views}
              <span className="ml-2">{formattedDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VehicleCard;
