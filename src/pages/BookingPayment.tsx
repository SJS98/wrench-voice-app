
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookingStepper from '@/components/booking/BookingStepper';
import { BookingData } from './Booking';

type PaymentMethod = 'upi' | 'google_pay' | 'net_banking' | 'card';

const BookingPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state as { bookingData: BookingData } || { bookingData: null };
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  
  if (!bookingData) {
    // Redirect if no booking data is available
    navigate('/booking');
    return null;
  }

  const handlePayment = () => {
    // Here you would integrate with a payment gateway
    // For now, we'll just simulate a successful payment
    navigate('/booking/confirmation', { state: { bookingData, paymentMethod } });
  };

  const paymentOptions = [
    { id: 'upi' as PaymentMethod, name: 'UPI', icon: '📱' },
    { id: 'google_pay' as PaymentMethod, name: 'Google Pay', icon: '💳' },
    { id: 'net_banking' as PaymentMethod, name: 'Net Banking', icon: '🏦' },
    { id: 'card' as PaymentMethod, name: 'Credit/Debit Card', icon: '💳' },
  ];

  return (
    <AppLayout title="Payment" showBackButton>
      <div className="page-container">
        <BookingStepper currentStep={4} totalSteps={4} />

        <div className="mt-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Booking Detail</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-500">Vehicle Type</p>
                <p className="font-medium">{bookingData.vehicleType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="font-medium">
                  {bookingData.serviceType?.replace(/_/g, ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{bookingData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{bookingData.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{bookingData.time}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                className={`w-full border rounded-lg p-4 flex items-center transition-colors ${
                  paymentMethod === option.id
                    ? 'border-garage-purple bg-garage-purple/5'
                    : 'border-gray-200 hover:border-garage-purple/40'
                }`}
                onClick={() => setPaymentMethod(option.id)}
              >
                <span className="text-xl mr-3">{option.icon}</span>
                <span className="font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pb-24">
          <h2 className="text-lg font-semibold mb-4">Price Estimate</h2>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span>Base Service Charge</span>
              <span>₹499</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Travel Charge</span>
              <span>₹99</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>₹108</span>
            </div>
            <div className="border-t border-dashed my-2"></div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹706</span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className="w-full bg-garage-purple hover:bg-garage-purple/90 text-white"
          >
            Pay Now ₹706
          </Button>
          <Button
            onClick={() => navigate('/booking')}
            variant="outline"
            className="w-full mt-2"
          >
            Pay after service
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookingPayment;
