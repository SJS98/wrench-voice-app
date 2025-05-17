
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import GarageCard, { Garage } from '@/components/garage/GarageCard';
import VoiceCommandButton from '@/components/voice/VoiceCommandButton';
import { Car, Package, SOS, Bell, Star } from 'lucide-react';

// Mock data for nearby garages
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
  }
];

// Mock data for quick service options
const quickServices = [
  { id: '1', name: 'Oil Change', icon: '🔧' },
  { id: '2', name: 'Car Wash', icon: '🚿' },
  { id: '3', name: 'Tire Service', icon: '🛞' },
  { id: '4', name: 'Battery', icon: '🔋' }
];

const Home = () => {
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
      setUserName('Rahul');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout title="Mr.GarageWala">
      <div className="page-container">
        <div className="mt-2 mb-6">
          <p className="text-muted-foreground">Welcome back,</p>
          <h1 className="text-2xl font-bold">{loading ? 'Loading...' : userName}</h1>
        </div>

        {/* Quick Access Actions */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          <Link to="/services">
            <div className="flex flex-col items-center">
              <div className="bg-garage-purple/10 p-3 rounded-full mb-2">
                <Car className="h-5 w-5 text-garage-purple" />
              </div>
              <span className="text-xs">Services</span>
            </div>
          </Link>
          
          <Link to="/order-parts">
            <div className="flex flex-col items-center">
              <div className="bg-garage-blue/10 p-3 rounded-full mb-2">
                <Package className="h-5 w-5 text-garage-blue" />
              </div>
              <span className="text-xs">Parts</span>
            </div>
          </Link>
          
          <Link to="/garage-bag">
            <div className="flex flex-col items-center">
              <div className="bg-garage-orange/10 p-3 rounded-full mb-2">
                <Star className="h-5 w-5 text-garage-orange" />
              </div>
              <span className="text-xs">Saved</span>
            </div>
          </Link>
          
          <Link to="/sos">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-3 rounded-full mb-2">
                <SOS className="h-5 w-5 text-red-500" />
              </div>
              <span className="text-xs">SOS</span>
            </div>
          </Link>
        </div>

        {/* Quick Service Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title">Quick Book</h2>
            <Link to="/services" className="text-sm text-garage-purple">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickServices.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <div className="border rounded-lg p-4 text-center hover:border-garage-purple/50 hover:bg-garage-purple/5 transition-colors">
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <div className="text-sm font-medium">{service.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Active Bookings Alert */}
        <div className="bg-garage-purple/10 border border-garage-purple/20 rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-garage-purple/20 p-2 rounded-full">
              <Bell className="h-5 w-5 text-garage-purple" />
            </div>
            <div>
              <h3 className="font-medium text-sm">You have an active booking</h3>
              <p className="text-xs text-muted-foreground">Oil Change • Today, 2:30 PM</p>
            </div>
          </div>
          <Link to="/track-service/123">
            <Button variant="outline" size="sm" className="border-garage-purple text-garage-purple">
              Track
            </Button>
          </Link>
        </div>

        {/* Nearby Garages Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title">Nearby Garages</h2>
            <Link to="/search" className="text-sm text-garage-purple">View All</Link>
          </div>
          <div className="space-y-4">
            {mockGarages.map((garage) => (
              <GarageCard key={garage.id} garage={garage} />
            ))}
          </div>
        </div>

        <VoiceCommandButton />
      </div>
    </AppLayout>
  );
};

export default Home;
