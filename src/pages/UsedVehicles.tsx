
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usedVehiclesService } from '@/services/usedVehiclesService';
import { UsedVehicle, UsedVehicleFilters, UsedVehicleSorting } from '@/types/usedVehicles';
import AppLayout from '@/components/layout/AppLayout';
import VehicleCard from '@/components/usedVehicles/VehicleCard';
import VehicleFilters from '@/components/usedVehicles/VehicleFilters';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { useUserAuth } from '@/contexts/UserAuthContext';

const UsedVehicles = () => {
  const { user } = useUserAuth();
  const [filters, setFilters] = useState<UsedVehicleFilters>({});
  const [sorting, setSorting] = useState<UsedVehicleSorting>({ 
    field: 'createdAt', 
    order: 'desc' 
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['usedVehicles', filters, sorting],
    queryFn: () => usedVehiclesService.getUsedVehicles(filters, sorting),
  });
  
  const handleFilterChange = (newFilters: UsedVehicleFilters) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (newSorting: UsedVehicleSorting) => {
    setSorting(newSorting);
  };
  
  return (
    <AppLayout 
      title="Used Vehicles" 
      showBackButton 
      showSearch
    >
      <div className="container py-4 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Browse Used Vehicles</h1>
          
          {user && (user.role === 'owner') && (
            <Link to="/used-vehicles/sell">
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                List Vehicle
              </Button>
            </Link>
          )}
        </div>
        
        <p className="text-muted-foreground mb-6">
          Find reliable pre-owned vehicles from verified sellers
        </p>
        
        <div className="flex lg:hidden items-center justify-between mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {vehicles?.length || 0} vehicles found
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <VehicleFilters 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />
          </div>
          
          {/* Filters - Mobile */}
          <div className="lg:hidden">
            <VehicleFilters 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />
          </div>
          
          {/* Vehicle listings */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">Error loading vehicles. Please try again.</p>
                <Button variant="outline" className="mt-4">Retry</Button>
              </div>
            ) : vehicles && vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {vehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No vehicles found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setFilters({});
                    setSorting({ field: 'createdAt', order: 'desc' });
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UsedVehicles;
