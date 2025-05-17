
import { Link } from "react-router-dom";
import { 
  User, 
  Car, 
  Clock, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock user data
const user = {
  name: "Rahul Singh",
  email: "rahul.singh@example.com",
  phone: "+91 98765 43210",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

const ProfilePage = () => {
  const menuItems = [
    {
      title: "My Vehicles",
      icon: <Car className="h-5 w-5" />,
      color: "bg-blue-100",
      textColor: "text-blue-600",
      path: "/my-vehicles"
    },
    {
      title: "Service History",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-purple-100",
      textColor: "text-purple-600",
      path: "/history"
    },
    {
      title: "Payment Methods",
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-green-100",
      textColor: "text-green-600",
      path: "/payment-methods"
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      color: "bg-yellow-100",
      textColor: "text-yellow-600",
      path: "/notifications"
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      color: "bg-gray-100",
      textColor: "text-gray-600",
      path: "/settings"
    },
    {
      title: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
      color: "bg-indigo-100",
      textColor: "text-indigo-600",
      path: "/support"
    }
  ];

  return (
    <AppLayout title="Profile" showSettings={true}>
      <div className="page-container">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.phone}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mb-6 border-garage-purple text-garage-purple"
        >
          <User className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
        
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-garage-purple/30 hover:bg-garage-purple/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${item.color}`}>
                    <span className={item.textColor}>{item.icon}</span>
                  </div>
                  <span className="font-medium">{item.title}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8">
          <Button 
            variant="ghost" 
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            App Version 1.0.0
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
