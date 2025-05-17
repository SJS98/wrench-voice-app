
import { Link } from 'react-router-dom';
import { Bell, Search, Settings } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Back</span>
            </Button>
          )}
          <h1 className="text-xl font-bold text-garage-dark">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>
          )}
          {showNotification && (
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-garage-purple"></span>
              </Button>
            </Link>
          )}
          {showSettings && (
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
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
