
import { useEffect, useState } from 'react';
import { Garage } from '@/components/garage/GarageCard';
import { VehicleType } from '@/types/vehicles';
import GarageCard from '@/components/garage/GarageCard';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface GarageSearchProps {
  vehicleType: VehicleType | null;
  onGarageSelect: (garage: Garage) => void;
}

// Mock data for garages
const mockGarages: Garage[] = [
  {
    id: '1',
    name: 'Auto Care Center',
    type: 'Service & Repair',
    address: 'MG Road, Bangalore',
    distance: '1.2 km',
    rating: 4.7,
    reviews: 124,
    imageUrl: 'https://images.unsplash.com/photo-1617886903355-df116483a857?q=80&w=600&auto=format&fit=crop',
    isOpen: true,
    openTime: '8:00 AM',
    closeTime: '8:00 PM',
    services: ['Oil Change', 'Brake Repair', 'Engine Diagnostics'],
    supportedVehicles: ['car', 'bike', 'auto-rickshaw']
  },
  {
    id: '2',
    name: 'Quick Wheel Service',
    type: 'Tire & Wheel',
    address: 'HSR Layout, Bangalore',
    distance: '2.5 km',
    rating: 4.5,
    reviews: 86,
    imageUrl: 'https://images.unsplash.com/photo-1601101108231-11f5f9a282aa?q=80&w=600&auto=format&fit=crop',
    isOpen: true,
    openTime: '9:00 AM',
    closeTime: '7:00 PM',
    services: ['Wheel Alignment', 'Tire Replacement', 'Balancing'],
    supportedVehicles: ['car', 'bike', 'truck']
  },
  {
    id: '3',
    name: 'Car Doctor',
    type: 'Full Service',
    address: 'Koramangala, Bangalore',
    distance: '3.7 km',
    rating: 4.2,
    reviews: 152,
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=600&auto=format&fit=crop',
    isOpen: false,
    openTime: '9:00 AM',
    closeTime: '8:00 PM',
    services: ['Engine Repair', 'AC Service', 'Electrical'],
    supportedVehicles: ['car']
  }
];

const GarageSearch = ({ vehicleType, onGarageSelect }: GarageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGarages, setFilteredGarages] = useState<Garage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllGarages, setShowAllGarages] = useState(false);
  
  useEffect(() => {
    // Simulate loading garages
    const timer = setTimeout(() => {
      const filtered = vehicleType 
        ? mockGarages.filter(garage => 
            garage.supportedVehicles?.includes(vehicleType))
        : mockGarages;
      
      // Sort garages by rating (highest first)
      const sortedGarages = [...filtered].sort((a, b) => 
        (b.rating || 0) - (a.rating || 0)
      );
      
      setFilteredGarages(sortedGarages);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [vehicleType]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = mockGarages.filter(garage => {
      // Filter by vehicle type
      const matchesVehicleType = !vehicleType || 
        garage.supportedVehicles?.includes(vehicleType);
      
      // Filter by search query
      const matchesSearch = !searchQuery || 
        garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        garage.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesVehicleType && matchesSearch;
    });
    
    // Sort by rating
    const sortedGarages = [...filtered].sort((a, b) => 
      (b.rating || 0) - (a.rating || 0)
    );
    
    setFilteredGarages(sortedGarages);
    setShowAllGarages(true);
  };

  // Get the best recommended garage (first in the sorted list)
  const bestGarage = filteredGarages.length > 0 ? filteredGarages[0] : null;
  
  return (
    <div className="py-4">
      {!showAllGarages && !loading && bestGarage ? (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-lg font-medium text-green-800 mb-1">Recommended Garage</h3>
            <p className="text-sm text-green-700 mb-4">
              We've found the best garage for you based on ratings and service quality
            </p>
            <div className="mb-4">
              <GarageCard 
                garage={bestGarage}
                selectedVehicleType={vehicleType || undefined}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => onGarageSelect(bestGarage)}
                className="flex-1 bg-garage-purple hover:bg-garage-purple/90"
              >
                Continue with this garage
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowAllGarages(true)}
                className="flex-1"
              >
                View other options
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search garages by name or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4"
              />
            </div>
          </form>
          
          <div className="mb-4 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-100"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Near Me
            </Button>
            
            <div className="ml-auto text-sm text-gray-500">
              {filteredGarages.length} garages found
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 border rounded-lg animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGarages.length > 0 ? (
                filteredGarages.map(garage => (
                  <div key={garage.id} onClick={() => onGarageSelect(garage)}>
                    <GarageCard 
                      garage={garage}
                      selectedVehicleType={vehicleType || undefined}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No garages found matching your criteria</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery('');
                      setFilteredGarages(vehicleType 
                        ? mockGarages.filter(g => g.supportedVehicles?.includes(vehicleType))
                        : mockGarages
                      );
                    }}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {showAllGarages && filteredGarages.length > 0 && (
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAllGarages(false)}
                className="w-full"
              >
                Show recommended garage
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GarageSearch;
