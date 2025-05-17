
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  Calendar, 
  Car, 
  Clock, 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  CircleDollarSign
} from 'lucide-react';
import { useUserAuth } from '@/contexts/UserAuthContext';

interface BookingState {
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
  totalPrice: number;
}

// Mock services data to match IDs from booking
const mockServicesData = {
  '1': { name: 'Basic Service', price: 2499 },
  '2': { name: 'Full Car Wash', price: 999 },
  '3': { name: 'Tire Rotation', price: 799 },
  '4': { name: 'AC Service', price: 3999 },
};

// Payment methods
const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'upi', name: 'UPI', icon: Wallet },
  { id: 'cod', name: 'Pay at Garage', icon: CircleDollarSign },
];

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserAuth();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get booking details from navigation state
  const bookingState = location.state as BookingState;
  
  if (!bookingState) {
    // Redirect back if no booking data
    navigate('/services');
    return null;
  }

  const handlePayment = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success!
      toast({
        title: "Booking Confirmed!",
        description: "Your service has been booked successfully."
      });
      
      // Navigate to booking confirmation
      navigate('/booking-confirmation', { 
        state: { 
          ...bookingState,
          bookingId: `BK${Math.floor(Math.random() * 1000000)}`,
          paymentMethod
        } 
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout title="Checkout" showBackButton>
      <div className="p-4 pb-32">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Complete Your Booking</h2>
          <p className="text-muted-foreground">Review and confirm your service booking</p>
        </div>

        {/* Booking Summary */}
        <div className="mb-6 bg-white rounded-lg border p-4">
          <h3 className="font-medium mb-3">Booking Summary</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-garage-purple/10 p-2 rounded-full">
                <Car className="h-4 w-4 text-garage-purple" />
              </div>
              <div>
                <p className="text-sm font-medium">{bookingState.vehicle.name}</p>
                <p className="text-xs text-muted-foreground">{bookingState.vehicle.regNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-garage-purple/10 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-garage-purple" />
              </div>
              <div>
                <p className="text-sm font-medium">{format(new Date(bookingState.date), 'dd MMMM yyyy')}</p>
                <p className="text-xs text-muted-foreground">Appointment Date</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-garage-purple/10 p-2 rounded-full">
                <Clock className="h-4 w-4 text-garage-purple" />
              </div>
              <div>
                <p className="text-sm font-medium">{bookingState.timeSlot}</p>
                <p className="text-xs text-muted-foreground">Time Slot</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-6 bg-white rounded-lg border p-4">
          <h3 className="font-medium mb-3">Services</h3>
          
          <div className="space-y-2">
            {bookingState.services.map(serviceId => (
              <div key={serviceId} className="flex justify-between text-sm">
                <span>{mockServicesData[serviceId as keyof typeof mockServicesData]?.name}</span>
                <span>₹{mockServicesData[serviceId as keyof typeof mockServicesData]?.price.toLocaleString()}</span>
              </div>
            ))}
            
            <div className="border-t pt-2 mt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>₹{bookingState.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-6 bg-white rounded-lg border p-4">
          <h3 className="font-medium mb-3">Customer Details</h3>
          
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Name:</span> {user?.name}</p>
            <p><span className="text-muted-foreground">Phone:</span> {user?.phone}</p>
            <p><span className="text-muted-foreground">Email:</span> {user?.email}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8 bg-white rounded-lg border p-4">
          <h3 className="font-medium mb-3">Payment Method</h3>
          
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                  paymentMethod === method.id 
                    ? 'border-garage-purple bg-garage-purple/5' 
                    : 'border-gray-200'
                }`}
              >
                <method.icon className="h-5 w-5" />
                <span>{method.name}</span>
                {paymentMethod === method.id && (
                  <CheckCircle className="h-5 w-5 ml-auto text-garage-purple" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-garage-purple hover:bg-garage-purple/90"
        >
          {isLoading ? 'Processing...' : `Pay ₹${bookingState.totalPrice.toLocaleString()}`}
        </Button>
      </div>
    </AppLayout>
  );
};

export default CheckoutPage;
