
import React from 'react';

const ConfirmationAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">Book Request Accepted</h2>
      <p className="text-center text-gray-500">
        Your service has been booked successfully!
      </p>
    </div>
  );
};

export default ConfirmationAnimation;
