import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoutes = () => {
    // TODO: implement authentication logic
    const auth = { isTokenValid: true };
    return auth.isTokenValid ? <Outlet /> : <Navigate to='/login' />;
}