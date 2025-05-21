
import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Search } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useToast } from '@/hooks/use-toast';
import VehicleIcon from '@/components/vehicles/VehicleIcon';
import { VehicleType } from '@/types/vehicles';

// Mock data for saved/purchased vehicles
const mockSavedVehicles = [
  {
    id: '1',
    title: '2019 Hyundai i20 - Low Mileage, Single Owner',
    type: 'car' as VehicleType,
    make: 'Hyundai',
    model: 'i20',
    year: 2019,
    price: 650000,
    condition: 'Excellent',
    location: 'Bangalore, Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
    savedDate: '2025-05-15T08:30:00Z',
  },
  {
    id: '2',
    title: '2020 Royal Enfield Classic 350 - BS6 Model',
    type: 'bike' as VehicleType,
    make: 'Royal Enfield',
    model: 'Classic 350',
    year: 2020,
    price: 140000,
    condition: 'Good',
    location: 'Delhi, NCR',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop',
    savedDate: '2025-05-10T14:45:00Z',
  },
];

const mockPurchasedVehicles = [
  {
    id: '3',
    title: '2018 Maruti Suzuki Swift VXI - Family Car',
    type: 'car',
    make: 'Maruti Suzuki',
    model: 'Swift VXI',
    year: 2018,
    price: 520000,
    condition: 'Good',
    location: 'Mumbai, Maharashtra',
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600&auto=format&fit=crop',
    purchaseDate: '2025-04-20T11:15:00Z',
    seller: 'Express Auto Resale',
  },
];

const SavedVehicles = () => {
  const { user } = useUserAuth();
  const { toast } = useToast();
  
  const handleRemoveFromSaved = (id: string) => {
    toast({
      title: "Removed from Saved",
      description: "Vehicle has been removed from your saved list",
    });
  };
  
  return (
    <ProtectedRoute>
      <AppLayout title="Saved Vehicles" showBackButton>
        <div className="container py-4 pb-20">
          <h1 className="text-2xl font-bold mb-6">Saved & Purchased Vehicles</h1>
          
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="purchased">Purchased</TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved" className="space-y-4">
              {mockSavedVehicles.length > 0 ? (
                mockSavedVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-48 sm:h-auto relative">
                        <img 
                          src={vehicle.imageUrl} 
                          alt={vehicle.title} 
                          className="w-full h-full object-cover"
                        />
                        <Badge className={`
                          absolute top-2 left-2
                          ${vehicle.condition === 'Excellent' ? 'bg-green-500' : 
                          vehicle.condition === 'Good' ? 'bg-blue-500' : 'bg-yellow-500'}
                        `}>
                          {vehicle.condition}
                        </Badge>
                      </div>
                      
                      <CardContent className="flex-1 p-4">
                        <div className="flex justify-between">
                          <Link to={`/used-vehicles/${vehicle.id}`}>
                            <h3 className="font-semibold text-lg hover:text-garage-purple transition-colors">
                              {vehicle.title}
                            </h3>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveFromSaved(vehicle.id)}
                            className="h-8 w-8"
                          >
                            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        
                        <div className="text-xl font-bold text-garage-purple mt-1 mb-2">
                          ₹{vehicle.price.toLocaleString()}
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{vehicle.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <VehicleIcon type={vehicle.type} size={14} />
                            {vehicle.make} {vehicle.model}
                          </Badge>
                          <Badge variant="outline">{vehicle.year}</Badge>
                        </div>
                        
                        <div className="flex gap-2 mt-auto">
                          <Link to={`/used-vehicles/${vehicle.id}`}>
                            <Button>View Details</Button>
                          </Link>
                          <Button variant="outline">Contact Seller</Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-6">
                    You haven't saved any vehicles yet
                  </p>
                  <Link to="/used-vehicles">
                    <Button className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Browse Vehicles
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="purchased" className="space-y-4">
              {mockPurchasedVehicles.length > 0 ? (
                mockPurchasedVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-48 sm:h-auto relative">
                        <img 
                          src={vehicle.imageUrl} 
                          alt={vehicle.title} 
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-blue-500">
                          Purchased
                        </Badge>
                      </div>
                      
                      <CardContent className="flex-1 p-4">
                        <Link to={`/used-vehicles/${vehicle.id}`}>
                          <h3 className="font-semibold text-lg hover:text-garage-purple transition-colors">
                            {vehicle.title}
                          </h3>
                        </Link>
                        
                        <div className="text-xl font-bold text-garage-purple mt-1 mb-2">
                          ₹{vehicle.price.toLocaleString()}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Purchased From:</span>
                            <p className="font-medium">{vehicle.seller}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Purchase Date:</span>
                            <p className="font-medium">
                              {new Date(vehicle.purchaseDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Vehicle:</span>
                            <p className="font-medium">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <p className="font-medium">{vehicle.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-auto">
                          <Link to={`/used-vehicles/${vehicle.id}`}>
                            <Button variant="outline">View Details</Button>
                          </Link>
                          <Link to="/my-bookings">
                            <Button variant="outline">Service History</Button>
                          </Link>
                          <Link to="/sos">
                            <Button variant="outline">Get Help</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-6">
                    You haven't purchased any vehicles yet
                  </p>
                  <Link to="/used-vehicles">
                    <Button className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Browse Vehicles
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default SavedVehicles;
