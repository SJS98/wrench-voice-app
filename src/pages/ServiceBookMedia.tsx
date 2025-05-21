
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { serviceMediaService } from '@/services/serviceMediaService';
import { ServiceMedia } from '@/types/serviceMedia';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import MediaGallery from '@/components/spareParts/MediaGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  CheckCircle2, 
  Clock, 
  FileUp, 
  HelpCircle, 
  Video
} from 'lucide-react';

const ServiceBookMediaPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('photos');
  
  const { data: serviceMedia, isLoading, refetch } = useQuery({
    queryKey: ['serviceMedia', id],
    queryFn: () => serviceMediaService.getMediaForService(id!),
    enabled: !!id,
  });
  
  // Filter media based on active tab
  const filteredMedia = React.useMemo(() => {
    if (!serviceMedia) return [];
    
    if (activeTab === 'photos') {
      return serviceMedia.filter(media => media.type === 'image');
    } else if (activeTab === 'videos') {
      return serviceMedia.filter(media => media.type === 'video' && !media.isLiveStream);
    } else {
      return serviceMedia.filter(media => media.isLiveStream);
    }
  }, [serviceMedia, activeTab]);
  
  const handleUploadMedia = (type: 'image' | 'video') => {
    // In a real app, this would open a file picker and upload to storage
    // For the demo, we'll simulate adding a new media item
    
    const mediaData = {
      type,
      url: type === 'image' 
        ? 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=500&auto=format&fit=crop'
        : 'https://example.com/video-demo.mp4',
      thumbnailUrl: type === 'video' ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=150&auto=format&fit=crop' : undefined,
      caption: `New ${type} uploaded on ${new Date().toLocaleString()}`,
      mechanicId: 'mech2',
      mechanicName: 'Sunil Patel',
    };
    
    serviceMediaService.addMedia(id!, mediaData)
      .then(() => {
        toast({
          title: "Upload Successful",
          description: `Your ${type} has been uploaded successfully.`,
        });
        refetch();
      })
      .catch(error => {
        toast({
          title: "Upload Failed",
          description: "Failed to upload media. Please try again.",
          variant: "destructive",
        });
      });
  };
  
  const startLiveStream = () => {
    serviceMediaService.startLiveStream(id!, {
      mechanicId: 'mech2',
      mechanicName: 'Sunil Patel',
    })
      .then(() => {
        toast({
          title: "Live Stream Started",
          description: "Your live stream has started successfully.",
        });
        setActiveTab('live');
        refetch();
      })
      .catch(error => {
        toast({
          title: "Failed to Start Stream",
          description: "Failed to start live stream. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <AppLayout title="Service Media" showBackButton>
      <div className="container py-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Service #123456</h1>
            <p className="text-sm text-muted-foreground">Oil Change & Brake Inspection</p>
          </div>
          
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-700">In Progress</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center gap-3">
          <Clock className="h-5 w-5 text-garage-purple" />
          <div>
            <p className="text-sm">
              Last Update: <span className="font-medium">Today, 2:30 PM</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Service started at 1:15 PM and is expected to complete by 4:00 PM
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="photos" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="live">Live Stream</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleUploadMedia('image')}
              >
                <Camera className="h-4 w-4 mr-1" />
                Upload Photo
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleUploadMedia('video')}
              >
                <Video className="h-4 w-4 mr-1" />
                Upload Video
              </Button>
              
              <Button 
                size="sm"
                onClick={startLiveStream}
              >
                <FileUp className="h-4 w-4 mr-1" />
                Start Live
              </Button>
            </div>
          </div>
          
          <TabsContent value="photos">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-md"></div>
                ))}
              </div>
            ) : filteredMedia.length > 0 ? (
              <MediaGallery media={filteredMedia} />
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg font-medium mb-2">No photos yet</h2>
                <p className="text-muted-foreground mb-6">
                  Photos of your service work will appear here
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-md"></div>
                ))}
              </div>
            ) : filteredMedia.length > 0 ? (
              <MediaGallery media={filteredMedia} />
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg font-medium mb-2">No videos yet</h2>
                <p className="text-muted-foreground mb-6">
                  Videos of your service work will appear here
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="live">
            {isLoading ? (
              <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
            ) : filteredMedia.length > 0 ? (
              <MediaGallery media={filteredMedia} />
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg font-medium mb-2">No live stream available</h2>
                <p className="text-muted-foreground mb-6">
                  When the mechanic starts a live stream, it will appear here
                </p>
                <Button variant="outline" onClick={startLiveStream}>
                  Request Live Stream
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">How Media Tracking Works</h3>
            <p className="text-sm text-muted-foreground">
              Our mechanics can upload photos and videos of your vehicle during servicing, giving you complete visibility. They can also start a live stream to show you the work in real-time. All media is securely stored and accessible only to you.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ServiceBookMediaPage;
