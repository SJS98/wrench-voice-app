
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserAuth } from '@/contexts/UserAuthContext';
import AppLayout from '@/components/layout/AppLayout';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useUserAuth();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast({
        title: 'Success',
        description: 'You have been logged in',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to login. Please check your credentials.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Login" showBackButton showNavigation={false}>
      <div className="flex flex-col items-center justify-center p-4 h-full">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-garage-purple">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-garage-purple hover:bg-garage-purple/90" 
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-garage-purple font-medium">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </Form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Apple</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
