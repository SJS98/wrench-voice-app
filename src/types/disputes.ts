
export interface Dispute {
  id: string;
  bookingId: string;
  userId: string;
  garageId: string;
  garageName: string;
  issueType: 'internal-part-theft' | 'overcharged' | 'poor-service' | 'rude-behavior' | 'other';
  description: string;
  mediaUrls: string[];
  status: 'pending' | 'under-review' | 'resolved' | 'rejected';
  critical: boolean;
  userPhone: string;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  garageResponse?: string;
  garageResponseMediaUrls?: string[];
}

export interface GarageVerificationStatus {
  garageId: string;
  isVerified: boolean;
  isUnderInvestigation: boolean;
  isSuspended: boolean;
  trustScore: number;
  totalComplaints: number;
  resolvedComplaints: number;
  flags: ('trustworthy' | 'parts-theft-claimed' | 'overcharging-reported')[];
}

export const ISSUE_CATEGORIES = [
  { id: 'internal-part-theft', label: 'Internal part stolen', icon: '❗', critical: true },
  { id: 'overcharged', label: 'Overcharged', icon: '⚠️', critical: false },
  { id: 'poor-service', label: 'Poor service', icon: '🛠', critical: false },
  { id: 'rude-behavior', label: 'Rude behavior', icon: '😠', critical: false },
  { id: 'other', label: 'Other', icon: '✍️', critical: false }
] as const;
