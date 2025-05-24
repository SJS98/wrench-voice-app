
export interface ServiceMedia {
  id: string;
  serviceId: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  createdAt: string;
  mechanicId: string;
  mechanicName: string;
  isLiveStream?: boolean;
}
