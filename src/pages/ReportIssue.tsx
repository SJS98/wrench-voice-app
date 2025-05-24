
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import { disputeService } from '@/services/disputeService';
import { ISSUE_CATEGORIES } from '@/types/disputes';

const reportIssueSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  issueType: z.enum(['internal-part-theft', 'overcharged', 'poor-service', 'rude-behavior', 'other']),
  description: z.string().min(10, 'Please provide a detailed description (minimum 10 characters)'),
  otherIssueType: z.string().optional(),
  isCritical: z.boolean(),
  mediaFiles: z.array(z.string()).optional()
});

type ReportIssueForm = z.infer<typeof reportIssueSchema>;

const ReportIssuePage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const form = useForm<ReportIssueForm>({
    resolver: zodResolver(reportIssueSchema),
    defaultValues: {
      bookingId: bookingId || '',
      issueType: 'poor-service',
      description: '',
      isCritical: false,
      mediaFiles: []
    }
  });

  const watchIssueType = form.watch('issueType');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real implementation, these would be uploaded to storage
    // For now, we'll create local URLs for preview
    const newFiles = Array.from(files).map(file => URL.createObjectURL(file));
    setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    form.setValue('mediaFiles', [...uploadedFiles, ...newFiles]);
  };

  const onSubmit = async (data: ReportIssueForm) => {
    setIsSubmitting(true);

    try {
      // Mock booking data - in a real app, this would come from a service
      const mockBooking = {
        id: bookingId || data.bookingId,
        garageId: '1',
        garageName: 'Auto Care Center'
      };

      await disputeService.submitDispute({
        bookingId: mockBooking.id,
        userId: 'current-user-id', // In a real app, get from auth context
        garageId: mockBooking.garageId,
        garageName: mockBooking.garageName,
        issueType: data.issueType,
        description: data.issueType === 'other' && data.otherIssueType 
          ? `${data.otherIssueType}: ${data.description}`
          : data.description,
        mediaUrls: uploadedFiles,
        status: 'pending',
        critical: data.isCritical,
        userPhone: '+91 98765 43210' // In a real app, get from user profile
      });

      toast({
        title: 'Issue Reported',
        description: "Your complaint has been logged. We'll reach out soon."
      });

      navigate('/my-bookings');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit your report. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout title="Report an Issue" showBackButton>
      <div className="p-4 pb-20">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>

            <p className="text-center mb-6 text-muted-foreground">
              We're sorry you're having an issue. Please provide details below and our team will investigate.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="bookingId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking ID</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter booking ID"
                          defaultValue={bookingId}
                          disabled={!!bookingId}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issueType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Category</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="space-y-3"
                        >
                          {ISSUE_CATEGORIES.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={category.id} id={category.id} />
                              <label htmlFor={category.id} className="flex items-center cursor-pointer">
                                <span className="mr-2">{category.icon}</span>
                                <span>{category.label}</span>
                                {category.critical && (
                                  <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                    Critical
                                  </span>
                                )}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchIssueType === 'other' && (
                  <FormField
                    control={form.control}
                    name="otherIssueType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify Issue Type</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter the type of issue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Please provide details about the issue..."
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel htmlFor="media" className="block mb-2">Upload Photos/Videos (optional)</FormLabel>
                  <div className="flex flex-col gap-4">
                    <label 
                      htmlFor="media" 
                      className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex flex-col items-center">
                        <Upload className="h-6 w-6 mb-2 text-gray-500" />
                        <span className="text-sm text-gray-500">Click to upload files</span>
                      </div>
                      <Input 
                        id="media" 
                        type="file" 
                        multiple 
                        accept="image/*,video/*" 
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>

                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="relative h-24 rounded-md overflow-hidden">
                            <img src={file} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="isCritical"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>This is a critical issue (e.g., theft, major fraud)</FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Marking as critical will flag the garage for immediate investigation.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-garage-purple hover:bg-garage-purple/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ReportIssuePage;
