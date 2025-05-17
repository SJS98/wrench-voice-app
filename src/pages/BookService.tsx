
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard, { Service } from '@/components/service/ServiceCard';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Car, Clock, CreditCard } from 'lucide-react';
import { useUserAuth } from '@/contexts/UserAuthContext';
import VoiceCommandButton from '@/components/voice/VoiceCommandButton';

// Mock garage data
const mockGarageDetails = {
  id: '1',
  name: 'Auto Care Center',
  type: 'Service & Repair',
  address: 'MG Road, Bangalore',
  distance: '1.2 km',
  rating: 4.7,
  reviewCount: 124,
  imageUrl: 'https://images.unsplash.com/photo-1617886903355-df116483a857?q=80&w=600&auto=format&fit=crop',
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

// Mock vehicles
const mockVehicles = [
  { id: '1', name: 'Honda City', regNumber: 'KA05AB1234', year: 2019 },
  { id: '2', name: 'Maruti Swift', regNumber: 'MH01CD5678', year: 2021 }
];

// Available time slots
const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const BookServicePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useUserAuth();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState(mockVehicles[0].id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('services');

  // Fetch garage data on component mount
  useEffect(() => {
    if (!id) {
      navigate('/search');
      toast({
        title: "Error",
        description: "Invalid garage ID",
        variant: "destructive"
      });
    }
    // In a real app, we would fetch the garage data based on the ID
  }, [id, navigate, toast]);

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(sid => sid !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    let total = 0;
    mockServices.forEach(service => {
      if (selectedServices.includes(service.id)) {
        total += service.price;
      }
    });
    return total;
  };

  const handleBookService = () => {
    if (!selectedDate || !selectedTimeSlot || selectedServices.length === 0) {
      toast({
        title: "Incomplete booking",
        description: "Please select services, date and time slot",
        variant: "destructive"
      });
      return;
    }

    if (!isAuthenticated) {
      // In a real app, we would redirect to login
      toast({
        title: "Login required",
        description: "Please login to book a service",
        variant: "destructive"
      });
      return;
    }

    // Navigate to checkout
    navigate('/checkout', { 
      state: { 
        garageId: id,
        garageName: mockGarageDetails.name,
        services: selectedServices,
        vehicle: mockVehicles.find(v => v.id === selectedVehicle),
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        totalPrice: getTotalPrice()
      } 
    });
  };

  return (
    <AppLayout title="Book Service" showBackButton>
      <div className="p-4 pb-32">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Book at {mockGarageDetails.name}</h2>
          <p className="text-muted-foreground">{mockGarageDetails.address}</p>
        </div>

        <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <h3 className="text-lg font-medium mb-3">Select Services</h3>
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                selected={selectedServices.includes(service.id)}
                onClick={() => toggleServiceSelection(service.id)}
              />
            ))}

            <div className="flex justify-end mt-6">
              <Button 
                onClick={() => setActiveTab('vehicle')} 
                disabled={selectedServices.length === 0}
                className="bg-garage-purple hover:bg-garage-purple/90"
              >
                Continue
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="vehicle">
            <h3 className="text-lg font-medium mb-4">Select Vehicle</h3>

            <div className="space-y-4 mb-6">
              {mockVehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedVehicle === vehicle.id 
                      ? 'border-garage-purple bg-garage-purple/5' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Car className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">{vehicle.name}</h4>
                      <p className="text-sm text-muted-foreground">{vehicle.regNumber} • {vehicle.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab('services')}>
                Back
              </Button>
              <Button 
                onClick={() => setActiveTab('schedule')} 
                className="bg-garage-purple hover:bg-garage-purple/90"
              >
                Continue
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Date</span>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-3"
                disabled={(date) => 
                  date < new Date() || 
                  date > new Date(new Date().setDate(new Date().getDate() + 30))
                }
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Time Slot</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    className={selectedTimeSlot === slot ? "bg-garage-purple" : ""}
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab('vehicle')}>
                Back
              </Button>
              <Button 
                onClick={handleBookService} 
                disabled={!selectedDate || !selectedTimeSlot || selectedServices.length === 0}
                className="bg-garage-purple hover:bg-garage-purple/90"
              >
                Proceed to Checkout
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {selectedServices.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Selected Services: {selectedServices.length}</span>
              <span className="font-bold">₹{getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                {selectedVehicle && (
                  <span className="text-xs text-muted-foreground">
                    {mockVehicles.find(v => v.id === selectedVehicle)?.name} • 
                    {selectedDate && format(selectedDate, ' dd MMM')}{selectedTimeSlot ? `, ${selectedTimeSlot}` : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <VoiceCommandButton />
      </div>
    </AppLayout>
  );
};

export default BookServicePage;
