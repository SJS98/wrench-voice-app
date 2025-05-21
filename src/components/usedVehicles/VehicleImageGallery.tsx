
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VehicleIcon from '@/components/vehicles/VehicleIcon';
import { VehicleType } from '@/types/vehicles';

interface VehicleImageGalleryProps {
  images: string[];
  vehicleType: VehicleType;
  alt: string;
}

const VehicleImageGallery: React.FC<VehicleImageGalleryProps> = ({ 
  images,
  vehicleType,
  alt
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrevious = () => {
    setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <VehicleIcon type={vehicleType} size={96} className="text-gray-400" />
      </div>
    );
  }
  
  return (
    <div className="relative w-full">
      {/* Main Image */}
      <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={images[activeIndex]} 
          alt={`${alt} - Image ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button 
              variant="secondary" 
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 text-black rounded-full"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="secondary" 
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 text-black rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex mt-2 space-x-2 overflow-x-auto py-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 
                ${activeIndex === index ? 'border-garage-purple' : 'border-transparent'}`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleImageGallery;
