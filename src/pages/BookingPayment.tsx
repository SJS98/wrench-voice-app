
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookingStepper from '@/components/booking/BookingStepper';
import { BookingData } from './Booking';
import { useToast } from '@/hooks/use-toast';

type PaymentMethod = 'upi' | 'google_pay' | 'net_banking' | 'card';

const BookingPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookingData } = location.state as { bookingData: BookingData } || { bookingData: null };
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  
  if (!bookingData) {
    // Redirect if no booking data is available
    navigate('/booking');
    return null;
  }

  // Check if it's a remote service that requires advance payment
  const isRemoteService = bookingData.serviceType === 'repair_at_home';
  const transportFee = isRemoteService ? 149 : 0;
  const basePrice = 499;
  const taxAmount = Math.round((basePrice + transportFee) * 0.18);
  const totalAmount = basePrice + transportFee + taxAmount;

  const handlePayment = () => {
    // Here you would integrate with a payment gateway
    // For now, we'll just simulate a successful payment
    navigate('/booking/confirmation', { 
      state: { 
        bookingData, 
        paymentMethod,
        paymentDetails: {
          amount: totalAmount,
          isPaid: true
        }
      } 
    });
  };
  
  const handlePayLater = () => {
    // Don't allow pay later for remote services
    if (isRemoteService) {
      toast({
        title: "Advance payment required",
        description: "Remote services require advance payment for transport charges.",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/booking/confirmation', { 
      state: { 
        bookingData, 
        paymentMethod: 'pay_later',
        paymentDetails: {
          amount: totalAmount,
          isPaid: false
        }
      } 
    });
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
        <BookingStepper currentStep={4} totalSteps={5} />

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
              <span>₹{basePrice}</span>
            </div>
            {isRemoteService && (
              <div className="flex justify-between mb-2">
                <span>Transport Charge</span>
                <span>₹{transportFee}</span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>₹{taxAmount}</span>
            </div>
            <div className="border-t border-dashed my-2"></div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className="w-full bg-garage-purple hover:bg-garage-purple/90 text-white"
          >
            Pay Now ₹{totalAmount}
          </Button>
          <Button
            onClick={handlePayLater}
            variant="outline"
            className={`w-full mt-2 ${isRemoteService ? 'opacity-50' : ''}`}
            disabled={isRemoteService}
          >
            {isRemoteService ? 'Advance Payment Required' : 'Pay after service'}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookingPayment;
