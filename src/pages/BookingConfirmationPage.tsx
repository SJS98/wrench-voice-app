
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { BookingData } from './Booking';
import ConfirmationAnimation from '@/components/booking/ConfirmationAnimation';
import { MapPin, Calendar, Clock, Phone } from 'lucide-react';
import { vehicleTypeNames } from '@/types/vehicles';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, paymentMethod } = location.state as { 
    bookingData: BookingData; 
    paymentMethod: string;
  } || { bookingData: null, paymentMethod: null };

  if (!bookingData) {
    // Redirect if no booking data is available
    navigate('/booking');
    return null;
  }

  const handleViewDetails = () => {
    // Navigate to booking details
    navigate('/my-bookings');
  };

  const handleExploreMore = () => {
    navigate('/services');
  };

  return (
    <AppLayout title="Booking Confirmed" showBackButton={false}>
      <div className="page-container">
        <ConfirmationAnimation />

        <div className="mt-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Garage Detail</h2>
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-medium text-lg mb-1">The Bike Start</h3>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-medium w-28">Owner Name:</span>
                <span>Najor Sheikh</span>
              </div>
              <div className="flex">
                <span className="font-medium w-28">Owner Contact:</span>
                <span className="text-blue-600">+91 888 999 8880</span>
              </div>
              <div className="flex">
                <span className="font-medium w-28">Mechanic Name:</span>
                <span>Lakhan Chaudhary</span>
              </div>
              <div className="flex">
                <span className="font-medium w-28">Mechanic Contact:</span>
                <span className="text-blue-600">+91 777 888 8880</span>
              </div>
              <div className="flex">
                <span className="font-medium w-28">Garage Address:</span>
                <span>Karve Nagar, Pune</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Booking Detail</h2>
          <div className="bg-white rounded-lg border">
            <div className="p-4 space-y-4">
              <div className="flex items-center">
                <div className="w-8">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    🚗
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Vehicle Type</span>
                  <p className="font-medium">{bookingData.vehicleType ? vehicleTypeNames[bookingData.vehicleType] : ''}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    🔧
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Service Type</span>
                  <p className="font-medium">
                    {bookingData.serviceType?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8">
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Address</span>
                  <p className="font-medium">{bookingData.address}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Date</span>
                  <p className="font-medium">{bookingData.date}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Time</span>
                  <p className="font-medium">{bookingData.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-4">
          <Button
            onClick={handleViewDetails}
            className="w-full bg-garage-purple hover:bg-garage-purple/90"
          >
            View Details
          </Button>
          <Button
            onClick={handleExploreMore}
            variant="outline"
            className="w-full"
          >
            Explore more
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookingConfirmationPage;
