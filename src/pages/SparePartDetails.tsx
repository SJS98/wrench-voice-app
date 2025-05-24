
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

const SparePartDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <AppLayout title="Part Details" showBackButton>
      <div className="container py-4 pb-20">
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Part Details</h2>
            <p className="text-muted-foreground">
              Details for part ID: {id}
            </p>
            <p className="text-muted-foreground mt-2">
              This feature is under development.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SparePartDetailsPage;
