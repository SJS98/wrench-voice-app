
import { ServiceType } from '@/pages/Booking';

interface ServiceTypeSelectionProps {
  onServiceTypeSelect: (serviceType: ServiceType) => void;
}

const ServiceTypeSelection = ({ onServiceTypeSelect }: ServiceTypeSelectionProps) => {
  const serviceTypes: Array<{ id: ServiceType; name: string; description: string; icon: string }> = [
    {
      id: 'repair_at_home',
      name: 'Repair at Home',
      description: 'Mechanic visits your location',
      icon: '🏠',
    },
    {
      id: 'repair_at_location',
      name: 'Repair at Location',
      description: 'Visit the garage location',
      icon: '🔧',
    },
    {
      id: 'repair_pickup_delivery',
      name: 'Repair Pickup & Delivery',
      description: 'We collect and return your vehicle',
      icon: '🚚',
    },
  ];

  return (
    <div className="space-y-4">
      {serviceTypes.map((service) => (
        <button
          key={service.id}
          className="border border-gray-200 rounded-lg p-4 flex items-center w-full hover:border-garage-purple/60 hover:bg-garage-purple/5 transition-colors"
          onClick={() => onServiceTypeSelect(service.id)}
        >
          <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4">
            {service.icon}
          </div>
          <div className="text-left">
            <h3 className="font-medium">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ServiceTypeSelection;
