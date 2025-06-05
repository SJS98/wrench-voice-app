
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { VehicleType } from "@/types/vehicles";

// Define types for filters and sorting
export type GarageFilters = {
  vehicleType?: VehicleType[];
  serviceType?: string[];
  rating?: number;
  distance?: number;
  isOpenNow?: boolean;
};

export type GarageSorting = {
  field: "distance" | "rating";
  order: "asc" | "desc";
};

interface GarageFiltersProps {
  onFilterChange: (filters: GarageFilters) => void;
  onSortChange: (sorting: GarageSorting) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
}

// Example filter options
const vehicleTypes: VehicleType[] = [
  "car",
  "bike",
  "truck",
  "bus",
  "auto-rickshaw",
  "bicycle",
];
const serviceTypes: string[] = [
  "Repair",
  "Maintenance",
  "Wheel & Tire",
  "Body Shop",
  "AC Service",
];
const sortOptions = [
  { label: "Nearest", value: "distance_asc" },
  { label: "Highest Rated", value: "rating_desc" },
];

const GarageFilters: React.FC<GarageFiltersProps> = ({
  onFilterChange,
  onSortChange,
  showMobileFilters,
  setShowMobileFilters,
}) => {
  const [filters, setFilters] = useState<GarageFilters>({});
  const [selectedSort, setSelectedSort] = useState("distance_asc");
  const [distance, setDistance] = useState(10); // in km
  const [rating, setRating] = useState(0);

  const handleFilterChange = (category: keyof GarageFilters, value: any) => {
    const updatedFilters = { ...filters };

    if (category === "vehicleType" || category === "serviceType") {
      const currentArray = (updatedFilters[category] as string[]) || [];
      if (currentArray.includes(value)) {
        const filtered = currentArray.filter((item) => item !== value);
        if (filtered.length === 0) {
          delete updatedFilters[category];
        } else {
          updatedFilters[category] = filtered as any;
        }
      } else {
        updatedFilters[category] = [...currentArray, value] as any;
      }
    } else if (category === "distance") {
      updatedFilters.distance = value;
      setDistance(value);
    } else if (category === "rating") {
      updatedFilters.rating = value;
      setRating(value);
    } else if (category === "isOpenNow") {
      updatedFilters.isOpenNow = value;
    } else {
      (updatedFilters as any)[category] = value;
    }

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);

    let sorting: GarageSorting;
    switch (value) {
      case "distance_asc":
        sorting = { field: "distance", order: "asc" };
        break;
      case "rating_desc":
        sorting = { field: "rating", order: "desc" };
        break;
      default:
        sorting = { field: "distance", order: "asc" };
        break;
    }
    onSortChange(sorting);
  };

  const handleResetFilters = () => {
    setFilters({});
    setDistance(10);
    setRating(0);
    setSelectedSort("distance_asc");
    onFilterChange({});
    onSortChange({ field: "distance", order: "asc" });
  };

  const isSelected = (category: keyof GarageFilters, value: any): boolean => {
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
            {sortOptions.map((option) => (
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
          {vehicleTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={isSelected("vehicleType", type)}
                onCheckedChange={() => handleFilterChange("vehicleType", type)}
              />
              <label htmlFor={`type-${type}`} className="text-sm capitalize">
                {type.replace("-", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Service Type Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Service Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {serviceTypes.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${service}`}
                checked={isSelected("serviceType", service)}
                onCheckedChange={() =>
                  handleFilterChange("serviceType", service)
                }
              />
              <label htmlFor={`service-${service}`} className="text-sm">
                {service}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Distance Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Distance (km)</h3>
        <div className="space-y-4">
          <Slider
            min={1}
            max={50}
            step={1}
            value={[distance]}
            onValueChange={(value) => handleFilterChange("distance", value[0])}
          />
          <div className="flex justify-between text-sm">
            <span>1 km</span>
            <span>{distance} km</span>
            <span>50 km</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
        <div className="space-y-4">
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={[rating]}
            onValueChange={(value) => handleFilterChange("rating", value[0])}
          />
          <div className="flex justify-between text-sm">
            <span>0</span>
            <span>{rating}★</span>
            <span>5</span>
          </div>
        </div>
      </div>

      {/* Open Now Filter */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="open-now"
            checked={!!filters.isOpenNow}
            onCheckedChange={() =>
              handleFilterChange("isOpenNow", !filters.isOpenNow)
            }
          />
          <label htmlFor="open-now" className="text-sm">
            Open Now
          </label>
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
        <div className="py-4">{filtersContent}</div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {/* Mobile Filters */}
      {mobileFilters}

      {/* Desktop Filters */}
      <div className="hidden lg:block">{filtersContent}</div>
    </>
  );
};

export default GarageFilters;
