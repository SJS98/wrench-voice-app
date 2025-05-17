
import { ReactNode } from 'react';
import Header from './Header';
import MobileNavigation from './MobileNavigation';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  showNavigation?: boolean;
  showNotification?: boolean;
  showSettings?: boolean;
  showSearch?: boolean;
  onBack?: () => void;
}

const AppLayout = ({
  children,
  title,
  showBackButton = false,
  showNavigation = true,
  showNotification = true,
  showSettings = false,
  showSearch = true,
  onBack,
}: AppLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        title={title}
        showBackButton={showBackButton}
        showNotification={showNotification}
        showSettings={showSettings}
        showSearch={showSearch}
        onBack={onBack}
      />
      <main className="flex-1 pb-16">
        {children}
      </main>
      {showNavigation && <MobileNavigation />}
    </div>
  );
};

export default AppLayout;
