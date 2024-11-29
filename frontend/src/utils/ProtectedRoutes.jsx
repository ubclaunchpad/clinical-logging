import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoutes = () => {
  const { session } = useAuth();
  return session ? <Outlet /> : <Navigate to='/login' />;
}