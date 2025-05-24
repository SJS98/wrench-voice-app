
import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Car, 
  Wrench, 
  AlertTriangle, 
  ChevronRight, 
  MapPin, 
  Wrench as Tool, 
  Calendar,
  ShoppingBag,
  Camera
} from 'lucide-react';

const HomePage = () => {
  return (
    <AppLayout title="Mr. Mechanic" showBackButton={false}>
      <div className="p-4 pb-20">
        {/* Hero Section */}
        <div className="mb-6 relative overflow-hidden rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1597766353939-b683bfd58b28?q=80&w=500&auto=format&fit=crop" 
            alt="Mechanic working on car"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-4">
            <h1 className="text-white text-xl font-bold mb-1">Welcome to Mr. Mechanic</h1>
            <p className="text-white/90 text-sm mb-4">Your one-stop solution for vehicle care</p>
            <Link to="/services">
              <Button>Book a Service</Button>
            </Link>
          </div>
        </div>
        
        {/* Quick Actions */}
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Link to="/services" className="flex flex-col items-center justify-center bg-garage-purple/10 p-3 rounded-lg">
            <Wrench className="h-6 w-6 text-garage-purple mb-2" />
            <span className="text-xs text-center">Book Service</span>
          </Link>
          
          <Link to="/spare-parts" className="flex flex-col items-center justify-center bg-garage-purple/10 p-3 rounded-lg">
            <ShoppingBag className="h-6 w-6 text-garage-purple mb-2" />
            <span className="text-xs text-center">Buy Parts</span>
          </Link>
          
          <Link to="/sos" className="flex flex-col items-center justify-center bg-red-100 p-3 rounded-lg">
            <SOS className="h-6 w-6 text-red-500 mb-2" />
            <span className="text-xs text-center">SOS</span>
          </Link>
        </div>
        
        {/* Used Vehicles */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Buy Used Vehicles</h2>
            <Link to="/used-vehicles" className="text-sm text-garage-purple flex items-center">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex">
                <img 
                  src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=150&auto=format&fit=crop" 
                  alt="Used car"
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="ml-3 flex-1">
                  <h3 className="font-medium mb-1">Find Your Perfect Vehicle</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Browse certified used cars, bikes & more
                  </p>
                  <Link to="/used-vehicles">
                    <Button variant="outline" size="sm" className="w-full">
                      <Car className="h-4 w-4 mr-2" />
                      Browse Used Vehicles
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Spare Parts Section - New */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Spare Parts</h2>
            <Link to="/spare-parts" className="text-sm text-garage-purple flex items-center">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=150&auto=format&fit=crop" 
                  alt="Spare parts"
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="ml-3 flex-1">
                  <h3 className="font-medium mb-1">Quality Spare Parts</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Find genuine parts for all vehicles
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/spare-parts">
                      <Button variant="outline" size="sm" className="w-full">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Shop Parts
                      </Button>
                    </Link>
                    <Link to="/sell-spare-part">
                      <Button variant="outline" size="sm" className="w-full">
                        <Tool className="h-4 w-4 mr-2" />
                        Sell Parts
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Service Media Section - New */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Service Media</h2>
          </div>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex">
                <div className="w-24 h-24 rounded-md bg-blue-100 flex items-center justify-center">
                  <Camera className="h-10 w-10 text-blue-500" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium mb-1">Track Services Visually</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    See photos, videos & live feeds of your vehicle service
                  </p>
                  <Link to="/my-bookings">
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Your Services
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Nearby Garages */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Nearby Garages</h2>
            <Link to="/search" className="text-sm text-garage-purple flex items-center">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow-sm border">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Auto Care Center</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>2.3 km away</span>
                  </div>
                </div>
                <div className="flex items-center bg-green-100 px-2 py-1 rounded-full text-xs text-green-700">
                  <span>Open</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 shadow-sm border">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Quick Wheel Service</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>3.5 km away</span>
                  </div>
                </div>
                <div className="flex items-center bg-green-100 px-2 py-1 rounded-full text-xs text-green-700">
                  <span>Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
