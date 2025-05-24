
import React, { useState } from 'react';
import { ServiceMedia } from '@/types/serviceMedia';
import { Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MediaGalleryProps {
  media: ServiceMedia[];
}

const MediaGallery = ({ media }: MediaGalleryProps) => {
  const [selectedMedia, setSelectedMedia] = useState<ServiceMedia | null>(null);

  const handleMediaClick = (mediaItem: ServiceMedia) => {
    setSelectedMedia(mediaItem);
  };

  const renderThumbnail = (mediaItem: ServiceMedia, index: number) => {
    if (mediaItem.type === 'image') {
      return (
        <img
          src={mediaItem.url}
          alt={mediaItem.caption || `Service media ${index + 1}`}
          className="w-full h-full object-cover"
        />
      );
    } else {
      return (
        <div className="relative w-full h-full bg-black/10">
          <img
            src={mediaItem.thumbnailUrl || mediaItem.url}
            alt={mediaItem.caption || `Video thumbnail ${index + 1}`}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-2">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
          {mediaItem.isLiveStream && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              LIVE
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {media.map((mediaItem, index) => (
          <div
            key={mediaItem.id}
            className="h-24 rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleMediaClick(mediaItem)}
          >
            {renderThumbnail(mediaItem, index)}
          </div>
        ))}
      </div>

      <Dialog 
        open={!!selectedMedia} 
        onOpenChange={(open) => !open && setSelectedMedia(null)}
      >
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="p-4 bg-background">
            {selectedMedia?.caption || "Service Media"}
          </DialogTitle>
          
          {selectedMedia?.type === 'image' ? (
            <div className="flex items-center justify-center bg-black h-[500px]">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.caption || "Service media"}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="bg-black h-[500px] flex items-center justify-center">
              <video
                src={selectedMedia?.url}
                controls
                autoPlay={selectedMedia?.isLiveStream}
                className="w-full h-full max-h-[500px]"
                poster={selectedMedia?.thumbnailUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          
          <div className="p-4 bg-background">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  By {selectedMedia?.mechanicName} • 
                  {new Date(selectedMedia?.createdAt || '').toLocaleString()}
                </p>
              </div>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaGallery;
