
import { ServiceMedia } from '@/types/serviceMedia';

// Mock data for service media
const MOCK_SERVICE_MEDIA: ServiceMedia[] = [
  {
    id: "media1",
    serviceId: "123456",
    type: "image",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500&auto=format&fit=crop",
    caption: "Old brake pad removed",
    createdAt: "2023-10-15T09:30:00Z",
    mechanicId: "mech1",
    mechanicName: "Rajesh Kumar"
  },
  {
    id: "media2",
    serviceId: "123456",
    type: "video",
    url: "https://example.com/video1.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=150&auto=format&fit=crop",
    caption: "Installation of new brake pads",
    createdAt: "2023-10-15T09:45:00Z",
    mechanicId: "mech1",
    mechanicName: "Rajesh Kumar"
  }
];

export const serviceMediaService = {
  getMediaForService: async (serviceId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_SERVICE_MEDIA.filter(media => media.serviceId === serviceId);
  },

  addMedia: async (serviceId: string, mediaData: {
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string;
    caption?: string;
    mechanicId: string;
    mechanicName: string;
  }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newMedia: ServiceMedia = {
      id: `media${Date.now()}`,
      serviceId,
      ...mediaData,
      createdAt: new Date().toISOString()
    };
    
    MOCK_SERVICE_MEDIA.push(newMedia);
    return newMedia;
  },

  startLiveStream: async (serviceId: string, mechanicData: {
    mechanicId: string;
    mechanicName: string;
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStream: ServiceMedia = {
      id: `livestream${Date.now()}`,
      serviceId,
      type: 'video',
      url: "https://example.com/live-stream.m3u8",
      thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=150&auto=format&fit=crop",
      caption: "Live service stream",
      mechanicId: mechanicData.mechanicId,
      mechanicName: mechanicData.mechanicName,
      isLiveStream: true,
      createdAt: new Date().toISOString()
    };
    
    MOCK_SERVICE_MEDIA.push(newStream);
    return newStream;
  }
};
