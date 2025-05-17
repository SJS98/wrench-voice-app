
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmergencyContact {
  id: string;
  name: string;
  type: 'garage' | 'police' | 'towing';
  phone: string;
  distance?: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Roadside Assistance',
    type: 'towing',
    phone: '1800-123-4567',
  },
  {
    id: '2',
    name: 'Police Emergency',
    type: 'police',
    phone: '100',
  },
  {
    id: '3',
    name: '24/7 Auto Care',
    type: 'garage',
    phone: '9876543210',
    distance: '1.2 km',
  },
  {
    id: '4',
    name: 'Highway Rescue',
    type: 'towing',
    phone: '9988776655',
    distance: '3.5 km',
  },
];

const SOSPage = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  const activateEmergency = () => {
    setIsEmergencyActive(true);
    
    // Start countdown
    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(timer);
        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ lat: latitude, lng: longitude });
              
              toast({
                title: "SOS Signal Activated",
                description: "Emergency contacts have been notified of your location.",
              });
            },
            (error) => {
              console.error("Error getting location:", error);
              toast({
                title: "Location Error",
                description: "Could not get your location. Please try calling the emergency contacts directly.",
                variant: "destructive",
              });
            }
          );
        } else {
          toast({
            title: "Location Not Supported",
            description: "Your browser does not support geolocation.",
            variant: "destructive",
          });
        }
      }
    }, 1000);
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(3);
    setLocation(null);
    
    toast({
      title: "SOS Cancelled",
      description: "Emergency signal has been cancelled.",
    });
  };

  const callNumber = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <AppLayout title="Emergency SOS" showBackButton>
      <div className="page-container flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Emergency Assistance</h1>
            <p className="text-muted-foreground">
              Tap the SOS button to alert nearby services about your emergency situation
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            {!isEmergencyActive ? (
              <Button
                className="h-32 w-32 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl font-bold shadow-lg"
                onClick={activateEmergency}
              >
                SOS
              </Button>
            ) : countdown > 0 ? (
              <div className="relative">
                <Button
                  className="h-32 w-32 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl font-bold animate-pulse-soft"
                  onClick={cancelEmergency}
                >
                  Cancel
                </Button>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
                  {countdown}
                </div>
              </div>
            ) : (
              <Button
                className="h-32 w-32 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl font-bold animate-pulse-soft"
                onClick={cancelEmergency}
              >
                Active
              </Button>
            )}
          </div>
          
          {location && (
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <MapPin className="h-4 w-4" />
                <span>Location shared successfully</span>
              </div>
            </div>
          )}
          
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Emergency Contacts</h2>
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>{contact.phone}</span>
                      {contact.distance && (
                        <>
                          <span>•</span>
                          <span>{contact.distance}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button 
                    size="icon" 
                    className="bg-green-500 hover:bg-green-600 h-10 w-10 rounded-full"
                    onClick={() => callNumber(contact.phone)}
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>In case of severe emergency, please call national emergency number 112</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SOSPage;
