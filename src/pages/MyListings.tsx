
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Eye,
  MessageCircle,
  MoreVertical,
  PenLine,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockListings = [
  {
    id: '1',
    title: '2019 Hyundai i20 - Low Mileage',
    price: 650000,
    status: 'Active',
    views: 122,
    inquiries: 8,
    lastUpdated: '2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    title: '2020 Royal Enfield Classic 350',
    price: 140000,
    status: 'Pending Approval',
    views: 0,
    inquiries: 0,
    lastUpdated: '12 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Hero Splendor Plus - 2021 Model',
    price: 60000,
    status: 'Sold',
    views: 94,
    inquiries: 12,
    lastUpdated: '1 week ago',
    imageUrl: 'https://images.unsplash.com/photo-1622185135504-6d4856cc4691?q=80&w=600&auto=format&fit=crop',
  },
];

const MyListings = () => {
  const { user } = useUserAuth();
  const { toast } = useToast();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean, id: string | null }>({
    open: false,
    id: null,
  });
  
  const handleDelete = (id: string) => {
    toast({
      title: "Listing Deleted",
      description: "Your vehicle listing has been successfully deleted",
    });
    setDeleteDialog({ open: false, id: null });
  };
  
  return (
    <ProtectedRoute allowedRoles={['owner', 'customer']}>
      <AppLayout title="My Listings" showBackButton>
        <div className="container py-4 pb-20">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Vehicle Listings</h1>
            <Link to="/used-vehicles/sell">
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                New Listing
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="sold">Sold</TabsTrigger>
              <TabsTrigger value="all">All Listings</TabsTrigger>
            </TabsList>
            
            {['active', 'pending', 'sold', 'all'].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {mockListings
                  .filter(listing => {
                    if (tab === 'all') return true;
                    if (tab === 'active') return listing.status === 'Active';
                    if (tab === 'pending') return listing.status === 'Pending Approval';
                    if (tab === 'sold') return listing.status === 'Sold';
                    return false;
                  })
                  .map(listing => (
                    <Card key={listing.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-48 md:h-auto">
                          <img 
                            src={listing.imageUrl} 
                            alt={listing.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex flex-col flex-1">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{listing.title}</CardTitle>
                                <CardDescription className="text-lg font-bold text-garage-purple mt-1">
                                  ₹{listing.price.toLocaleString()}
                                </CardDescription>
                              </div>
                              
                              <div className="flex flex-col items-end">
                                <Badge className={`
                                  ${listing.status === 'Active' ? 'bg-green-500' : 
                                    listing.status === 'Pending Approval' ? 'bg-yellow-500' : 
                                    'bg-blue-500'}
                                  mb-2
                                `}>
                                  {listing.status}
                                </Badge>
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link to={`/used-vehicles/${listing.id}`}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Listing
                                      </Link>
                                    </DropdownMenuItem>
                                    
                                    {listing.status !== 'Sold' && (
                                      <DropdownMenuItem asChild>
                                        <Link to={`/used-vehicles/edit/${listing.id}`}>
                                          <PenLine className="h-4 w-4 mr-2" />
                                          Edit Listing
                                        </Link>
                                      </DropdownMenuItem>
                                    )}
                                    
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => setDeleteDialog({ open: true, id: listing.id })}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Listing
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{listing.views} views</span>
                              </div>
                              
                              <div className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{listing.inquiries} inquiries</span>
                              </div>
                              
                              <div className="text-muted-foreground">
                                Last updated {listing.lastUpdated}
                              </div>
                            </div>
                          </CardContent>
                          
                          <CardFooter className="flex justify-end pt-0">
                            {listing.status === 'Active' && (
                              <Link to={`/used-vehicles/${listing.id}`}>
                                <Button size="sm" variant="outline">
                                  Manage Inquiries
                                </Button>
                              </Link>
                            )}
                            
                            {listing.status === 'Pending Approval' && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Awaiting Approval
                              </Badge>
                            )}
                            
                            {listing.status === 'Sold' && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Completed Sale
                              </Badge>
                            )}
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                
                {mockListings.filter(listing => {
                  if (tab === 'all') return true;
                  if (tab === 'active') return listing.status === 'Active';
                  if (tab === 'pending') return listing.status === 'Pending Approval';
                  if (tab === 'sold') return listing.status === 'Sold';
                  return false;
                }).length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">
                      {tab === 'all' 
                        ? "You haven't created any vehicle listings yet" 
                        : `You don't have any ${tab} listings`}
                    </p>
                    <Link to="/used-vehicles/sell">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Listing
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Delete Confirmation Dialog */}
        <Dialog 
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Listing</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this vehicle listing? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                variant="destructive"
                onClick={() => deleteDialog.id && handleDelete(deleteDialog.id)}
              >
                Delete Permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default MyListings;
