
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { VehicleType } from '@/types/vehicles';
import VehicleSelection from '@/components/booking/VehicleSelection';
import ServiceTypeSelection from '@/components/booking/ServiceTypeSelection';
import BookingForm from '@/components/booking/BookingForm';
import BookingStepper from '@/components/booking/BookingStepper';

export type ServiceType = 'repair_at_home' | 'repair_at_location' | 'repair_pickup_delivery';

export interface BookingData {
  vehicleType: VehicleType | null;
  serviceType: ServiceType | null;
  address: string;
  date: string;
  time: string;
}

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    vehicleType: null,
    serviceType: null,
    address: '',
    date: '',
    time: '',
  });

  const handleVehicleSelect = (vehicleType: VehicleType) => {
    setBookingData(prev => ({ ...prev, vehicleType }));
    setCurrentStep(2);
  };

  const handleServiceTypeSelect = (serviceType: ServiceType) => {
    setBookingData(prev => ({ ...prev, serviceType }));
    setCurrentStep(3);
  };

  const handleFormSubmit = (formData: Pick<BookingData, 'address' | 'date' | 'time'>) => {
    setBookingData(prev => ({ ...prev, ...formData }));
    
    // Here we would typically save the booking data to a backend
    // For now, we'll navigate to a confirmation page
    navigate('/booking/payment', { state: { bookingData: { ...bookingData, ...formData } } });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSearchManually = () => {
    navigate('/search');
  };

  return (
    <AppLayout title="Book Service" showBackButton>
      <div className="page-container">
        <BookingStepper currentStep={currentStep} totalSteps={4} />

        {currentStep === 1 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-6">Vehicle Type</h2>
            <VehicleSelection onVehicleSelect={handleVehicleSelect} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-6">Service Type</h2>
            <ServiceTypeSelection onServiceTypeSelect={handleServiceTypeSelect} />
          </div>
        )}

        {currentStep === 3 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
            <BookingForm onSubmit={handleFormSubmit} />
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full mb-2"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={handleSearchManually}
            variant="secondary"
            className="w-full"
          >
            Search Manually
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Booking;
