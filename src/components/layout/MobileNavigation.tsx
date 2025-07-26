
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-blue-500 shadow-lg z-50">
      <div className="grid grid-cols-5 gap-1 p-2">
        <Link
          to="/"
          className={`nav-item ${
            isActive('/') ? 'nav-item-active' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
            isActive('/') ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}>
            <Home className="h-7 w-7" />
          </div>
          <span className="text-sm font-bold">Home</span>
        </Link>

        <Link
          to="/services"
          className={`nav-item ${
            isActive('/services') ? 'nav-item-active' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
            isActive('/services') ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}>
            <Wrench className="h-7 w-7" />
          </div>
          <span className="text-sm font-bold">Services</span>
        </Link>

        <Link
          to="/sos"
          className={`nav-item ${
            isActive('/sos') ? 'nav-item-active' : 'text-gray-600 hover:text-red-600'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
            isActive('/sos') ? 'bg-red-500 text-white' : 'bg-red-100'
          }`}>
            <Shield className="h-7 w-7" />
          </div>
          <span className="text-sm font-bold text-red-600">SOS</span>
        </Link>

        <Link
          to="/spare-parts"
          className={`nav-item ${
            isActive('/spare-parts') ? 'nav-item-active' : 'text-gray-600 hover:text-green-600'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
            isActive('/spare-parts') ? 'bg-green-500 text-white' : 'bg-gray-100'
          }`}>
            <ShoppingCart className="h-7 w-7" />
          </div>
          <span className="text-sm font-bold">Parts</span>
        </Link>

        <Link
          to="/profile"
          className={`nav-item ${
            isActive('/profile') ? 'nav-item-active' : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
            isActive('/profile') ? 'bg-purple-500 text-white' : 'bg-gray-100'
          }`}>
            <User className="h-7 w-7" />
          </div>
          <span className="text-sm font-bold">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
