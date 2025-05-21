
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/components/layout/AppLayout';
import { useUserAuth } from '@/contexts/UserAuthContext';

const services = [
  { id: 'oil-change', label: 'Oil Change' },
  { id: 'battery', label: 'Battery Service' },
  { id: 'tires', label: 'Tire Service' },
  { id: 'ac', label: 'AC Service' },
  { id: 'general', label: 'General Service' },
];

const RegisterOwner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, registerGarage } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [garageData, setGarageData] = useState({
    name: '',
    email: '',
    password: '',
    garageName: '',
    garageType: '',
    address: '',
    pincode: '',
    services: [] as string[],
    emergencyContact: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(garageData.name, garageData.email, garageData.password, 'owner');
      await registerGarage(garageData);
      toast({
        title: 'Success',
        description: 'Garage registered successfully',
      });
      navigate('/owner-dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Registration failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Register Garage" showBackButton showNavigation={false}>
      <div className="container max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Owner Name</Label>
            <Input
              id="name"
              value={garageData.name}
              onChange={(e) => setGarageData({ ...garageData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={garageData.email}
              onChange={(e) => setGarageData({ ...garageData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={garageData.password}
              onChange={(e) => setGarageData({ ...garageData, password: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="garageName">Garage Name</Label>
            <Input
              id="garageName"
              value={garageData.garageName}
              onChange={(e) => setGarageData({ ...garageData, garageName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="garageType">Garage Type</Label>
            <select
              id="garageType"
              className="w-full p-2 border rounded-md"
              value={garageData.garageType}
              onChange={(e) => setGarageData({ ...garageData, garageType: e.target.value })}
              required
            >
              <option value="">Select type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="both">Both Car & Bike</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={garageData.address}
              onChange={(e) => setGarageData({ ...garageData, address: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              value={garageData.pincode}
              onChange={(e) => setGarageData({ ...garageData, pincode: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Services Offered</Label>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={garageData.services.includes(service.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setGarageData({
                          ...garageData,
                          services: [...garageData.services, service.id]
                        });
                      } else {
                        setGarageData({
                          ...garageData,
                          services: garageData.services.filter(id => id !== service.id)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={service.id}>{service.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={garageData.emergencyContact}
              onChange={(e) => setGarageData({ ...garageData, emergencyContact: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registering...' : 'Register Garage'}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default RegisterOwner;
