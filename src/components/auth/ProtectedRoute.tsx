
import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('owner' | 'customer')[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useUserAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
