
import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Car, Calendar, Clock, ChevronRight } from 'lucide-react';
import VoiceCommandButton from '@/components/voice/VoiceCommandButton';

// Mock booking data
const mockBookings = [
  {
    id: 'BK123456',
    garageId: '1',
    garageName: 'Auto Care Center',
    services: ['Basic Service', 'Tire Rotation'],
    vehicle: {
      id: '1',
      name: 'Honda City',
      regNumber: 'KA05AB1234',
      year: 2019
    },
    date: new Date('2025-05-25'),
    timeSlot: '10:00 AM',
    status: 'upcoming',
    totalPrice: 3298
  },
  {
    id: 'BK789012',
    garageId: '2',
    garageName: 'Quick Wheel Service',
    services: ['Wheel Alignment'],
    vehicle: {
      id: '1',
      name: 'Honda City',
      regNumber: 'KA05AB1234',
      year: 2019
    },
    date: new Date('2025-06-05'),
    timeSlot: '02:00 PM',
    status: 'upcoming',
    totalPrice: 1299
  },
  {
    id: 'BK345678',
    garageId: '3',
    garageName: 'Car Doctor',
    services: ['AC Service', 'Full Car Wash'],
    vehicle: {
      id: '2',
      name: 'Maruti Swift',
      regNumber: 'MH01CD5678',
      year: 2021
    },
    date: new Date('2025-05-10'),
    timeSlot: '11:00 AM',
    status: 'completed',
    totalPrice: 4998
  },
  {
    id: 'BK901234',
    garageId: '1',
    garageName: 'Auto Care Center',
    services: ['Oil Change'],
    vehicle: {
      id: '1',
      name: 'Honda City',
      regNumber: 'KA05AB1234',
      year: 2019
    },
    date: new Date('2025-04-18'),
    timeSlot: '09:00 AM',
    status: 'completed',
    totalPrice: 1599
  }
];

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const filteredBookings = mockBookings.filter(booking => booking.status === activeTab);

  return (
    <AppLayout title="My Bookings" showBackButton>
      <div className="p-4 pb-24">
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No upcoming bookings</p>
                <Link to="/services">
                  <Button variant="link" className="mt-2">
                    Book a Service
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No completed bookings</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <VoiceCommandButton />
      </div>
    </AppLayout>
  );
};

interface BookingCardProps {
  booking: {
    id: string;
    garageId: string;
    garageName: string;
    services: string[];
    vehicle: {
      id: string;
      name: string;
      regNumber: string;
      year: number;
    };
    date: Date;
    timeSlot: string;
    status: string;
    totalPrice: number;
  };
}

const BookingCard = ({ booking }: BookingCardProps) => {
  return (
    <Link to={`/booking-details/${booking.id}`}>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-garage-purple p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-white">{booking.garageName}</h3>
              <p className="text-xs text-white/80">Booking ID: {booking.id}</p>
            </div>
            <div className="bg-white rounded-full px-3 py-1 text-xs font-medium text-garage-purple">
              {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Car className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{booking.vehicle.name}</p>
                <p className="text-xs text-muted-foreground">{booking.vehicle.regNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{format(booking.date, 'dd MMMM yyyy')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{booking.timeSlot}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Services</p>
                <p className="text-sm font-medium">{booking.services.join(', ')}</p>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">₹{booking.totalPrice.toLocaleString()}</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyBookingsPage;
