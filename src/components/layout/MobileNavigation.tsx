
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Search,
  Wrench,
  AlertTriangle,
  User,
  Car,
  ShoppingBag,
  Clipboard
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
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white z-10">
      <div className="grid grid-cols-5 gap-1">
        <Link
          to="/"
          className={`flex flex-col items-center py-2 ${
            isActive('/') ? 'text-garage-purple' : 'text-gray-500'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/services"
          className={`flex flex-col items-center py-2 ${
            isActive('/services') ? 'text-garage-purple' : 'text-gray-500'
          }`}
        >
          <Wrench className="h-5 w-5" />
          <span className="text-xs mt-1">Services</span>
        </Link>

        <Link
          to="/sos"
          className={`flex flex-col items-center py-2 ${
            isActive('/sos') ? 'text-garage-purple' : 'text-gray-500'
          }`}
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="text-xs mt-1">SOS</span>
        </Link>

        <Link
          to="/spare-parts"
          className={`flex flex-col items-center py-2 ${
            isActive('/spare-parts') ? 'text-garage-purple' : 'text-gray-500'
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs mt-1">Parts</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center py-2 ${
            isActive('/profile') ? 'text-garage-purple' : 'text-gray-500'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
