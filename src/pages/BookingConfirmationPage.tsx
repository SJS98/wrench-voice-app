
import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import ConfirmationAnimation from '@/components/booking/ConfirmationAnimation';
import BookingStepper from '@/components/booking/BookingStepper';
import { BookingData } from './Booking';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';

interface BookingConfirmationState {
  bookingData: BookingData;
  paymentMethod: string;
  paymentDetails?: {
    amount: number;
    isPaid: boolean;
  };
}

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingConfirmationState;

  // If there's no booking data in the state, redirect to the booking page
  useEffect(() => {
    if (!state || !state.bookingData) {
      navigate('/booking');
    }
  }, [state, navigate]);

  if (!state || !state.bookingData) {
    return null;
  }

  const { bookingData, paymentMethod, paymentDetails } = state;
  const isPaid = paymentDetails?.isPaid ?? false;
  const bookingId = `BK${Math.floor(Math.random() * 1000000)}`;

  return (
    <AppLayout title="Booking Confirmation" showBackButton={false}>
      <div className="page-container pb-24">
        <BookingStepper currentStep={5} totalSteps={5} />

        <ConfirmationAnimation isPaid={isPaid} />

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Booking Details</h3>
          
          <div className="grid gap-4">
            <div className="flex items-center">
              <div className="bg-garage-purple/10 p-2 rounded-full mr-3">
                <Calendar className="h-4 w-4 text-garage-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{bookingData.date}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-garage-purple/10 p-2 rounded-full mr-3">
                <Clock className="h-4 w-4 text-garage-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{bookingData.time}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-garage-purple/10 p-2 rounded-full mr-3">
                <MapPin className="h-4 w-4 text-garage-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{bookingData.address}</p>
              </div>
            </div>
            
            {bookingData.garage && (
              <div className="flex items-center">
                <div className="bg-garage-purple/10 p-2 rounded-full mr-3">
                  <MapPin className="h-4 w-4 text-garage-purple" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Garage</p>
                  <p className="font-medium">{bookingData.garage.name}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <div className="bg-garage-purple/10 p-2 rounded-full mr-3">
                <CreditCard className="h-4 w-4 text-garage-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-medium">
                  {isPaid 
                    ? `Paid via ${paymentMethod.replace('_', ' ')}` 
                    : 'Pay after service'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-sm">Booking ID</span>
              <span className="font-medium">{bookingId}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col gap-4">
          <Button asChild>
            <Link to="/my-bookings">
              View Your Bookings
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookingConfirmationPage;
