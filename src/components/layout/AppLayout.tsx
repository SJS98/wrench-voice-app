
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
    <div className="min-h-screen bg-gray-50">
      <Header
        title={title}
        showBackButton={showBackButton}
        showNotification={showNotification}
        showSettings={showSettings}
        showSearch={showSearch}
        onBack={onBack}
      />
      <main className="pb-20">
        <div className="page-container-clean">
          {children}
        </div>
      </main>
      {showNavigation && <MobileNavigation />}
    </div>
  );
};

export default AppLayout;
