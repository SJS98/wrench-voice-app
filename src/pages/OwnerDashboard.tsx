
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Star, Phone, Clock, Bell } from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  service: string;
  date: string;
  status: string;
  startTime?: string;
}

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user, garageData, updateGarageStatus } = useUserAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const analyticsData = [
    { name: 'Mon', bookings: 4 },
    { name: 'Tue', bookings: 6 },
    { name: 'Wed', bookings: 5 },
    { name: 'Thu', bookings: 8 },
    { name: 'Fri', bookings: 7 },
    { name: 'Sat', bookings: 9 },
    { name: 'Sun', bookings: 3 },
  ];

  const handleStatusToggle = async (checked: boolean) => {
    await updateGarageStatus(checked ? 'open' : 'closed');
  };

  return (
    <AppLayout title="Owner Dashboard" showSettings>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:gap-6">
          {/* Status Card */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Garage Status</CardTitle>
                <Switch 
                  checked={garageData?.status === 'open'}
                  onCheckedChange={handleStatusToggle}
                />
              </CardHeader>
              <CardContent>
                <div className={`inline-flex px-2 py-1 rounded text-sm ${
                  garageData?.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {garageData?.status === 'open' ? 'Open' : 'Closed'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Chart */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">Weekly Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-medium">Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end">
                      <p className="text-sm">{booking.date}</p>
                      <span className={`mt-1 inline-flex px-2 py-1 rounded text-xs ${
                        booking.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Button 
              onClick={() => navigate('/manage-bookings')}
              className="w-full"
            >
              Manage Bookings
            </Button>
            <Button 
              onClick={() => navigate('/edit-garage')}
              className="w-full"
            >
              Edit Garage Profile
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/manage-services')}
              className="w-full sm:col-span-2 lg:col-span-1"
            >
              Manage Services
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OwnerDashboard;
