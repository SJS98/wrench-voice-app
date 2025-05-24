import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard, { Service } from "@/components/service/ServiceCard";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, CreditCard } from "lucide-react";
import { useUserAuth } from "@/contexts/UserAuthContext";
import VoiceCommandButton from "@/components/voice/VoiceCommandButton";
import { VehicleType, vehicleTypeNames } from "@/types/vehicles";
import VehicleIcon from "@/components/vehicles/VehicleIcon";

// Mock garage data
const mockGarageDetails = {
  id: "1",
  name: "Auto Care Center",
  type: "Service & Repair",
  address: "MG Road, Bangalore",
  distance: "1.2 km",
  rating: 4.7,
  reviewCount: 124,
  imageUrl:
    "https://images.unsplash.com/photo-1617886903355-df116483a857?q=80&w=600&auto=format&fit=crop",
  supportedVehicles: ["car", "bike", "auto-rickshaw"] as VehicleType[],
};

// Mock services with vehicle compatibility
const mockServices: Service[] = [
  {
    id: "1",
    name: "Basic Service",
    description: "Oil change, filter replacement, and basic inspection",
    price: 2499,
    duration: "2 hours",
    iconUrl: "/placeholder.svg",
    compatibleVehicles: ["car", "bike", "auto-rickshaw"],
  },
  {
    id: "2",
    name: "Full Wash",
    description: "Interior & exterior cleaning with polish",
    price: 999,
    duration: "1 hour",
    iconUrl: "/placeholder.svg",
    compatibleVehicles: ["car", "bike", "auto-rickshaw", "truck", "bus"],
  },
  {
    id: "3",
    name: "Tire Service",
    description: "Rotate tires for even wear and alignment check",
    price: 799,
    duration: "45 min",
    iconUrl: "/placeholder.svg",
    compatibleVehicles: ["car", "truck", "bus"],
  },
  {
    id: "4",
    name: "AC Service",
    description: "Complete AC system service and gas refill",
    price: 3999,
    duration: "3 hours",
    iconUrl: "/placeholder.svg",
    compatibleVehicles: ["car", "bus", "truck"],
  },
  {
    id: "5",
    name: "Chain Lubrication",
    description: "Clean and lubricate chain for smooth operation",
    price: 299,
    duration: "30 min",
    iconUrl: "/placeholder.svg",
    compatibleVehicles: ["bike", "bicycle"],
  },
  {
    id: "6",
    name: "Gear Adjustment",
    description: "Fine tune gear shifting mechanism",
    price: 499,
    duration: "45 min",
    iconUrl: "/placeholder.svg",
    compatibleVehicles: ["bike", "bicycle"],
  },
];

// Mock vehicles with all types
const mockVehicles = [
  {
    id: "1",
    name: "Honda City",
    regNumber: "KA05AB1234",
    year: 2019,
    type: "car" as VehicleType,
  },
  {
    id: "2",
    name: "Maruti Swift",
    regNumber: "MH01CD5678",
    year: 2021,
    type: "car" as VehicleType,
  },
  {
    id: "3",
    name: "Hero Splendor",
    regNumber: "DL05XY9876",
    year: 2022,
    type: "bike" as VehicleType,
  },
  {
    id: "4",
    name: "Tata Ace",
    regNumber: "TN01ZZ1122",
    year: 2020,
    type: "truck" as VehicleType,
  },
  {
    id: "5",
    name: "My Bicycle",
    regNumber: "NA",
    year: 2023,
    type: "bicycle" as VehicleType,
  },
];

