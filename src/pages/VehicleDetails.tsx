
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usedVehiclesService } from '@/services/usedVehiclesService';
import { format } from 'date-fns';
import AppLayout from '@/components/layout/AppLayout';
import VehicleImageGallery from '@/components/usedVehicles/VehicleImageGallery';
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { useUserAuth } from '@/contexts/UserAuthContext';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useUserAuth();
  const [isSaved, setIsSaved] = useState(false);
  
  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ['usedVehicle', id],
    queryFn: () => usedVehiclesService.getUsedVehicleById(id!),
    enabled: !!id,
  });
  
  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save vehicles to your wishlist",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await usedVehiclesService.addToWishlist(id!);
      setIsSaved(!isSaved);
      toast({
        title: isSaved ? "Removed from Wishlist" : "Added to Wishlist",
        description: isSaved 
          ? "Vehicle has been removed from your wishlist" 
          : "Vehicle has been added to your wishlist",
      });
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Could not update wishlist. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle?.title,
        text: `Check out this ${vehicle?.make} ${vehicle?.model} on Mr.Mechanic`,
        url: window.location.href,
      }).catch(error => {
        console.log('Error sharing', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Vehicle link copied to clipboard",
      });
    }
  };
  
  const handleBuyRequest = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to request purchase",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await usedVehiclesService.requestToBuy(id!);
      toast({
        title: "Purchase Request Sent",
        description: "The seller has been notified of your interest",
      });
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Could not send purchase request. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Form for contacting seller
  const contactForm = useForm({
    defaultValues: {
      message: '',
    }
  });
  
  const onContactSubmit = async (data: { message: string }) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to contact the seller",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await usedVehiclesService.contactSeller(id!, data.message);
      contactForm.reset();
      toast({
        title: "Message Sent",
        description: "Your message has been sent to the seller",
      });
    } catch (error) {
      toast({
        title: "Message Failed",
        description: "Could not send message. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Form for booking inspection
  const inspectionForm = useForm({
    defaultValues: {
      date: '',
      time: '',
    }
  });
  
  const onInspectionSubmit = async (data: { date: string, time: string }) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book an inspection",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const dateTime = `${data.date}T${data.time}`;
      await usedVehiclesService.bookInspection(id!, dateTime);
      inspectionForm.reset();
      toast({
        title: "Inspection Booked",
        description: "Your inspection request has been sent to the seller",
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Could not book inspection. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <AppLayout title="Vehicle Details" showBackButton>
        <div className="container py-4">
          <div className="h-64 bg-gray-100 animate-pulse rounded-md mb-4"></div>
          <div className="h-8 bg-gray-100 animate-pulse rounded-md mb-4 w-3/4"></div>
          <div className="h-6 bg-gray-100 animate-pulse rounded-md mb-4 w-1/2"></div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-10 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-10 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
          <div className="h-40 bg-gray-100 animate-pulse rounded-md"></div>
        </div>
      </AppLayout>
    );
  }
  
  if (error || !vehicle) {
    return (
      <AppLayout title="Vehicle Not Found" showBackButton>
        <div className="container py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The vehicle you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/used-vehicles">
            <Button>Browse Other Vehicles</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }
  
  // Format date for display
  const listedDate = new Date(vehicle.createdAt);
  const formattedDate = format(listedDate, 'PPP');
  
  return (
    <AppLayout title="Vehicle Details" showBackButton>
      <div className="container py-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - left column (2/3 width on desktop) */}
          <div className="lg:col-span-2">
            <VehicleImageGallery 
              images={vehicle.images} 
              vehicleType={vehicle.type}
              alt={vehicle.title}
            />
            
            <div className="mt-4">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <h1 className="text-2xl font-bold">{vehicle.title}</h1>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleToggleSave}
                  >
                    <Heart 
                      className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center text-lg font-bold text-garage-purple mt-2">
                ₹{vehicle.price.toLocaleString()}
                {vehicle.negotiable && (
                  <Badge variant="outline" className="ml-2">
                    Negotiable
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{vehicle.location}</span>
                
                <span className="mx-2">•</span>
                
                <Clock className="h-4 w-4 mr-1" />
                <span>Listed on {formattedDate}</span>
              </div>
              
              <Separator className="my-4" />
              
              {/* Vehicle details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground">Make & Model</span>
                  <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground">Year</span>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground">Fuel Type</span>
                  <p className="font-medium">{vehicle.fuelType}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground">Transmission</span>
                  <p className="font-medium">{vehicle.transmission}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground">Mileage</span>
                  <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground">Color</span>
                  <p className="font-medium">{vehicle.color}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground">Condition</span>
                  <p className="font-medium">{vehicle.condition}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-xs text-muted-foreground">Owner History</span>
                  <p className="font-medium">{vehicle.ownerHistory || 'N/A'} owner(s)</p>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
              
              {/* Service History */}
              {vehicle.serviceHistory && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Service History</h2>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Mr.Mechanic Verified Service Records
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    This vehicle has complete service records available from Mr.Mechanic garages.
                    Service history can be viewed during inspection.
                  </p>
                </div>
              )}
              
              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-100 rounded-md p-4 text-sm">
                <h3 className="font-semibold text-amber-800 mb-1">Buyer Disclaimer</h3>
                <p className="text-amber-700">
                  Mr.Mechanic provides this platform to connect buyers and sellers but is not 
                  responsible for the condition of vehicles. Always inspect before purchase and 
                  verify paperwork. Consider booking a professional inspection through our app.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sidebar - right column (1/3 width on desktop) */}
          <div className="lg:col-span-1">
            {/* Seller information card */}
            <div className="border rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {vehicle.sellerName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{vehicle.sellerName}</p>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                    <span className="text-sm">{vehicle.sellerRating} rating</span>
                  </div>
                </div>
              </div>
              
              <Badge className="mb-3">
                {vehicle.sellerType}
              </Badge>
              
              <div className="space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-center items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Message Seller
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Seller</DialogTitle>
                    </DialogHeader>
                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                        <FormField
                          control={contactForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Hi, I'm interested in your vehicle listing..."
                                  {...field}
                                  rows={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Send Message</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline"
                  className="w-full flex justify-center items-center gap-2"
                  onClick={() => {
                    toast({
                      title: "Calling Seller",
                      description: "This would initiate a call to the seller in a real app",
                    });
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Call Seller
                </Button>
              </div>
            </div>
            
            {/* Action cards */}
            <div className="border rounded-lg p-4 mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full mb-3"
                  >
                    Request to Buy
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Purchase Request</DialogTitle>
                  </DialogHeader>
                  <p>
                    Send a purchase request to the seller for this {vehicle.make} {vehicle.model}?
                    The seller will be notified and will contact you to proceed.
                  </p>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleBuyRequest}>Confirm Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex justify-center items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Inspection
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book Vehicle Inspection</DialogTitle>
                  </DialogHeader>
                  <Form {...inspectionForm}>
                    <form onSubmit={inspectionForm.handleSubmit(onInspectionSubmit)} className="space-y-4">
                      <FormField
                        control={inspectionForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} min={format(new Date(), 'yyyy-MM-dd')} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={inspectionForm.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Book Inspection</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Safety tips card */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Safety Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Always inspect the vehicle before purchase</li>
                <li>• Verify all paperwork and ownership documents</li>
                <li>• Consider a professional mechanic inspection</li>
                <li>• Meet in public places for viewings</li>
                <li>• Report suspicious listings to Mr.Mechanic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VehicleDetails;
