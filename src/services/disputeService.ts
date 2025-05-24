
import { Dispute, GarageVerificationStatus } from '@/types/disputes';

// Mock data for disputes
const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'DIS-001',
    bookingId: 'BK123456',
    userId: 'user1',
    garageId: '1',
    garageName: 'Auto Care Center',
    issueType: 'poor-service',
    description: 'Service was delayed and car was not properly cleaned after repair.',
    mediaUrls: [],
    status: 'pending',
    critical: false,
    userPhone: '+91 98765 43210',
    createdAt: new Date('2025-05-20').toISOString(),
    updatedAt: new Date('2025-05-20').toISOString()
  }
];

// Mock garage verification statuses
const MOCK_GARAGE_STATUS: Record<string, GarageVerificationStatus> = {
  '1': {
    garageId: '1',
    isVerified: true,
    isUnderInvestigation: false,
    isSuspended: false,
    trustScore: 4.7,
    totalComplaints: 3,
    resolvedComplaints: 2,
    flags: ['trustworthy']
  }
};

export const disputeService = {
  // Submit a new dispute
  submitDispute: async (disputeData: Omit<Dispute, 'id' | 'createdAt' | 'updatedAt'>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newDispute: Dispute = {
      ...disputeData,
      id: `DIS-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    MOCK_DISPUTES.push(newDispute);
    return newDispute;
  },

  // Get disputes for a user
  getUserDisputes: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_DISPUTES.filter(dispute => dispute.userId === userId);
  },

  // Get disputes for a garage
  getGarageDisputes: async (garageId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_DISPUTES.filter(dispute => dispute.garageId === garageId);
  },

  // Get all disputes (admin view)
  getAllDisputes: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_DISPUTES;
  },

  // Get garage verification status
  getGarageStatus: async (garageId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_GARAGE_STATUS[garageId] || {
      garageId,
      isVerified: false,
      isUnderInvestigation: false,
      isSuspended: false,
      trustScore: 0,
      totalComplaints: 0,
      resolvedComplaints: 0,
      flags: []
    };
  },

  // Update dispute status (admin function)
  updateDisputeStatus: async (disputeId: string, status: Dispute['status'], adminNotes?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dispute = MOCK_DISPUTES.find(d => d.id === disputeId);
    if (dispute) {
      dispute.status = status;
      dispute.updatedAt = new Date().toISOString();
      if (adminNotes) dispute.adminNotes = adminNotes;
    }
    
    return dispute;
  },

  // Add garage response
  addGarageResponse: async (disputeId: string, response: string, mediaUrls: string[] = []) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dispute = MOCK_DISPUTES.find(d => d.id === disputeId);
    if (dispute) {
      dispute.garageResponse = response;
      dispute.garageResponseMediaUrls = mediaUrls;
      dispute.updatedAt = new Date().toISOString();
    }
    
    return dispute;
  }
};
