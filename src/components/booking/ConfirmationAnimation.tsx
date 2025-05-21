
import React from 'react';
import { Check, Clock } from 'lucide-react';

interface ConfirmationAnimationProps {
  isPaid?: boolean;
}

const ConfirmationAnimation: React.FC<ConfirmationAnimationProps> = ({ isPaid = true }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`w-24 h-24 ${isPaid ? 'bg-green-500' : 'bg-amber-500'} rounded-full flex items-center justify-center mb-4 animate-bounce`}>
        {isPaid ? (
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        ) : (
          <Clock className="w-12 h-12 text-white" strokeWidth={3} />
        )}
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">Book Request Accepted</h2>
      <p className="text-center text-gray-500">
        {isPaid 
          ? 'Your service has been booked and payment received!' 
          : 'Your service has been booked. Payment will be collected after service.'}
      </p>
    </div>
  );
};

export default ConfirmationAnimation;
