
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

const SparePartsPage = () => {
  return (
    <AppLayout title="Spare Parts" showBackButton>
      <div className="container py-4 pb-20">
        <Card>
          <CardContent className="p-8 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Spare Parts Marketplace</h2>
            <p className="text-muted-foreground">
              Coming soon! Browse and purchase genuine spare parts for your vehicle.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SparePartsPage;
