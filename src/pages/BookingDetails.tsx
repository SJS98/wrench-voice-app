import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Phone, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/components/layout/AppLayout';

// Mock booking data (replace with actual API call)
const mockBooking = {
  id: '12345',
  date: '2024-03-15',
  time: '10:00 AM',
  garage: {
    name: 'Auto Care Center',
    address: '123 Main St, Anytown',
    phone: '+1 555-123-4567',
  },
  services: ['Oil Change', 'Tire Rotation'],
  status: 'confirmed',
  price: 75.00,
};

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();

  // In a real application, you would fetch the booking details
  // using the ID from an API endpoint.
  // For now, we'll use mock data.

  return (
    <AppLayout title="Booking Details" showBackButton>
      <div className="container py-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Booking ID: {id || mockBooking.id}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Date: {mockBooking.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Time: {mockBooking.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Location: {mockBooking.garage.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>Phone: {mockBooking.garage.phone}</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Services:</h4>
              <ul className="list-disc pl-5">
                {mockBooking.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status:</h4>
                <Badge variant="secondary">{mockBooking.status}</Badge>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Total:</h4>
                <span>${mockBooking.price}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <Link to={`/service-book/${mockBooking.id}/media`}>
                <Button variant="outline">View Service Media</Button>
              </Link>
              <Link to={`/report-issue/${mockBooking.id}`}>
                <Button variant="destructive">Report Issue</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BookingDetails;
