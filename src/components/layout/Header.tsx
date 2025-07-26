
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
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack} 
              className="rounded-xl hover:bg-secondary/60 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MG</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {showSearch && (
            <Link to="/search">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl hover:bg-secondary/60 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>
          )}
          {showNotification && (
            <Link to="/notifications">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-xl hover:bg-secondary/60 transition-all duration-300"
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              </Button>
            </Link>
          )}
          {showSettings && (
            <Link to="/settings">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl hover:bg-secondary/60 transition-all duration-300"
              >
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
