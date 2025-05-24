
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ChevronRight, 
  Package, 
  ShoppingCart, 
  Truck 
} from 'lucide-react';
import { format } from 'date-fns';

// Temporary mock types until the real types are available
interface CartItem {
  partId: string;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';
  addressId: string;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  createdAt: string;
  expectedDeliveryDate?: string;
}

const MySparePartOrdersPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  
  // Mock data for demo
  const mockOrders: Order[] = [
    {
      id: 'ORD12345',
      userId: 'user1',
      items: [
        {
          partId: 'part1',
          quantity: 2,
          price: 1200,
          title: 'Brake Pad Set - Honda Civic',
          image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=150&auto=format&fit=crop'
        }
      ],
      totalAmount: 2499,
      status: 'Shipped',
      addressId: 'addr1',
      paymentMethod: 'UPI',
      createdAt: '2025-05-15T10:30:00Z',
      expectedDeliveryDate: '2025-05-22T18:00:00Z'
    }
  ];
  
  // Mock query
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockOrders;
    },
  });
  
  // Filter orders based on active tab
  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];
    
    if (activeTab === 'active') {
      return orders.filter(order => 
        ['Confirmed', 'Packed', 'Shipped'].includes(order.status)
      );
    } else {
      return orders.filter(order => 
        ['Delivered', 'Cancelled', 'Returned'].includes(order.status)
      );
    }
  }, [orders, activeTab]);
  
  // Handler for order cancellation
  const handleCancelOrder = async (orderId: string) => {
    try {
      // Mock cancellation
      await new Promise(resolve => setTimeout(resolve, 500));
      toast({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to cancel order";
      toast({
        title: "Action Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout title="My Orders" showBackButton>
      <div className="container py-4 pb-20">
        <Tabs defaultValue="active" value={activeTab} onValueChange={(value) => setActiveTab(value as 'active' | 'completed')}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onCancel={handleCancelOrder} 
                    showCancelButton 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg font-medium mb-2">No active orders</h2>
                <p className="text-muted-foreground mb-6">
                  You don't have any active orders at the moment
                </p>
                <Button onClick={() => window.location.href = '/spare-parts'}>
                  Shop Spare Parts
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg font-medium mb-2">No completed orders</h2>
                <p className="text-muted-foreground mb-6">
                  You don't have any completed orders yet
                </p>
                <Button onClick={() => window.location.href = '/spare-parts'}>
                  Shop Spare Parts
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

interface OrderCardProps {
  order: Order;
  onCancel: (orderId: string) => Promise<void>;
  showCancelButton: boolean;
}

const OrderCard = ({ order, onCancel, showCancelButton }: OrderCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await onCancel(order.id);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                Placed on {format(new Date(order.createdAt), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Badge 
              className={`
                ${order.status === 'Delivered' ? 'bg-green-500' : ''}
                ${order.status === 'Shipped' ? 'bg-purple-500' : ''}
                ${order.status === 'Packed' ? 'bg-yellow-500' : ''}
                ${order.status === 'Confirmed' ? 'bg-blue-500' : ''}
                ${order.status === 'Cancelled' ? 'bg-red-500' : ''}
                ${order.status === 'Returned' ? 'bg-gray-500' : ''}
              `}
            >
              {order.status}
            </Badge>
            <p className="font-medium mt-1">₹{order.totalAmount}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {order.status === 'Shipped' && order.expectedDeliveryDate && (
          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded text-sm mb-4">
            <Truck className="h-4 w-4 text-blue-500" />
            <span>
              Expected delivery by {format(new Date(order.expectedDeliveryDate), 'dd MMM yyyy')}
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 py-3 px-4">
        <div className="flex justify-between w-full items-center">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
            onClick={() => alert(`View details for order ${order.id}`)}
          >
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          
          {showCancelButton && order.status !== 'Shipped' && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {isLoading ? 'Cancelling...' : 'Cancel Order'}
            </Button>
          )}
          
          {order.status === 'Delivered' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert(`Leave review for order ${order.id}`)}
            >
              Leave Review
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MySparePartOrdersPage;
