
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard, { Service } from '@/components/service/ServiceCard';
import { Button } from '@/components/ui/button';
import VoiceCommandButton from '@/components/voice/VoiceCommandButton';

// Mock service data
const mockServices: Record<string, Service[]> = {
  popular: [
    {
      id: '1',
      name: 'Basic Service',
      description: 'Oil change, filter replacement, and basic inspection',
      price: 2499,
      duration: '2 hours',
      iconUrl: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Full Car Wash',
      description: 'Interior & exterior cleaning with polish',
      price: 999,
      duration: '1 hour',
      iconUrl: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Tire Rotation',
      description: 'Rotate tires for even wear and alignment check',
      price: 799,
      duration: '45 min',
      iconUrl: '/placeholder.svg'
    }
  ],
  maintenance: [
    {
      id: '4',
      name: 'Standard Service',
      description: 'Complete car checkup with fluid top ups',
      price: 3499,
      duration: '3 hours',
      iconUrl: '/placeholder.svg'
    },
    {
      id: '5',
      name: 'Battery Replacement',
      description: 'Replace old battery with new one (battery cost extra)',
      price: 399,
      duration: '30 min',
      iconUrl: '/placeholder.svg'
    },
    {
      id: '6',
      name: 'Oil & Filter Change',
      description: 'Premium oil and filter replacement',
      price: 1599,
      duration: '1 hour',
      iconUrl: '/placeholder.svg'
    }
  ],
  repair: [
    {
      id: '7',
      name: 'Brake Pad Replacement',
      description: 'Replace front or rear brake pads',
      price: 2999,
      duration: '2 hours',
      iconUrl: '/placeholder.svg'
    },
    {
      id: '8',
      name: 'AC Service',
      description: 'Complete AC system service and gas refill',
      price: 3999,
      duration: '3 hours',
      iconUrl: '/placeholder.svg'
    },
    {
      id: '9',
      name: 'Clutch Repair',
      description: 'Diagnose and repair clutch issues',
      price: 7999,
      duration: '5 hours',
      iconUrl: '/placeholder.svg'
    }
  ],
  tires: [
    {
      id: '10',
      name: 'Wheel Alignment',
      description: 'Computer assisted wheel alignment',
      price: 1299,
      duration: '1 hour',
      iconUrl: '/placeholder.svg'
    },
    {
      id: '11',
      name: 'Tire Replacement',
      description: 'Replace tires (cost of tires extra)',
      price: 799,
      duration: '1 hour',
      iconUrl: '/placeholder.svg'
    },
    {
      id: '12',
      name: 'Puncture Repair',
      description: 'Fix tire punctures and leaks',
      price: 299,
      duration: '30 min',
      iconUrl: '/placeholder.svg'
    }
  ]
};

const vehicles = [
  { id: '1', name: 'Honda City', regNumber: 'KA05AB1234', year: 2019 },
  { id: '2', name: 'Maruti Swift', regNumber: 'MH01CD5678', year: 2021 }
];

const ServicesPage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);
  const [activeTab, setActiveTab] = useState('popular');

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.values(mockServices).flat().forEach(service => {
      if (selectedServices.includes(service.id)) {
        total += service.price;
      }
    });
    return total;
  };

  return (
    <AppLayout title="Book Services" showBackButton>
      <div className="page-container">
        <div className="mb-6">
          <label htmlFor="vehicle-select" className="block text-sm font-medium mb-1">
            Select Vehicle
          </label>
          <select
            id="vehicle-select"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-garage-purple focus:border-garage-purple"
          >
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} • {vehicle.regNumber}
              </option>
            ))}
          </select>
        </div>
        
        <h2 className="section-title">Choose Services</h2>
        
        <Tabs defaultValue="popular" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="repair">Repair</TabsTrigger>
            <TabsTrigger value="tires">Tires</TabsTrigger>
          </TabsList>
          
          {Object.entries(mockServices).map(([category, services]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selectedServices.includes(service.id)}
                  onClick={() => toggleServiceSelection(service.id)}
                />
              ))}
            </TabsContent>
          ))}
        </Tabs>
        
        {selectedServices.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Selected Services:</span>
              <span className="font-bold">₹{getTotalPrice().toLocaleString()}</span>
            </div>
            <Link to="/search">
              <Button className="w-full bg-garage-purple hover:bg-garage-purple/90">
                Continue to Select Garage
              </Button>
            </Link>
          </div>
        )}
        
        <VoiceCommandButton />
      </div>
    </AppLayout>
  );
};

export default ServicesPage;
