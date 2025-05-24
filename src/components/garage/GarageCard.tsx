import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VehicleType } from "@/types/vehicles";
import VehicleIcon from "@/components/vehicles/VehicleIcon";

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
  supportedVehicles?: VehicleType[];
}

interface GarageCardProps {
  garage: Garage;
  isSaved?: boolean;
  className?: string;
  selectedVehicleType?: VehicleType;
}

const GarageCard = ({
  garage,
  isSaved = false,
  className,
  selectedVehicleType,
}: GarageCardProps) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(isSaved);

  // If supportedVehicles is not defined, assume garage supports all vehicle types
  const isCompatible =
    !garage.supportedVehicles ||
    !selectedVehicleType ||
    garage.supportedVehicles.includes(selectedVehicleType);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/book-service/${garage.id}`);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/garage/${garage.id}`);
  };

  return (
    <div
      className={cn("garage-card", className, !isCompatible && "opacity-70")}
    >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#8B5CF6"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              garage.isOpen
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            )}
          >
            {garage.isOpen ? "Open Now" : "Closed"}
          </span>
        </div>

        {garage.supportedVehicles && (
          <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-md">
            <div className="flex space-x-1">
              {garage.supportedVehicles.map((type) => (
                <VehicleIcon
                  key={type}
                  type={type}
                  className={`h-4 w-4 ${
                    selectedVehicleType === type
                      ? "text-garage-purple"
                      : "text-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
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
          <span>
            {garage.address} • {garage.distance}
          </span>
        </div>

        {garage.openTime && garage.closeTime && (
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {garage.openTime} - {garage.closeTime}
            </span>
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {garage.services?.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="text-xs bg-secondary px-2 py-1 rounded-full"
            >
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
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <Button
            className="flex-1 bg-garage-purple hover:bg-garage-purple/90"
            disabled={!isCompatible}
            onClick={handleBookNow}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GarageCard;
