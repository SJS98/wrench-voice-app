
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GarageCard, { Garage } from "@/components/garage/GarageCard";
import VehicleCommandButton from "@/components/voice/VoiceCommandButton";
import { Search as SearchIcon, MapPin, List, Settings } from "lucide-react";
import { VehicleType } from "@/types/vehicles";
import VehicleIcon from "@/components/vehicles/VehicleIcon";

// Mock data for garages with updated vehicle type support
const mockGarages: Garage[] = [
  {
    id: "1",
    name: "Auto Care Center",
    type: "Service & Repair",
    address: "MG Road, Bangalore",
    distance: "1.2 km",
    rating: 4.7,
    reviewCount: 124,
    imageUrl:
      "https://images.unsplash.com/photo-1617886903355-df116483a857?q=80&w=600&auto=format&fit=crop",
    isOpen: true,
    openTime: "8:00 AM",
    closeTime: "8:00 PM",
    services: ["Oil Change", "Brake Repair", "Engine Diagnostics"],
    supportedVehicles: ["car", "bike", "auto-rickshaw"],
  },
  {
    id: "2",
    name: "Quick Wheel Service",
    type: "Tire & Wheel",
    address: "HSR Layout, Bangalore",
    distance: "2.5 km",
    rating: 4.5,
    reviewCount: 86,
    imageUrl:
      "https://images.unsplash.com/photo-1601101108231-11f5f9a282aa?q=80&w=600&auto=format&fit=crop",
    isOpen: true,
    openTime: "9:00 AM",
    closeTime: "7:00 PM",
    services: ["Wheel Alignment", "Tire Replacement", "Balancing"],
    supportedVehicles: ["car", "bike", "truck"],
  },
  {
    id: "3",
    name: "Car Doctor",
    type: "Full Service",
    address: "Koramangala, Bangalore",
    distance: "3.7 km",
    rating: 4.2,
    reviewCount: 152,
    imageUrl:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=600&auto=format&fit=crop",
    isOpen: false,
    openTime: "9:00 AM",
    closeTime: "8:00 PM",
    services: ["Engine Repair", "AC Service", "Electrical"],
    supportedVehicles: ["car"],
  },
  {
    id: "4",
    name: "Highway Motors",
    type: "Multi-brand Workshop",
    address: "Indiranagar, Bangalore",
    distance: "4.1 km",
    rating: 4.8,
    reviewCount: 210,
    imageUrl:
      "https://images.unsplash.com/photo-1613214177885-74ca3500b8a3?q=80&w=600&auto=format&fit=crop",
    isOpen: true,
    openTime: "7:30 AM",
    closeTime: "9:00 PM",
    services: ["General Service", "Custom Work", "Roadside Assistance"],
    supportedVehicles: ["car", "bike", "truck", "bus"],
  },
  {
    id: "5",
    name: "Reliable Auto Shop",
    type: "Repair & Maintenance",
    address: "Whitefield, Bangalore",
    distance: "7.3 km",
    rating: 4.0,
    reviewCount: 78,
    imageUrl:
      "https://images.unsplash.com/photo-1566233590969-d77010fc90f8?q=80&w=600&auto=format&fit=crop",
    isOpen: true,
    openTime: "10:00 AM",
    closeTime: "7:00 PM",
    services: ["AC Service", "Engine Work", "Body Repair"],
    supportedVehicles: ["car"],
  },
  {
    id: "6",
    name: "Cycle Hub",
    type: "Bicycle Repair",
    address: "JP Nagar, Bangalore",
    distance: "5.2 km",
    rating: 4.9,
    reviewCount: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=600&auto=format&fit=crop",
    isOpen: true,
    openTime: "8:30 AM",
    closeTime: "6:00 PM",
    services: ["Tune Up", "Tire Repair", "Chain Replacement"],
    supportedVehicles: ["bicycle"],
  },
  {
    id: "7",
    name: "Truck & Bus Service",
    type: "Heavy Vehicle Workshop",
    address: "Electronic City, Bangalore",
    distance: "12.1 km",
    rating: 4.6,
    reviewCount: 63,
    imageUrl:
      "https://images.unsplash.com/photo-1602516091331-27005778da9c?q=80&w=600&auto=format&fit=crop",
    isOpen: true,
    openTime: "7:00 AM",
    closeTime: "8:00 PM",
    services: ["Engine Overhaul", "Brake Service", "Transmission Repair"],
    supportedVehicles: ["truck", "bus"],
  },
  {
    id: "8",
    name: "Auto Rickshaw Service",
    type: "Auto Repair",
    address: "Yelahanka, Bangalore",
    distance: "9.8 km",
    rating: 4.3,
    reviewCount: 38,
    imageUrl:
      "https://images.unsplash.com/photo-1548013558-9592ef309506?q=80&w=600&auto=format&fit=crop",
    isOpen: true,
    openTime: "9:00 AM",
    closeTime: "7:00 PM",
    services: ["Engine Repair", "Electrical Work", "General Service"],
    supportedVehicles: ["auto-rickshaw"],
  },
];

