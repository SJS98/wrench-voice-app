
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard, { Service } from '@/components/service/ServiceCard';
import { Button } from '@/components/ui/button';
import VoiceCommandButton from '@/components/voice/VoiceCommandButton';
import { VehicleType } from '@/types/vehicles';
import VehicleIcon from '@/components/vehicles/VehicleIcon';
import { vehicleTypeNames } from '@/types/vehicles';

// Mock service data with vehicle compatibility
const mockServices: Record<string, Service[]> = {
  popular: [
    {
      id: '1',
      name: 'Basic Service',
      description: 'Oil change, filter replacement, and basic inspection',
      price: 2499,
      duration: '2 hours',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bike', 'auto-rickshaw']
    },
    {
      id: '2',
      name: 'Full Car Wash',
      description: 'Interior & exterior cleaning with polish',
      price: 999,
      duration: '1 hour',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bike', 'auto-rickshaw', 'truck', 'bus']
    },
    {
      id: '3',
      name: 'Tire Rotation',
      description: 'Rotate tires for even wear and alignment check',
      price: 799,
      duration: '45 min',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'truck', 'bus']
    }
  ],
  maintenance: [
    {
      id: '4',
      name: 'Standard Service',
      description: 'Complete vehicle checkup with fluid top ups',
      price: 3499,
      duration: '3 hours',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bike', 'truck', 'bus', 'auto-rickshaw']
    },
    {
      id: '5',
      name: 'Battery Replacement',
      description: 'Replace old battery with new one (battery cost extra)',
      price: 399,
      duration: '30 min',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bike', 'truck', 'bus', 'auto-rickshaw']
    },
    {
      id: '6',
      name: 'Oil & Filter Change',
      description: 'Premium oil and filter replacement',
      price: 1599,
      duration: '1 hour',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'truck', 'bus']
    }
  ],
  repair: [
    {
      id: '7',
      name: 'Brake Pad Replacement',
      description: 'Replace front or rear brake pads',
      price: 2999,
      duration: '2 hours',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bike']
    },
    {
      id: '8',
      name: 'AC Service',
      description: 'Complete AC system service and gas refill',
      price: 3999,
      duration: '3 hours',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bus', 'truck']
    },
    {
      id: '9',
      name: 'Clutch Repair',
      description: 'Diagnose and repair clutch issues',
      price: 7999,
      duration: '5 hours',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bike']
    }
  ],
  tires: [
    {
      id: '10',
      name: 'Wheel Alignment',
      description: 'Computer assisted wheel alignment',
      price: 1299,
      duration: '1 hour',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'truck', 'bus']
    },
    {
      id: '11',
      name: 'Tire Replacement',
      description: 'Replace tires (cost of tires extra)',
      price: 799,
      duration: '1 hour',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bike', 'auto-rickshaw', 'bicycle', 'truck', 'bus']
    },
    {
      id: '12',
      name: 'Puncture Repair',
      description: 'Fix tire punctures and leaks',
      price: 299,
      duration: '30 min',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'bike', 'auto-rickshaw', 'bicycle', 'truck', 'bus']
    }
  ],
  specialized: [
    {
      id: '13',
      name: 'Chain Lubrication',
      description: 'Clean and lubricate chain for smooth operation',
      price: 299,
      duration: '30 min',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['bike', 'bicycle']
    },
    {
      id: '14',
      name: 'Gear Adjustment',
      description: 'Fine tune gear shifting mechanism',
      price: 499,
      duration: '45 min',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['bike', 'bicycle']
    },
    {
      id: '15',
      name: 'CNG Kit Service',
      description: 'Complete check and service of CNG installation',
      price: 1999,
      duration: '2 hours',
      iconUrl: '/placeholder.svg',
      compatibleVehicles: ['car', 'auto-rickshaw']
    }
  ]
};

const vehicles = [
  { id: '1', name: 'Honda City', regNumber: 'KA05AB1234', year: 2019, type: 'car' as VehicleType },
  { id: '2', name: 'Maruti Swift', regNumber: 'MH01CD5678', year: 2021, type: 'car' as VehicleType },
  { id: '3', name: 'Hero Splendor', regNumber: 'DL05XY9876', year: 2022, type: 'bike' as VehicleType },
  { id: '4', name: 'Tata Ace', regNumber: 'TN01ZZ1122', year: 2020, type: 'truck' as VehicleType }
];

const ServicesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehicleIdFromParams = queryParams.get('vehicleId');
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicleIdFromParams || vehicles[0].id);
  const [activeTab, setActiveTab] = useState('popular');

  // Find the selected vehicle
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
  
  // Filter services based on vehicle type
  const filteredServices = Object.fromEntries(
    Object.entries(mockServices).map(([category, services]) => [
      category,
      services.filter(service => 
        !selectedVehicle || 
        !service.compatibleVehicles || 
        service.compatibleVehicles.includes(selectedVehicle.type)
      )
    ])
  );

  useEffect(() => {
    // Clear selected services when vehicle changes
    setSelectedServices([]);
  }, [selectedVehicleId]);

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
        // Apply price multiplier based on vehicle type
        const priceMultipliers: Record<VehicleType, number> = {
          'car': 1,
          'bike': 0.6,
          'truck': 2.5,
          'bus': 3,
          'auto-rickshaw': 0.8,
          'bicycle': 0.3
        };
        
        const multiplier = selectedVehicle ? priceMultipliers[selectedVehicle.type] : 1;
        total += Math.round(service.price * multiplier);
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
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
            className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-garage-purple focus:border-garage-purple"
          >
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} • {vehicle.regNumber} • {vehicleTypeNames[vehicle.type]}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Choose Services</h2>
          {selectedVehicle && (
            <div className="flex items-center gap-1 bg-garage-purple/10 px-2 py-1 rounded">
              <VehicleIcon type={selectedVehicle.type} className="h-4 w-4 text-garage-purple" />
              <span className="text-sm text-garage-purple">{vehicleTypeNames[selectedVehicle.type]}</span>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="popular" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="repair">Repair</TabsTrigger>
            <TabsTrigger value="tires">Tires</TabsTrigger>
            <TabsTrigger value="specialized">Specialized</TabsTrigger>
          </TabsList>
          
          {Object.entries(filteredServices).map(([category, services]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={selectedServices.includes(service.id)}
                    onClick={() => toggleServiceSelection(service.id)}
                    selectedVehicleType={selectedVehicle?.type}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No services available for {selectedVehicle?.type}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {selectedServices.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Selected Services:</span>
              <span className="font-bold">₹{getTotalPrice().toLocaleString()}</span>
            </div>
            <Link to={`/search?vehicleId=${selectedVehicleId}&vehicleType=${selectedVehicle?.type}`}>
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
