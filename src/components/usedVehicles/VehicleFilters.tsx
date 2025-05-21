
import React, { useState } from 'react';
import { 
  UsedVehicleFilters, 
  UsedVehicleSorting, 
  VehicleCondition, 
  SellerType 
} from '@/types/usedVehicles';
import { VehicleType, vehicleTypeNames } from '@/types/vehicles';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from 'lucide-react';

interface VehicleFiltersProps {
  onFilterChange: (filters: UsedVehicleFilters) => void;
  onSortChange: (sorting: UsedVehicleSorting) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
}

const vehicleTypes: VehicleType[] = ['car', 'bike', 'truck', 'bus', 'auto-rickshaw', 'bicycle'];
const conditionTypes: VehicleCondition[] = ['Excellent', 'Good', 'Average', 'Poor'];
const sellerTypes: SellerType[] = ['Garage', 'Service Center', 'Expired Vehicle'];

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' }
];

const VehicleFilters: React.FC<VehicleFiltersProps> = ({ 
  onFilterChange, 
  onSortChange,
  showMobileFilters,
  setShowMobileFilters
}) => {
  const [filters, setFilters] = useState<UsedVehicleFilters>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedSort, setSelectedSort] = useState('newest');
  
  const handleFilterChange = (
    category: keyof UsedVehicleFilters, 
    value: any
  ) => {
    const updatedFilters = { ...filters };
    
    if (category === 'priceRange') {
      updatedFilters.priceRange = {
        min: value[0],
        max: value[1]
      };
    } else if (
      category === 'vehicleType' || 
      category === 'condition' || 
      category === 'sellerType'
    ) {
      // Handle array-based filters (checkbox groups)
      const currentArray = updatedFilters[category] as any[] || [];
      
      if (currentArray.includes(value)) {
        // Remove value if already selected
        updatedFilters[category] = currentArray.filter(item => item !== value);
        if ((updatedFilters[category] as any[]).length === 0) {
          delete updatedFilters[category];
        }
      } else {
        // Add value if not selected
        updatedFilters[category] = [...currentArray, value];
      }
    } else {
      // Handle simple string values
      updatedFilters[category] = value;
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    
    let sorting: UsedVehicleSorting;
    
    switch (value) {
      case 'price_asc':
        sorting = { field: 'price', order: 'asc' };
        break;
      case 'price_desc':
        sorting = { field: 'price', order: 'desc' };
        break;
      case 'newest':
      default:
        sorting = { field: 'createdAt', order: 'desc' };
        break;
    }
    
    onSortChange(sorting);
  };
  
  const handleResetFilters = () => {
    setFilters({});
    setPriceRange([0, 1000000]);
    setSelectedSort('newest');
    onFilterChange({});
    onSortChange({ field: 'createdAt', order: 'desc' });
  };
  
  // Check if a filter value is selected
  const isSelected = (category: keyof UsedVehicleFilters, value: any): boolean => {
    if (!filters[category]) return false;
    
    if (Array.isArray(filters[category])) {
      return (filters[category] as any[]).includes(value);
    }
    
    return filters[category] === value;
  };
  
  const filtersContent = (
    <div className="space-y-6">
      {/* Sort Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Sort By</h3>
        <Select value={selectedSort} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Vehicle Type Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Vehicle Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {vehicleTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${type}`} 
                checked={isSelected('vehicleType', type)}
                onCheckedChange={() => 
                  handleFilterChange('vehicleType', type)
                }
              />
              <label 
                htmlFor={`type-${type}`}
                className="text-sm"
              >
                {vehicleTypeNames[type]}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Condition Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Vehicle Condition</h3>
        <div className="space-y-2">
          {conditionTypes.map(condition => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox 
                id={`condition-${condition}`} 
                checked={isSelected('condition', condition)}
                onCheckedChange={() => 
                  handleFilterChange('condition', condition)
                }
              />
              <label 
                htmlFor={`condition-${condition}`}
                className="text-sm"
              >
                {condition}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, 1000000]}
            value={priceRange}
            max={3000000}
            step={10000}
            onValueChange={(value) => {
              setPriceRange(value as [number, number]);
              handleFilterChange('priceRange', value);
            }}
          />
          <div className="flex justify-between text-sm">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* Seller Type Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Seller Type</h3>
        <div className="space-y-2">
          {sellerTypes.map(seller => (
            <div key={seller} className="flex items-center space-x-2">
              <Checkbox 
                id={`seller-${seller}`} 
                checked={isSelected('sellerType', seller)}
                onCheckedChange={() => 
                  handleFilterChange('sellerType', seller)
                }
              />
              <label 
                htmlFor={`seller-${seller}`}
                className="text-sm"
              >
                {seller}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reset Filters Button */}
      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={handleResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
  
  // Mobile filters using Sheet component
  const mobileFilters = (
    <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters & Sorting</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {filtersContent}
        </div>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <>
      {/* Mobile Filters */}
      {mobileFilters}
      
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        {filtersContent}
      </div>
    </>
  );
};

export default VehicleFilters;
