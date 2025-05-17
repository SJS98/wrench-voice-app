
import React from 'react';
import { Car, Bike, Truck, Bus, Bicycle } from 'lucide-react';
import { VehicleType } from '@/types/vehicles';

// Custom component for Auto Rickshaw as it's not in lucide-react
const AutoRickshaw = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 18v-6.5a3.5 3.5 0 0 1 3.5-3.5h8a3.5 3.5 0 0 1 3.5 3.5V18" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M5 9v1h2" />
    <path d="M7.5 15h9" />
    <path d="M16 9h3l2 4h-3" />
  </svg>
);

interface VehicleIconProps {
  type: VehicleType;
  className?: string;
  size?: number;
}

const VehicleIcon: React.FC<VehicleIconProps> = ({ type, className, size = 24 }) => {
  switch (type) {
    case 'car':
      return <Car className={className} size={size} />;
    case 'bike':
      return <Bike className={className} size={size} />;
    case 'truck':
      return <Truck className={className} size={size} />;
    case 'bus':
      return <Bus className={className} size={size} />;
    case 'auto-rickshaw':
      return <AutoRickshaw className={className} width={size} height={size} />;
    case 'bicycle':
      return <Bicycle className={className} size={size} />;
    default:
      return <Car className={className} size={size} />;
  }
};

export default VehicleIcon;
