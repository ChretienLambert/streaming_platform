import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loader from './Loader';  // Optional: for loading state

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show loader while checking auth
  if (loading) {
    return <Loader fullScreen />;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow access to child routes (admin pages)
  return <Outlet />;
};

export default ProtectedRoute;