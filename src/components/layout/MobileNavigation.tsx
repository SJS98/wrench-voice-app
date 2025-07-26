
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Settings,
  Wrench,
  Shield,
  User,
  Car,
  ShoppingCart,
  Calendar
} from 'lucide-react';

const MobileNavigation = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border z-50">
      <div className="grid grid-cols-5 gap-1 px-2 py-1">
        <Link
          to="/"
          className={`nav-item ${
            isActive('/') ? 'nav-item-active' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>

        <Link
          to="/services"
          className={`nav-item ${
            isActive('/services') ? 'nav-item-active' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Wrench className="h-5 w-5" />
          <span className="text-xs mt-1 font-medium">Services</span>
        </Link>

        <Link
          to="/sos"
          className={`nav-item ${
            isActive('/sos') ? 'nav-item-active' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Shield className="h-5 w-5" />
          <span className="text-xs mt-1 font-medium">SOS</span>
        </Link>

        <Link
          to="/spare-parts"
          className={`nav-item ${
            isActive('/spare-parts') ? 'nav-item-active' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs mt-1 font-medium">Parts</span>
        </Link>

        <Link
          to="/profile"
          className={`nav-item ${
            isActive('/profile') ? 'nav-item-active' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1 font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
