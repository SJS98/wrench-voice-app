
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GarageCard, { Garage } from '@/components/garage/GarageCard';
import VoiceCommandButton from '@/components/voice/VoiceCommandButton';
import { Search as SearchIcon, MapPin, List, Settings } from 'lucide-react';

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
    services: ['Oil Change', 'Brake Repair', 'Engine Diagnostics']
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
    services: ['Wheel Alignment', 'Tire Replacement', 'Balancing']
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
    services: ['Engine Repair', 'AC Service', 'Electrical']
  },
  {
    id: '4',
    name: 'Highway Motors',
    type: 'Multi-brand Workshop',
    address: 'Indiranagar, Bangalore',
    distance: '4.1 km',
    rating: 4.8,
    reviews: 210,
    imageUrl: 'https://images.unsplash.com/photo-1613214177885-74ca3500b8a3?q=80&w=600&auto=format&fit=crop',
    isOpen: true,
    openTime: '7:30 AM',
    closeTime: '9:00 PM',
    services: ['General Service', 'Custom Work', 'Roadside Assistance']
  },
  {
    id: '5',
    name: 'Reliable Auto Shop',
    type: 'Repair & Maintenance',
    address: 'Whitefield, Bangalore',
    distance: '7.3 km',
    rating: 4.0,
    reviews: 78,
    imageUrl: 'https://images.unsplash.com/photo-1566233590969-d77010fc90f8?q=80&w=600&auto=format&fit=crop',
    isOpen: true,
    openTime: '10:00 AM',
    closeTime: '7:00 PM',
    services: ['AC Service', 'Engine Work', 'Body Repair']
  }
];

// Filter types
const serviceTypes = ['All', 'Repair', 'Maintenance', 'Wheel & Tire', 'Body Shop', 'AC Service'];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filteredGarages, setFilteredGarages] = useState(mockGarages);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call with the search query
    const filtered = mockGarages.filter(garage => 
      garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGarages(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    
    if (filter === 'All') {
      setFilteredGarages(mockGarages);
    } else {
      const filtered = mockGarages.filter(garage => 
        garage.services?.some(service => service.includes(filter)) ||
        garage.type.includes(filter)
      );
      setFilteredGarages(filtered);
    }
  };

  return (
    <AppLayout title="Find Garages" showSearch={false}>
      <div className="page-container">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by garage name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>
        </form>
        
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-100"
              onClick={() => {}}
            >
              <MapPin className="h-4 w-4 mr-1" />
              Near Me
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-100"
              onClick={() => {}}
            >
              <Settings className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
          
          <div className="flex border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              className={viewMode === 'list' ? 'bg-garage-purple text-white' : ''}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={viewMode === 'map' ? 'bg-garage-purple text-white' : ''}
              onClick={() => setViewMode('map')}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 pb-1">
            {serviceTypes.map((type) => (
              <Button
                key={type}
                variant="ghost"
                size="sm"
                className={
                  selectedFilter === type 
                    ? "bg-garage-purple text-white" 
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }
                onClick={() => handleFilterChange(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredGarages.length > 0 ? (
              filteredGarages.map((garage) => (
                <GarageCard key={garage.id} garage={garage} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No garages found matching your criteria</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('All');
                    setFilteredGarages(mockGarages);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg h-[500px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Map view coming soon</p>
              <Button 
                variant="outline"
                onClick={() => setViewMode('list')}
              >
                Switch to List View
              </Button>
            </div>
          </div>
        )}

        <VoiceCommandButton />
      </div>
    </AppLayout>
  );
};

export default SearchPage;
