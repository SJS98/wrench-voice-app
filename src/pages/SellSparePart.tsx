
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { sparePartsService } from '@/services/sparePartsService';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { SparePartCategory } from '@/types/spareParts';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Camera, FileUp, Plus, Trash } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
  mrp: z.coerce.number().positive({ message: 'MRP must be a positive number' }),
  category: z.enum(['Engine', 'Brakes', 'Tires', 'Lights', 'Battery', 'Accessories', 'Transmission', 'Electrical', 'Suspension', 'Exhaust', 'Body Parts', 'Other'] as [SparePartCategory, ...SparePartCategory[]]),
  condition: z.enum(['New', 'Used']),
  brand: z.string().min(2, { message: 'Brand name is required' }),
  compatibleVehicles: z.string().min(2, { message: 'Please specify compatible vehicles' }),
  stock: z.coerce.number().int().positive({ message: 'Stock quantity must be a positive number' }),
  warranty: z.string().optional(),
  manufactureDate: z.string().optional(),
  location: z.string().min(3, { message: 'Location is required' }),
  shipsNationwide: z.boolean().default(false),
  legalVerification: z.boolean().refine(val => val === true, {
    message: 'You must verify that you have legal right to sell this part',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SellSparePartPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserAuth();
  const [images, setImages] = React.useState<string[]>([]);
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      mrp: 0,
      category: 'Other',
      condition: 'New',
      brand: '',
      compatibleVehicles: '',
      stock: 1,
      warranty: '',
      manufactureDate: '',
      location: '',
      shipsNationwide: false,
      legalVerification: false,
    },
  });
  
  // Function to simulate image upload
  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload to storage
    const placeholderImages = [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=150&auto=format&fit=crop'
    ];
    
    if (images.length < 5) {
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      setImages([...images, randomImage]);
    } else {
      toast({
        title: "Maximum Images",
        description: "You can upload a maximum of 5 images",
      });
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const onSubmit = async (data: FormValues) => {
    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image of the spare part",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Format data for API
      const partData = {
        ...data,
        compatibleVehicles: data.compatibleVehicles.split(',').map(v => v.trim()),
        images,
        sellerId: user?.id || 'user1',
        sellerName: user?.name || 'User',
        sellerType: user?.role === 'owner' ? 'Garage' : 'Store',
        sellerRating: 4.5, // Default rating
        isVerified: true, // Auto-verify for demo
      };
      
      await sparePartsService.add(partData);
      
      toast({
        title: "Part Listed Successfully",
        description: "Your spare part has been listed for sale",
      });
      
      navigate('/spare-parts');
    } catch (error) {
      toast({
        title: "Listing Failed",
        description: "Failed to list your spare part. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout title="Sell a Spare Part" showBackButton>
      <div className="container py-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload Section */}
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-4">Part Images</h3>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative h-24 border rounded-md overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Part image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
                    >
                      <Camera className="h-6 w-6 mb-1" />
                      <span className="text-xs">Add Photo</span>
                    </button>
                  )}
                </div>
                
                <FormDescription>
                  Upload clear images of the part from multiple angles. Max 5 images.
                </FormDescription>
              </div>
              
              <Separator />
              
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Part Information</h3>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Part Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Brake Pad Set for Honda City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {['Engine', 'Brakes', 'Tires', 'Lights', 'Battery', 'Accessories', 'Transmission', 'Electrical', 'Suspension', 'Exhaust', 'Body Parts', 'Other'].map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Used">Used</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the part in detail, including specifications, compatibility, condition, etc." 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Bosch, OEM, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="compatibleVehicles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compatible Vehicles</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Honda City (2015-2020), Honda Civic (2016-2021)" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter comma-separated list of compatible vehicles and models
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="warranty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Warranty (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 6 months, 1 year, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="manufactureDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manufacture Date (Optional)</FormLabel>
                          <FormControl>
                            <Input type="month" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Pricing Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Pricing & Location</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selling Price (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mrp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MRP (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
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
                  
                  <FormField
                    control={form.control}
                    name="shipsNationwide"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Ships Nationwide</FormLabel>
                          <FormDescription>
                            Check if you can ship this part anywhere in the country
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Legal Section */}
              <FormField
                control={form.control}
                name="legalVerification"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Legal Verification</FormLabel>
                      <FormDescription>
                        I hereby confirm that I have the legal right to sell this spare part and that all information provided is accurate and truthful.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                List Part for Sale
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};

export default SellSparePartPage;
