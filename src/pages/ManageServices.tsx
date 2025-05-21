
import { useState } from 'react';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash } from 'lucide-react';

interface ServiceFormData {
  name: string;
  price: string;
  description: string;
}

const ManageServices = () => {
  const { garageData, addService, updateService, deleteService } = useUserAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    price: '',
    description: ''
  });
  const [editingService, setEditingService] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateService({
          id: editingService,
          name: formData.name,
          price: Number(formData.price),
          description: formData.description
        });
        setEditingService(null);
      } else {
        await addService({
          name: formData.name,
          price: Number(formData.price),
          description: formData.description
        });
      }
      setFormData({ name: '', price: '', description: '' });
      toast({
        title: 'Success',
        description: editingService ? 'Service updated' : 'Service added',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive'
      });
    }
  };

  return (
    <AppLayout title="Manage Services" showBackButton>
      <div className="container p-4">
        <Card>
          <CardHeader>
            <CardTitle>{editingService ? 'Edit Service' : 'Add New Service'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-4">
          {garageData?.services.map(service => (
            <Card key={service.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <p className="text-sm font-medium">₹{service.price}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingService(service.id);
                      setFormData({
                        name: service.name,
                        price: service.price.toString(),
                        description: service.description
                      });
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteService(service.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ManageServices;
