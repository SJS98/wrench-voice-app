
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usedVehiclesService } from '@/services/usedVehiclesService';
import { UsedVehicle, VehicleCondition, SellerType } from '@/types/usedVehicles';
import { VehicleType, vehicleTypeNames } from '@/types/vehicles';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useUserAuth } from '@/contexts/UserAuthContext';
import AppLayout from '@/components/layout/AppLayout';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface VehicleFormData {
  title: string;
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  color: string;
  mileage: number;
  condition: VehicleCondition;
  price: number;
  negotiable: boolean;
  description: string;
  images: File[];
  location: string;
  sellerType: SellerType;
  ownerHistory: number;
  serviceHistory: boolean;
  legalConfirmation: boolean;
}

const SellVehicle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  
  const form = useForm<VehicleFormData>({
    defaultValues: {
      title: '',
      type: 'car',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      fuelType: '',
      transmission: '',
      color: '',
      mileage: 0,
      condition: 'Good',
      price: 0,
      negotiable: true,
      description: '',
      images: [],
      location: '',
      sellerType: user?.role === 'owner' ? 'Garage' : 'Service Center',
      ownerHistory: 1,
      serviceHistory: false,
      legalConfirmation: false,
    },
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Check maximum number of images
      if (uploadedImages.length + newFiles.length > 10) {
        toast({
          title: "Too many images",
          description: "You can upload a maximum of 10 images",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedImages(prev => [...prev, ...newFiles]);
      
      // Create preview URLs
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
      
      // Update form value
      form.setValue('images', [...uploadedImages, ...newFiles]);
    }
  };
  
  const removeImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    const updatedPreviewUrls = [...imagePreviewUrls];
    
    // Revoke the object URL to free memory
    URL.revokeObjectURL(updatedPreviewUrls[index]);
    
    updatedImages.splice(index, 1);
    updatedPreviewUrls.splice(index, 1);
    
    setUploadedImages(updatedImages);
    setImagePreviewUrls(updatedPreviewUrls);
    form.setValue('images', updatedImages);
  };
  
  const onSubmit = async (data: VehicleFormData) => {
    if (!data.legalConfirmation) {
      toast({
        title: "Legal confirmation required",
        description: "Please confirm that all information is accurate and you have the right to sell this vehicle",
        variant: "destructive",
      });
      return;
    }
    
    if (uploadedImages.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of the vehicle",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload images to storage and get URLs
      // For this example, we'll use the preview URLs as placeholders
      const vehicleData: Omit<UsedVehicle, 'id' | 'createdAt' | 'status' | 'views'> = {
        title: data.title,
        type: data.type,
        make: data.make,
        model: data.model,
        year: data.year,
        fuelType: data.fuelType,
        transmission: data.transmission,
        color: data.color,
        mileage: data.mileage,
        condition: data.condition,
        price: data.price,
        negotiable: data.negotiable,
        description: data.description,
        images: imagePreviewUrls, // In a real app, these would be uploaded image URLs
        location: data.location,
        sellerType: data.sellerType,
        sellerId: user?.id || '',
        sellerName: user?.name || '',
        sellerRating: 4.5, // Example rating, would come from user profile
        ownerHistory: data.ownerHistory,
        serviceHistory: data.serviceHistory,
      };
      
      const result = await usedVehiclesService.createVehicleListing(vehicleData);
      
      toast({
        title: "Vehicle listed successfully",
        description: "Your vehicle listing has been submitted for approval",
      });
      
      navigate('/used-vehicles');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error listing vehicle",
        description: "There was a problem submitting your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const vehicleTypes = Object.entries(vehicleTypeNames).map(([key, name]) => ({
    value: key,
    label: name,
  }));
  
  const currentYear = new Date().getFullYear();
  const vehicleYears = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  return (
    <ProtectedRoute allowedRoles={['owner', 'customer']}>
      <AppLayout title="Sell a Vehicle" showBackButton>
        <div className="container py-4 pb-20">
          <h1 className="text-2xl font-bold mb-2">List Your Vehicle For Sale</h1>
          <p className="text-muted-foreground mb-6">
            Complete the form below to list your vehicle on Mr.Mechanic marketplace
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. 2019 Honda City, Single Owner" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Create a concise, descriptive title for your listing
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicleTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Honda, Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. City, Innova" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicleYears.map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mumbai, Maharashtra" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Vehicle Details */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Petrol">Petrol</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="CNG">CNG</SelectItem>
                            <SelectItem value="Electric">Electric</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transmission type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="Automatic">Automatic</SelectItem>
                            <SelectItem value="CVT">CVT</SelectItem>
                            <SelectItem value="DCT">DCT</SelectItem>
                            <SelectItem value="AMT">AMT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. White, Blue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mileage (km)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g. 45000" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select 
                          onValueChange={field.onChange as (value: string) => void}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Average">Average</SelectItem>
                            <SelectItem value="Poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ownerHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Previous Owners</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select owner count" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 (First Owner)</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide detailed information about the vehicle..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include details about maintenance history, modifications, special features, and reason for selling
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Pricing */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g. 550000" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="negotiable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Price Negotiable</FormLabel>
                          <FormDescription>
                            Allow buyers to negotiate on the price
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Images */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    id="vehicle-images"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="vehicle-images"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium mb-1">
                      Click to upload images
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or JPEG (max 10 images)
                    </p>
                  </label>
                </div>
                
                {imagePreviewUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Vehicle preview ${index + 1}`}
                          className="h-32 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* Seller Details */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Seller Details</h2>
                
                <FormField
                  control={form.control}
                  name="sellerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seller Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange as (value: string) => void}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select seller type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Garage">Garage</SelectItem>
                          <SelectItem value="Service Center">Service Center</SelectItem>
                          <SelectItem value="Expired Vehicle">Expired Vehicle</SelectItem>
                        </SelectContent>
                      </Select>
                      {field.value === 'Expired Vehicle' && (
                        <FormDescription className="text-amber-600">
                          Expired vehicles must comply with legal requirements for resale
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceHistory"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          This vehicle has service history with Mr.Mechanic
                        </FormLabel>
                        <FormDescription>
                          Vehicles with verified service history often sell faster
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              {/* Legal Confirmation */}
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-amber-800 mb-2">Legal Declaration</h3>
                  <p className="text-sm text-amber-700 mb-4">
                    By listing a vehicle on Mr.Mechanic, you confirm that all information provided is accurate
                    and complete, and that you have the legal right to sell this vehicle.
                  </p>
                  
                  <FormField
                    control={form.control}
                    name="legalConfirmation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-amber-800 font-medium">
                            I confirm that all information is accurate and I have the legal right to sell this vehicle
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="px-8">
                  {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default SellVehicle;