// Filter types
const serviceTypes = [
  "All",
  "Repair",
  "Maintenance",
  "Wheel & Tire",
  "Body Shop",
  "AC Service",
];

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehicleIdFromParams = queryParams.get("vehicleId");
  const vehicleTypeFromParams = queryParams.get(
    "vehicleType"
  ) as VehicleType | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredGarages, setFilteredGarages] = useState(mockGarages);
  const [selectedVehicleType, setSelectedVehicleType] = useState<
    VehicleType | undefined
  >(vehicleTypeFromParams || undefined);

  useEffect(() => {
    filterGarages();
  }, [selectedFilter, selectedVehicleType, searchQuery]);

  const filterGarages = () => {
    let filtered = mockGarages;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (garage) =>
          garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          garage.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          garage.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by service type
    if (selectedFilter !== "All") {
      filtered = filtered.filter(
        (garage) =>
          garage.services?.some((service) =>
            service.includes(selectedFilter)
          ) || garage.type.includes(selectedFilter)
      );
    }

    // Filter by vehicle type
    if (selectedVehicleType) {
      filtered = filtered.filter(
        (garage) =>
          !garage.supportedVehicles ||
          garage.supportedVehicles.includes(selectedVehicleType)
      );
    }

    setFilteredGarages(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterGarages();
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleVehicleTypeChange = (type: VehicleType | undefined) => {
    setSelectedVehicleType(type);
  };

  return (
    <AppLayout title="Find Garages" showSearch={false}>
      <div className="page-container">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by garage name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>
        </form>

        {/* Service Type Filter - Always show full text in chip, no expand */}
        <div className="mb-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1">
            {serviceTypes.map((type) => {
              const isSelected = selectedFilter === type;
              return (
                <Button
                  key={type}
                  variant="ghost"
                  size="sm"
                  className={`rounded-full px-3 py-1 text-xs transition-all duration-200 ${
                    isSelected
                      ? "bg-garage-purple text-white font-semibold z-10"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => handleFilterChange(type)}
                  title={type}
                  style={{
                    minWidth: "auto",
                    width: "auto",
                  }}
                >
                  <span className="whitespace-nowrap">{type}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Top Controls: Near Me, Filter, View Switch - Compact */}
        <div className="mb-2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-100 rounded-full flex-1 min-w-0 px-2 py-1 text-xs"
            onClick={() => {}}
          >
            <MapPin className="h-4 w-4 mr-1" />
            Near Me
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-100 rounded-full flex-1 min-w-0 px-2 py-1 text-xs"
            onClick={() => {}}
          >
            <Settings className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <div className="flex border rounded-full overflow-hidden ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none px-2 py-1 ${
                viewMode === "list" ? "bg-garage-purple text-white" : ""
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List View"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none px-2 py-1 ${
                viewMode === "map" ? "bg-garage-purple text-white" : ""
              }`}
              onClick={() => setViewMode("map")}
              aria-label="Map View"
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="space-y-4">
            {filteredGarages.length > 0 ? (
              filteredGarages.map((garage) => (
                <GarageCard
                  key={garage.id}
                  garage={garage}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No garages found matching your criteria
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("All");
                    setSelectedVehicleType(undefined);
                    setFilteredGarages(mockGarages);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg h-[500px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Map view coming soon</p>
              <Button variant="outline" onClick={() => setViewMode("list")}>
                Switch to List View
              </Button>
            </div>
          </div>
        )}

        <VehicleCommandButton />
      </div>
    </AppLayout>
  );
};

export default SearchPage;
