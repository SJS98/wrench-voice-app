
import { cn } from '@/lib/utils';

interface BookingStepperProps {
  currentStep: number;
  totalSteps: number;
}

const BookingStepper = ({ currentStep, totalSteps }: BookingStepperProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-center items-center text-sm text-gray-500 mb-2">
        Step {currentStep} of {totalSteps}: {getStepLabel(currentStep)}
      </div>
      <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-garage-purple h-full transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Helper function to get step label
const getStepLabel = (step: number): string => {
  switch (step) {
    case 1: return 'Select Vehicle';
    case 2: return 'Select Service';
    case 3: return 'Booking Details';
    case 4: return 'Payment';
    case 5: return 'Confirmation';
    default: return '';
  }
};

export default BookingStepper;
