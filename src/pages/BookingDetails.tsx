
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Car, 
  CheckCircle, 
  ChevronRight, 
  Clock, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Share,
  Star,
  Camera,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';
import GarageStatus from '@/components/garage/GarageStatus';

// Mock booking data - in a real app, you would fetch this based on ID
const mockBooking = {
  id: 'BK123456',
  garageId: '1',
  garageName: 'Auto Care Center',
  garageAddress: 'MG Road, Bangalore',
  garagePhone: '+91 98765 43210',
  services: ['Basic Service', 'Tire Rotation'],
  vehicle: {
    id: '1',
    name: 'Honda City',
    regNumber: 'KA05AB1234',
    year: 2019
  },
  date: new Date('2025-05-25'),
  timeSlot: '10:00 AM',
  status: 'completed', // Changed to completed to show Report Issue button
  totalPrice: 3298,
  trackingUpdates: [
    {
      status: 'Booking Confirmed',
      time: '15 May, 09:30 AM',
      description: 'Your booking has been confirmed and is scheduled.'
    },
    {
      status: 'Pre-Service Inspection',
      time: '25 May, 10:15 AM',
      description: 'Initial vehicle inspection completed.'
    },
    {
      status: 'Service In Progress',
      time: '25 May, 10:45 AM',
      description: 'Vehicle service is in progress.'
    },
    {
      status: 'Service Complete',
      time: '25 May, 12:30 PM',
      description: 'Service has been completed and vehicle is ready for pickup.'
    }
  ],
  hasMedia: true, // Flag to indicate if this booking has media items
  hasDispute: false // Flag to indicate if there's an active dispute for this booking
};

const BookingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // In a real app, fetch booking details based on ID

  const handleCancelBooking = () => {
    toast({
      title: "Booking Cancellation",
      description: "Your booking has been cancelled successfully."
    });
  };

  const handleRescheduleBooking = () => {
    toast({
      title: "Reschedule Booking",
      description: "Please contact the garage directly to reschedule your booking."
    });
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API
    toast({
      title: "Booking Shared",
      description: "Booking details have been shared."
    });
  };

  return (
    <AppLayout title="Booking Details" showBackButton>
      <div className="p-4 pb-24">
        {/* Booking Header */}
        <div className="bg-garage-purple text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">{mockBooking.garageName}</h2>
            <div className="bg-white rounded-full px-3 py-1 text-xs font-medium text-garage-purple">
              {mockBooking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
            </div>
          </div>
          <p className="text-sm text-white/80">Booking ID: {mockBooking.id}</p>
          <div className="mt-4 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{format(mockBooking.date, 'dd MMMM yyyy')}</span>
            <span className="text-sm mx-1">•</span>
            <Clock className="h-4 w-4" />
            <span className="text-sm">{mockBooking.timeSlot}</span>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 mt-4">
            {/* Vehicle Details */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-medium mb-3">Vehicle Details</h3>
              
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{mockBooking.vehicle.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockBooking.vehicle.regNumber} • {mockBooking.vehicle.year}
                  </p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-medium mb-3">Services Booked</h3>
              
              <ul className="space-y-2">
                {mockBooking.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">₹{mockBooking.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Service Media Section */}
            {mockBooking.hasMedia && (
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-medium mb-3">Service Media</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Camera className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Photos & Videos</p>
                      <p className="text-xs text-muted-foreground">
                        View media updates of your service
                      </p>
                    </div>
                  </div>
                  
                  <Link to={`/service-book/${mockBooking.id}/media`}>
                    <Button variant="outline" size="sm">
                      View Media
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Garage Details with Status - UPDATED */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-medium mb-3">Garage Details</h3>
              
              {/* Display garage status */}
              <div className="mb-4">
                <GarageStatus 
                  garageId={mockBooking.garageId} 
                  size="sm"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{mockBooking.garageAddress}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{mockBooking.garagePhone}</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a href={`tel:${mockBooking.garagePhone}`}>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </a>
                
                <Link to={`/garage/${mockBooking.garageId}`}>
                  <Button variant="outline" className="w-full">
                    View Garage
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Report Issue Button - NEW */}
            {mockBooking.status === 'completed' && !mockBooking.hasDispute && (
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Had an issue with this service?</p>
                      <p className="text-xs text-muted-foreground">
                        Report problems like poor service or part theft
                      </p>
                    </div>
                  </div>
                  
                  <Link to={`/report-issue/${mockBooking.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Report Issue
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            
            {/* Dispute Status - NEW */}
            {mockBooking.hasDispute && (
              <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800">Dispute in Progress</p>
                    <p className="text-sm text-yellow-700">
                      Your issue report is being investigated. We'll update you soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            {mockBooking.status === 'upcoming' && (
              <div className="space-y-3">
                <Button 
                  onClick={handleRescheduleBooking} 
                  variant="outline" 
                  className="w-full"
                >
                  Reschedule Booking
                </Button>
                
                <Button 
                  onClick={handleCancelBooking}
                  variant="destructive" 
                  className="w-full"
                >
                  Cancel Booking
                </Button>
              </div>
            )}

            {/* Leave Review (for completed bookings) */}
            {mockBooking.status === 'completed' && (
              <div>
                <Link to={`/review-service/${mockBooking.id}`}>
                  <Button className="w-full bg-garage-purple">
                    <Star className="h-4 w-4 mr-2" />
                    Leave a Review
                  </Button>
                </Link>
              </div>
            )}

            <Button 
              onClick={handleShare}
              variant="outline" 
              className="w-full"
            >
              <Share className="h-4 w-4 mr-2" />
              Share Booking
            </Button>
          </TabsContent>
          
          <TabsContent value="tracking" className="space-y-4 mt-4">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-medium mb-4">Service Tracking</h3>
              
              <div className="relative">
                {mockBooking.trackingUpdates.map((update, index) => (
                  <div key={index} className="flex mb-6 last:mb-0">
                    <div className="relative mr-4">
                      <div className={`w-4 h-4 rounded-full ${
                        index === 0 || mockBooking.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      } flex items-center justify-center`}>
                        {(index === 0 || mockBooking.status === 'completed') && (
                          <CheckCircle className="h-3 w-3 text-white" />
                        )}
                      </div>
                      {index < mockBooking.trackingUpdates.length - 1 && (
                        <div className="absolute top-4 left-2 w-0.5 h-full bg-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{update.status}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{update.time}</p>
                      <p className="text-sm">{update.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-medium mb-3">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Having issues with your booking? Contact the garage directly.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <a href={`tel:${mockBooking.garagePhone}`}>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Garage
                  </Button>
                </a>
                
                <Link to="/support">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat Support
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default BookingDetailsPage;
