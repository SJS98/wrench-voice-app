
import { useState } from 'react';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarDays, Clock, Phone, User } from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  date: string;
  timeSlot: string;
  status: 'new' | 'in-progress' | 'completed';
}

const ManageBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      customerName: 'John Doe',
      customerPhone: '+91 98765 43210',
      service: 'Oil Change',
      date: '2024-03-20',
      timeSlot: '10:00 AM',
      status: 'new',
    },
  ]);

  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    toast({
      title: 'Status Updated',
      description: 'Booking status has been updated successfully',
    });
  };

  return (
    <AppLayout title="Manage Bookings" showBackButton>
      <div className="container p-4">
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{booking.customerName}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    booking.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {booking.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {booking.customerPhone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {booking.timeSlot}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    {booking.date}
                  </div>
                </div>

                <div className="flex gap-2">
                  {booking.status === 'new' && (
                    <Button 
                      className="flex-1"
                      onClick={() => updateBookingStatus(booking.id, 'in-progress')}
                    >
                      Start Service
                    </Button>
                  )}
                  {booking.status === 'in-progress' && (
                    <Button 
                      className="flex-1"
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                    >
                      Mark as Complete
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => {
                      window.location.href = `tel:${booking.customerPhone}`;
                    }}
                  >
                    Call Customer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ManageBookings;
