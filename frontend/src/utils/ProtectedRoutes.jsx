import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
    // TODO: add authentication logic
    const auth = { tokenValid: true };
    return auth.tokenValid ? <Outlet /> : <Navigate to="/login" />;
}