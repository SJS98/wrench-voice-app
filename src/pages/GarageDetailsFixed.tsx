
// NOTE: This is a fixed version of GarageDetails.tsx that resolves the duplicate property error.
// Since GarageDetails.tsx is a read-only file, a project maintainer will need to rename this file
// to GarageDetails.tsx to replace the original file.

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Info, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';
import ServiceCard, { Service } from '@/components/service/ServiceCard';

// Mock garage data
const mockGarageDetails = {
  id: '1',
  name: 'Auto Care Center',
  type: 'Service & Repair',
  address: 'MG Road, Bangalore',
  distance: '1.2 km',
  rating: 4.7,
  reviewCount: 124, // renamed from reviews to avoid duplicate property
  phone: '+91 98765 43210',
  openTime: '8:00 AM',
  closeTime: '8:00 PM',
  isOpen: true,
  images: [
    'https://images.unsplash.com/photo-1617886903355-df116483a857?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1613214177885-74ca3500b8a3?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566233590969-d77010fc90f8?q=80&w=600&auto=format&fit=crop'
  ],
  description: 'Auto Care Center is a full-service auto repair and maintenance facility. We service all makes and models and specialize in brake repair, oil changes, and computer diagnostics.',
  reviews: [
    {
      id: '1',
      user: 'Rajesh K',
      rating: 5,
      date: '2 days ago',
      comment: 'Great service, very professional and timely.'
    },
    {
      id: '2',
      user: 'Priya M',
      rating: 4,
      date: '1 week ago',
      comment: 'Good experience. Fixed my car AC issue quickly.'
    }
  ]
};

// Mock services
const mockServices: Service[] = [
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
  },
  {
    id: '4',
    name: 'AC Service',
    description: 'Complete AC system service and gas refill',
    price: 3999,
    duration: '3 hours',
    iconUrl: '/placeholder.svg'
  }
];

const GarageDetailsPage = () => {
  const { id } = useParams<{id: string}>();
  const garage = mockGarageDetails; // In real app, fetch garage by ID
  
  return (
    <AppLayout title={garage.name} showBackButton>
      <div>
        <div className="relative">
          {/* Main Image */}
          <img 
            src={garage.images[0]} 
            alt={garage.name} 
            className="w-full h-52 object-cover"
          />
          
          {/* Image gallery indicator */}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {garage.images.length} photos
          </div>
          
          {/* Status badge */}
          <div className="absolute bottom-2 left-2">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              garage.isOpen ? "bg-green-500 text-white" : "bg-gray-500 text-white"
            }`}>
              {garage.isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{garage.name}</h1>
              <div className="flex items-center gap-1 bg-garage-purple/10 px-2 py-1 rounded-md">
                <Star className="h-4 w-4 fill-garage-purple text-garage-purple" />
                <span className="font-medium text-garage-purple">{garage.rating}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground">{garage.type}</p>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{garage.address} • {garage.distance}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{garage.openTime} - {garage.closeTime}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{garage.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mb-6">
            <Link to={`/book-service/${garage.id}`} className="flex-1">
              <Button className="w-full bg-garage-purple hover:bg-garage-purple/90">Book Service</Button>
            </Link>
            <Button variant="outline" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
          
          <Tabs defaultValue="services">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="mt-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Available Services</h2>
                <Link to={`/book-service/${garage.id}`} className="text-sm text-garage-purple">
                  View All
                </Link>
              </div>
              
              {mockServices.slice(0, 3).map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  selected={false}
                  onClick={() => {}}
                />
              ))}
              
              <Link to={`/book-service/${garage.id}`}>
                <Button variant="outline" className="w-full">
                  View All Services
                </Button>
              </Link>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold">{garage.rating}</span>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {garage.reviewCount} reviews</p>
                </div>
                
                <Button variant="outline" size="sm">
                  Write Review
                </Button>
              </div>
              
              <div className="space-y-4">
                {garage.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{review.user}</h3>
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${
                                  i < review.rating 
                                    ? "fill-yellow-400 text-yellow-400" 
                                    : "fill-gray-200 text-gray-200"
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Reviews
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="mt-4">
              <h3 className="font-semibold mb-2">About {garage.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {garage.description}
              </p>
              
              <div className="space-y-4">
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="bg-garage-purple/10 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-garage-purple" />
                      </div>
                      <div>
                        <h3 className="font-medium">Business Hours</h3>
                        <p className="text-xs text-muted-foreground">Opening times</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-garage-purple/10 p-2 rounded-full">
                        <Info className="h-5 w-5 text-garage-purple" />
                      </div>
                      <div>
                        <h3 className="font-medium">More Details</h3>
                        <p className="text-xs text-muted-foreground">Services, facilities, etc.</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default GarageDetailsPage;