// Available time slots
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const BookServicePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isAuthenticated } = useUserAuth();

  const queryParams = new URLSearchParams(location.search);
  const vehicleIdFromParams = queryParams.get("vehicleId");
  const vehicleTypeFromParams = queryParams.get(
    "vehicleType"
  ) as VehicleType | null;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState(
    vehicleIdFromParams || mockVehicles[0].id
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("services");

  // Get the current vehicle object
  const currentVehicle = mockVehicles.find((v) => v.id === selectedVehicle);

  // Filter services based on vehicle type and garage supported vehicles
  const filteredServices = mockServices.filter(
    (service) =>
      (!service.compatibleVehicles ||
        (currentVehicle &&
          service.compatibleVehicles.includes(currentVehicle.type))) &&
      (!mockGarageDetails.supportedVehicles ||
        (currentVehicle &&
          mockGarageDetails.supportedVehicles.includes(currentVehicle.type)))
  );

  // Fetch garage data on component mount
  useEffect(() => {
    if (!id) {
      navigate("/search");
      toast({
        title: "Error",
        description: "Invalid garage ID",
        variant: "destructive",
      });
    }

    // Pre-select vehicle based on URL params if available
    if (vehicleIdFromParams) {
      setSelectedVehicle(vehicleIdFromParams);
    }
    // console.log(vehicleIdFromParams);
  }, [id, navigate, toast, vehicleIdFromParams]);

  // Reset selected services when vehicle changes
  useEffect(() => {
    setSelectedServices([]);
  }, [selectedVehicle]);

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((sid) => sid !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    let total = 0;

    // Get the vehicle type for price adjustments
    const vehicleType = currentVehicle?.type;

    // Define price multipliers based on vehicle type
    const priceMultipliers: Record<VehicleType, number> = {
      car: 1,
      bike: 0.6,
      truck: 2.5,
      bus: 3,
      "auto-rickshaw": 0.8,
      bicycle: 0.3,
    };

    filteredServices.forEach((service) => {
      if (selectedServices.includes(service.id)) {
        // Apply price multiplier based on vehicle type
        const multiplier = vehicleType ? priceMultipliers[vehicleType] : 1;
        total += Math.round(service.price * multiplier);
      }
    });

    return total;
  };

  const handleBookService = () => {
    if (!selectedDate || !selectedTimeSlot || selectedServices.length === 0) {
      toast({
        title: "Incomplete booking",
        description: "Please select services, date and time slot",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      // In a real app, we would redirect to login
      toast({
        title: "Login required",
        description: "Please login to book a service",
        variant: "destructive",
      });
      return;
    }

    // Navigate to checkout
    navigate("/checkout", {
      state: {
        garageId: id,
        garageName: mockGarageDetails.name,
        services: selectedServices,
        vehicle: mockVehicles.find((v) => v.id === selectedVehicle),
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        totalPrice: getTotalPrice(),
      },
    });
  };

  // Check if the selected vehicle is supported by this garage
  const isVehicleSupported =
    !currentVehicle ||
    !mockGarageDetails.supportedVehicles ||
    mockGarageDetails.supportedVehicles.includes(currentVehicle.type);

  return (
    <AppLayout title="Book Service" showBackButton>
      <div className="p-4 pb-32">
        <div className="mb-6">
          <h2 className="text-xl font-bold">
            Book at {mockGarageDetails.name}
          </h2>
          <p className="text-muted-foreground">{mockGarageDetails.address}</p>

          {!isVehicleSupported && currentVehicle && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              <strong>Warning:</strong> This garage doesn't support{" "}
              {vehicleTypeNames[currentVehicle.type]} services. Please choose a
              different vehicle or garage.
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {mockGarageDetails.supportedVehicles?.map((type) => (
              <div
                key={type}
                className="flex items-center gap-1 text-xs bg-garage-purple/10 px-2 py-1 rounded"
              >
                <VehicleIcon
                  type={type}
                  className="h-3 w-3 text-garage-purple"
                />
                <span className="text-garage-purple">
                  {vehicleTypeNames[type]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Tabs
          defaultValue="services"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <h3 className="text-lg font-medium mb-3">
              Select Services
              {currentVehicle && (
                <span className="text-sm ml-2 text-muted-foreground">
                  for {vehicleTypeNames[currentVehicle.type]}
                </span>
              )}
            </h3>

            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selectedServices.includes(service.id)}
                  onClick={() => toggleServiceSelection(service.id)}
                  selectedVehicleType={currentVehicle?.type}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No services available for this vehicle type
                </p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setActiveTab("vehicle")}
                disabled={selectedServices.length === 0}
                className="bg-garage-purple hover:bg-garage-purple/90"
              >
                Continue
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="vehicle">
            <h3 className="text-lg font-medium mb-4">Select Vehicle</h3>

            <div className="space-y-4 mb-6">
              {mockVehicles
                // Filter vehicles based on garage supported types
                .filter(
                  (vehicle) =>
                    !mockGarageDetails.supportedVehicles ||
                    mockGarageDetails.supportedVehicles.includes(vehicle.type)
                )
                .map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      selectedVehicle === vehicle.id
                        ? "border-garage-purple bg-garage-purple/5"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <VehicleIcon type={vehicle.type} className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">{vehicle.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{vehicle.regNumber}</span>
                          {vehicle.regNumber !== "NA" && <span> • </span>}
                          <span>{vehicle.year}</span>
                          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                            {vehicleTypeNames[vehicle.type]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setActiveTab("services")}
              >
                Back
              </Button>
              <Button
                onClick={() => setActiveTab("schedule")}
                className="bg-garage-purple hover:bg-garage-purple/90"
              >
                Continue
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Date</span>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-3"
                disabled={(date) =>
                  date < new Date() ||
                  date > new Date(new Date().setDate(new Date().getDate() + 30))
                }
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Time Slot</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    className={
                      selectedTimeSlot === slot ? "bg-garage-purple" : ""
                    }
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab("vehicle")}>
                Back
              </Button>
              <Button
                onClick={handleBookService}
                disabled={
                  !selectedDate ||
                  !selectedTimeSlot ||
                  selectedServices.length === 0 ||
                  !isVehicleSupported
                }
                className="bg-garage-purple hover:bg-garage-purple/90"
              >
                Proceed to Checkout
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {selectedServices.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Selected Services: {selectedServices.length}
              </span>
              <span className="font-bold">
                ₹{getTotalPrice().toLocaleString()}
              </span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                {currentVehicle && (
                  <span className="text-xs text-muted-foreground">
                    {currentVehicle.name} •
                    {vehicleTypeNames[currentVehicle.type]} •
                    {selectedDate && format(selectedDate, " dd MMM")}
                    {selectedTimeSlot ? `, ${selectedTimeSlot}` : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <VoiceCommandButton />
      </div>
    </AppLayout>
  );
};

export default BookServicePage;
