
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { AlertTriangle, Filter, RefreshCw, Mail, Phone, Archive } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { disputeService } from '@/services/disputeService';
import { Dispute, ISSUE_CATEGORIES } from '@/types/disputes';
import MediaGallery from '@/components/spareParts/MediaGallery';

const DisputeAdminPage = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [viewMode, setViewMode] = useState<'details' | 'response'>('details');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      status: '',
      adminNotes: '',
    }
  });

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    setLoading(true);
    try {
      const data = await disputeService.getAllDisputes();
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
    reset({
      status: dispute.status,
      adminNotes: dispute.adminNotes || '',
    });
  };

  const handleUpdateStatus = async (formData: { status: string; adminNotes: string }) => {
    if (!selectedDispute) return;

    try {
      await disputeService.updateDisputeStatus(
        selectedDispute.id,
        formData.status as Dispute['status'],
        formData.adminNotes
      );
      
      toast({
        title: 'Status Updated',
        description: 'The dispute status has been updated successfully.',
      });
      
      fetchDisputes();
      setSelectedDispute(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update dispute status',
        variant: 'destructive',
      });
    }
  };

  const handleContactUser = (phone: string) => {
    // In a real app, this would open a dialog to send a message or call
    toast({
      title: 'Contact User',
      description: `Contacting user at ${phone}`,
    });
  };

  const handleContactGarage = (garageId: string, garageName: string) => {
    // In a real app, this would open a dialog to send a message to the garage
    toast({
      title: 'Contact Garage',
      description: `Contacting ${garageName}`,
    });
  };

  const handleRefresh = () => {
    fetchDisputes();
  };

  const filteredDisputes = disputes.filter(dispute => {
    const statusMatch = filterStatus === 'all' || dispute.status === filterStatus;
    const typeMatch = filterType === 'all' || dispute.issueType === filterType;
    return statusMatch && typeMatch;
  });

  // Sort disputes by critical first, then by created date
  const sortedDisputes = [...filteredDisputes].sort((a, b) => {
    if (a.critical && !b.critical) return -1;
    if (!a.critical && b.critical) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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
    <AppLayout title="Dispute Management" showBackButton>
      <div className="p-4 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Customer Disputes</h1>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Card className="mb-4">
          <div className="p-4 flex flex-wrap gap-2">
            <div className="flex-1 min-w-[150px]">
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select
                value={filterStatus}
                onValueChange={setFilterStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[150px]">
              <label className="text-sm font-medium mb-1 block">Issue Type</label>
              <Select
                value={filterType}
                onValueChange={setFilterType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {ISSUE_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[150px]">
              <label className="text-sm font-medium mb-1 block">Search</label>
              <div className="relative">
                <Input placeholder="Search disputes..." />
              </div>
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="text-center py-10">Loading disputes...</div>
        ) : sortedDisputes.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No disputes found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Garage</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedDisputes.map((dispute) => (
                  <TableRow 
                    key={dispute.id}
                    className={dispute.critical ? "bg-red-50" : undefined}
                  >
                    <TableCell className="font-medium">
                      {dispute.id}
                      {dispute.critical && (
                        <div className="mt-1">
                          <Badge className="bg-red-500">Critical</Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{getIssueLabel(dispute.issueType)}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {dispute.description.substring(0, 50)}
                        {dispute.description.length > 50 ? '...' : ''}
                      </div>
                    </TableCell>
                    <TableCell>{dispute.garageName}</TableCell>
                    <TableCell>
                      {new Date(dispute.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleOpenDispute(dispute)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Dispute Detail Dialog */}
        <Dialog open={!!selectedDispute} onOpenChange={(open) => !open && setSelectedDispute(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span>Dispute {selectedDispute?.id}</span>
                {selectedDispute?.critical && (
                  <Badge className="bg-red-500">Critical</Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="details" onValueChange={(value) => setViewMode(value as any)}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="response">
                  Garage Response
                  {selectedDispute?.garageResponse && (
                    <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 inline-flex items-center justify-center">
                      1
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                {selectedDispute && (
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
                        <h3 className="text-sm font-medium text-muted-foreground">User Phone</h3>
                        <p>{selectedDispute.userPhone}</p>
                      </div>
                      <div className="col-span-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                        <p className="whitespace-pre-wrap">{selectedDispute.description}</p>
                      </div>
                    </div>
                    
                    {selectedDispute.mediaUrls.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Evidence Provided
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
                    
                    <form onSubmit={handleSubmit(handleUpdateStatus)} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-1">Update Status</label>
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="under-review">Under Review</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium block mb-1">Admin Notes</label>
                        <Textarea
                          {...register('adminNotes')}
                          placeholder="Add internal notes about this case..."
                          className="h-20"
                        />
                      </div>
                      
                      <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                        <div className="flex gap-2">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => handleContactUser(selectedDispute.userPhone)}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Contact User
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => handleContactGarage(selectedDispute.garageId, selectedDispute.garageName)}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Contact Garage
                          </Button>
                        </div>
                        
                        <div className="flex gap-2">
                          <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                          </DialogClose>
                          <Button 
                            type="submit" 
                            className="bg-garage-purple hover:bg-garage-purple/90"
                          >
                            Update Status
                          </Button>
                        </div>
                      </DialogFooter>
                    </form>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="response">
                {selectedDispute?.garageResponse ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Garage Response</h3>
                      <p className="whitespace-pre-wrap">{selectedDispute.garageResponse}</p>
                    </div>
                    
                    {selectedDispute.garageResponseMediaUrls && selectedDispute.garageResponseMediaUrls.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Media from Garage
                        </h3>
                        <MediaGallery
                          media={selectedDispute.garageResponseMediaUrls.map((url, index) => ({
                            id: `garage-media-${index}`,
                            serviceId: selectedDispute.id,
                            type: 'image',
                            url,
                            createdAt: selectedDispute.updatedAt,
                            mechanicId: selectedDispute.garageId,
                            mechanicName: selectedDispute.garageName
                          }))}
                        />
                      </div>
                    )}
                    
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Archive className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="font-medium mb-1">No Response Yet</h3>
                    <p className="text-muted-foreground">
                      The garage hasn't responded to this dispute yet.
                    </p>
                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default DisputeAdminPage;
