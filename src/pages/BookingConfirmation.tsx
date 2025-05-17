
import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Calendar, 
  Car, 
  CheckCircle, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Share
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';

interface BookingConfirmationState {
  bookingId: string;
  garageId: string;
  garageName: string;
  services: string[];
  vehicle: {
    id: string;
    name: string;
    regNumber: string;
    year: number;
  };
  date: string;
  timeSlot: string;
  totalPrice: number;
  paymentMethod: string;
}

// Mock services data to match IDs from booking
const mockServicesData = {
  '1': 'Basic Service',
  '2': 'Full Car Wash',
  '3': 'Tire Rotation',
  '4': 'AC Service',
};

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const bookingDetails = location.state as BookingConfirmationState;
  
  useEffect(() => {
    if (!bookingDetails) {
      navigate('/');
      toast({
        title: "Error",
        description: "Booking details not found",
        variant: "destructive"
      });
    }
  }, [bookingDetails, navigate, toast]);
  
  if (!bookingDetails) {
    return null;
  }

  const handleShareBooking = () => {
    // In a real app, this would use the Web Share API
    toast({
      title: "Booking Shared",
      description: "Booking details have been shared"
    });
  };

  return (
    <AppLayout title="Booking Confirmation" showBackButton={false}>
      <div className="p-4 pb-24">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          
          <h2 className="text-xl font-bold text-center">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-center mt-1">
            Your appointment has been scheduled successfully
          </p>
          
          <div className="bg-gray-100 px-4 py-2 rounded-full mt-4 text-center">
            <span className="font-medium">Booking ID: </span>
            <span>{bookingDetails.bookingId}</span>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="bg-white rounded-lg border mb-6">
          <div className="p-4 border-b">
            <h3 className="font-medium">Appointment Details</h3>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex gap-3">
              <div className="bg-garage-purple/10 p-2 rounded-full h-fit">
                <MapPin className="h-5 w-5 text-garage-purple" />
              </div>
              <div>
                <h4 className="font-medium">{bookingDetails.garageName}</h4>
                <p className="text-sm text-muted-foreground">Workshop Location</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-garage-purple/10 p-2 rounded-full h-fit">
                <Calendar className="h-5 w-5 text-garage-purple" />
              </div>
              <div>
                <h4 className="font-medium">{
                  typeof bookingDetails.date === 'string' 
                    ? new Date(bookingDetails.date).toLocaleDateString() 
                    : format(new Date(bookingDetails.date), 'dd MMMM yyyy')
                }</h4>
                <p className="text-sm text-muted-foreground">Appointment Date</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-garage-purple/10 p-2 rounded-full h-fit">
                <Clock className="h-5 w-5 text-garage-purple" />
              </div>
              <div>
                <h4 className="font-medium">{bookingDetails.timeSlot}</h4>
                <p className="text-sm text-muted-foreground">Appointment Time</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-garage-purple/10 p-2 rounded-full h-fit">
                <Car className="h-5 w-5 text-garage-purple" />
              </div>
              <div>
                <h4 className="font-medium">{bookingDetails.vehicle.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {bookingDetails.vehicle.regNumber} • {bookingDetails.vehicle.year}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services */}
        <div className="bg-white rounded-lg border mb-6">
          <div className="p-4 border-b">
            <h3 className="font-medium">Services Booked</h3>
          </div>
          
          <div className="p-4">
            <ul className="space-y-2">
              {bookingDetails.services.map(serviceId => (
                <li key={serviceId} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{mockServicesData[serviceId as keyof typeof mockServicesData]}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-4 border-t flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">₹{bookingDetails.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="space-y-3">
          <Link to="/my-bookings">
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>View All Bookings</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          
          <Button onClick={handleShareBooking} variant="outline" className="w-full">
            <Share className="h-4 w-4 mr-2" />
            Share Booking Details
          </Button>
          
          <Link to="/">
            <Button className="w-full bg-garage-purple hover:bg-garage-purple/90">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookingConfirmationPage;
