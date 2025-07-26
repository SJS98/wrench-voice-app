
import { Link } from 'react-router-dom';
import { Bell, Search, Settings, ArrowLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showNotification?: boolean;
  showSettings?: boolean;
  showSearch?: boolean;
  onBack?: () => void;
}

const Header = ({
  title = 'Mr.GarageWala',
  showBackButton = false,
  showNotification = true,
  showSettings = false,
  showSearch = true,
  onBack
}: HeaderProps) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-blue-500 shadow-sm">
      <div className="container flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack} 
              className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🔧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-600">Professional Auto Care</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <Link to="/search">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Search className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>
          )}
          {showNotification && (
            <Link to="/notifications">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Bell className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">3</span>
              </Button>
            </Link>
          )}
          {showSettings && (
            <Link to="/settings">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Settings className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
