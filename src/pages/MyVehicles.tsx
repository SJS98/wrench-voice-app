
import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/AppLayout";
import { Vehicle, VehicleType, vehicleTypeNames } from "@/types/vehicles";
import VehicleIcon from "@/components/vehicles/VehicleIcon";

// Mock vehicle data with updated types
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "My Honda City",
    brand: "Honda",
    model: "City",
    year: 2019,
    registrationNumber: "KA05AB1234",
    type: "car",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Office Swift",
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2021,
    registrationNumber: "MH01CD5678",
    type: "car",
    image: "https://images.unsplash.com/photo-1630475313173-97a671c40a3b?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "My Splendor",
    brand: "Hero",
    model: "Splendor Plus",
    year: 2022,
    registrationNumber: "DL05XY9876",
    type: "bike",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Delivery Truck",
    brand: "Tata",
    model: "Ace",
    year: 2020,
    registrationNumber: "TN01ZZ1122",
    type: "truck",
    image: "https://images.unsplash.com/photo-1519003722824-194d4c582e5c?q=80&w=500&auto=format&fit=crop"
  }
];

const MyVehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    type: "car"
  });
  
  const handleInputChange = (field: keyof Vehicle, value: string | number) => {
    setNewVehicle({
      ...newVehicle,
      [field]: value
    });
  };

  const handleAddVehicle = () => {
    if (!newVehicle.name || !newVehicle.brand || !newVehicle.model || !newVehicle.year || !newVehicle.registrationNumber) {
      return;
    }
    
    const vehicle: Vehicle = {
      id: `${vehicles.length + 1}`,
      name: newVehicle.name,
      brand: newVehicle.brand,
      model: newVehicle.model,
      year: Number(newVehicle.year),
      registrationNumber: newVehicle.registrationNumber,
      type: newVehicle.type as VehicleType || "car",
    };
    
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({ type: "car" });
    setIsAddDialogOpen(false);
  };

  return (
    <AppLayout title="My Vehicles" showBackButton>
      <div className="page-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Your Vehicles</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-garage-purple hover:bg-garage-purple/90">
                <Plus className="h-4 w-4 mr-1" /> Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-3">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-name">Vehicle Nickname</Label>
                  <Input 
                    id="vehicle-name" 
                    placeholder="e.g., My Honda City" 
                    value={newVehicle.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehicle-type">Vehicle Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(vehicleTypeNames) as VehicleType[]).map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={newVehicle.type === type ? "default" : "outline"}
                        className={`flex flex-col items-center justify-center h-20 ${
                          newVehicle.type === type ? "bg-garage-purple" : ""
                        }`}
                        onClick={() => handleInputChange('type', type)}
                      >
                        <VehicleIcon type={type} className="h-6 w-6 mb-1" />
                        <span className="text-xs">{vehicleTypeNames[type]}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input 
                      id="brand" 
                      placeholder="e.g., Honda" 
                      value={newVehicle.brand || ''}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input 
                      id="model" 
                      placeholder="e.g., City" 
                      value={newVehicle.model || ''}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input 
                      id="year" 
                      placeholder="e.g., 2020" 
                      type="number" 
                      value={newVehicle.year || ''}
                      onChange={(e) => handleInputChange('year', parseInt(e.target.value) || '')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration">Registration Number</Label>
                    <Input 
                      id="registration" 
                      placeholder="e.g., KA01AB1234" 
                      value={newVehicle.registrationNumber || ''}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehicle-photo">Vehicle Photo (Optional)</Label>
                  <Input id="vehicle-photo" type="file" accept="image/*" />
                </div>
                
                <Button 
                  className="w-full bg-garage-purple hover:bg-garage-purple/90"
                  onClick={handleAddVehicle}
                >
                  Add Vehicle
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {vehicles.length > 0 ? (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div 
                key={vehicle.id} 
                className="border rounded-lg overflow-hidden"
              >
                <div className="relative">
                  {vehicle.image ? (
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                      <VehicleIcon type={vehicle.type} className="h-20 w-20 text-gray-300" />
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button className="p-2 bg-white/80 rounded-full">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/80 rounded-full">
                      <Trash className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center">
                      <VehicleIcon type={vehicle.type} className="h-3 w-3 mr-1" />
                      {vehicleTypeNames[vehicle.type]}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 mb-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Brand/Model: </span>
                      <span>{vehicle.brand} {vehicle.model} ({vehicle.year})</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Registration: </span>
                      <span>{vehicle.registrationNumber}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to={`/services?vehicleId=${vehicle.id}`} className="flex-1">
                      <Button className="w-full bg-garage-purple hover:bg-garage-purple/90">
                        Book Service
                      </Button>
                    </Link>
                    <Link to={`/history?vehicleId=${vehicle.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View History
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <VehicleIcon type="car" className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No vehicles added</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add your vehicles to book services easily
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-garage-purple hover:bg-garage-purple/90"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Your First Vehicle
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MyVehiclesPage;
