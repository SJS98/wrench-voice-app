
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { VehicleType } from '@/types/vehicles';
import VehicleSelection from '@/components/booking/VehicleSelection';
import ServiceTypeSelection from '@/components/booking/ServiceTypeSelection';
import BookingForm from '@/components/booking/BookingForm';
import BookingStepper from '@/components/booking/BookingStepper';
import GarageSearch from '@/components/booking/GarageSearch';
import { Garage } from '@/components/garage/GarageCard';

export type ServiceType = 'repair_at_home' | 'repair_at_location' | 'repair_pickup_delivery';

export interface BookingData {
  vehicleType: VehicleType | null;
  serviceType: ServiceType | null;
  address: string;
  date: string;
  time: string;
  garage?: Garage;
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

  const handleGarageSelect = (garage: Garage) => {
    setBookingData(prev => ({ ...prev, garage }));
    setCurrentStep(4);
  };

  const handleFormSubmit = (formData: Pick<BookingData, 'address' | 'date' | 'time'>) => {
    setBookingData(prev => ({ ...prev, ...formData }));
    
    // Navigate to payment page with updated booking data
    navigate('/booking/payment', { 
      state: { 
        bookingData: { 
          ...bookingData, 
          ...formData
        } 
      } 
    });
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
        <BookingStepper currentStep={currentStep} totalSteps={5} />

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
            <h2 className="text-xl font-semibold mb-6">Find Nearby Garage</h2>
            <GarageSearch 
              vehicleType={bookingData.vehicleType}
              onGarageSelect={handleGarageSelect}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
            
            {bookingData.garage && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Selected Garage</h3>
                <p>{bookingData.garage.name}</p>
                <p className="text-sm text-gray-500">{bookingData.garage.address}</p>
              </div>
            )}
            
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
