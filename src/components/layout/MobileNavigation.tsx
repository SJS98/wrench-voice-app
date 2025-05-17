
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Bell, User, Car } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavigation = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Search', path: '/search', icon: <Search className="h-5 w-5" /> },
    { name: 'Services', path: '/services', icon: <Car className="h-5 w-5" /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 rounded-lg",
              activeTab === item.path
                ? "text-garage-purple"
                : "text-gray-500 hover:text-garage-blue"
            )}
            onClick={() => setActiveTab(item.path)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
