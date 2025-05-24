
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { 
  ShieldAlert, 
  MessageSquare, 
  Send, 
  Upload,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import AppLayout from '@/components/layout/AppLayout';
import { disputeService } from '@/services/disputeService';
import { Dispute, ISSUE_CATEGORIES } from '@/types/disputes';
import MediaGallery from '@/components/spareParts/MediaGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GarageDisputesPage = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      response: ''
    }
  });

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    setLoading(true);
    try {
      // In a real app, get the garage ID from auth context
      const garageId = '1'; 
      const data = await disputeService.getGarageDisputes(garageId);
      setDisputes(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch disputes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDispute = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setUploadedFiles([]);
    reset({
      response: dispute.garageResponse || ''
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real implementation, these would be uploaded to storage
    // For now, we'll create local URLs for preview
    const newFiles = Array.from(files).map(file => URL.createObjectURL(file));
    setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleSubmitResponse = async (data: { response: string }) => {
    if (!selectedDispute) return;

    try {
      await disputeService.addGarageResponse(
        selectedDispute.id,
        data.response,
        uploadedFiles
      );
      
      toast({
        title: 'Response Submitted',
        description: 'Your response has been submitted successfully.',
      });
      
      fetchDisputes();
      setSelectedDispute(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit your response',
        variant: 'destructive',
      });
    }
  };

  const getIssueLabel = (issueType: string) => {
    const category = ISSUE_CATEGORIES.find(cat => cat.id === issueType);
    return category ? `${category.icon} ${category.label}` : issueType;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-500">Under Review</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">Resolved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AppLayout title="Customer Disputes" showBackButton>
      <div className="p-4 pb-20">
        <div className="mb-4">
          <h1 className="text-xl font-bold mb-1">Dispute Management</h1>
          <p className="text-muted-foreground text-sm">
            Respond to customer complaints and manage dispute resolutions
          </p>
        </div>
        
        <div className="flex items-center justify-center mb-4 pb-2 border-b">
          <div className="flex gap-8 text-center">
            <div>
              <div className="text-2xl font-bold">{disputes.filter(d => d.status === 'pending').length}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{disputes.filter(d => d.status === 'under-review').length}</div>
              <div className="text-xs text-muted-foreground">Under Review</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{disputes.filter(d => d.status === 'resolved').length}</div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-10">Loading disputes...</div>
        ) : disputes.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <ShieldAlert className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium mb-2">No disputes found</h3>
              <p className="text-muted-foreground mb-6">
                Your garage has no active disputes or complaints.
              </p>
              <Button variant="outline" onClick={() => navigate('/')}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <Card 
                key={dispute.id}
                className={dispute.critical ? "border-red-300" : undefined}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">
                        {getIssueLabel(dispute.issueType)}
                        {dispute.critical && (
                          <Badge className="ml-2 bg-red-500">Critical</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Booking: {dispute.bookingId} • 
                        {new Date(dispute.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>{getStatusBadge(dispute.status)}</div>
                  </div>
                  
                  <p className="text-sm mb-4 line-clamp-2">{dispute.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {dispute.garageResponse ? (
                        <span className="text-green-600 flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Response submitted
                        </span>
                      ) : (
                        <span className="text-yellow-600 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Response needed
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleOpenDispute(dispute)}
                    >
                      {dispute.garageResponse ? 'View Details' : 'Respond'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Response Dialog */}
        <Dialog open={!!selectedDispute} onOpenChange={(open) => !open && setSelectedDispute(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span>Dispute Details</span>
                {selectedDispute?.critical && (
                  <Badge className="bg-red-500">Critical</Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            
            {selectedDispute && (
              <Tabs defaultValue={selectedDispute.garageResponse ? "details" : "respond"}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="respond">
                    {selectedDispute.garageResponse ? 'Your Response' : 'Respond'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Booking ID</h3>
                        <p>{selectedDispute.bookingId}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Issue Type</h3>
                        <p>{getIssueLabel(selectedDispute.issueType)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Date Submitted</h3>
                        <p>{new Date(selectedDispute.createdAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <p>{getStatusBadge(selectedDispute.status)}</p>
                      </div>
                      <div className="col-span-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                        <p className="whitespace-pre-wrap">{selectedDispute.description}</p>
                      </div>
                    </div>
                    
                    {selectedDispute.mediaUrls.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Customer Evidence
                        </h3>
                        <MediaGallery
                          media={selectedDispute.mediaUrls.map((url, index) => ({
                            id: `media-${index}`,
                            serviceId: selectedDispute.id,
                            type: 'image',
                            url,
                            createdAt: selectedDispute.createdAt,
                            mechanicId: '',
                            mechanicName: 'Customer'
                          }))}
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="respond">
                  {selectedDispute.garageResponse ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Your Response</h3>
                        <p className="whitespace-pre-wrap">{selectedDispute.garageResponse}</p>
                      </div>
                      
                      {selectedDispute.garageResponseMediaUrls && selectedDispute.garageResponseMediaUrls.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">
                            Your Supporting Media
                          </h3>
                          <MediaGallery
                            media={selectedDispute.garageResponseMediaUrls.map((url, index) => ({
                              id: `garage-media-${index}`,
                              serviceId: selectedDispute.id,
                              type: 'image',
                              url,
                              createdAt: selectedDispute.updatedAt,
                              mechanicId: selectedDispute.garageId,
                              mechanicName: 'Your Garage'
                            }))}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(handleSubmitResponse)} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-1">Your Response</label>
                        <Textarea
                          {...register('response', { required: true })}
                          placeholder="Provide your explanation or response to this complaint..."
                          className="min-h-[150px]"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Please be detailed and professional in your response.
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium block mb-2">
                          Upload Supporting Evidence
                        </label>
                        <div className="flex flex-col gap-4">
                          <label 
                            htmlFor="garage-media" 
                            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                          >
                            <div className="flex flex-col items-center">
                              <Upload className="h-6 w-6 mb-2 text-gray-500" />
                              <span className="text-sm text-gray-500">Click to upload photos/videos</span>
                            </div>
                            <Input 
                              id="garage-media" 
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
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button 
                          type="submit" 
                          className="bg-garage-purple hover:bg-garage-purple/90"
                          disabled={isSubmitting}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Response
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default GarageDisputesPage;
