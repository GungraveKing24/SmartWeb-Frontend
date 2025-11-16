import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center mt-10">Cargando...</div>;
    
    if (!user) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user.role.toLowerCase())) return <Navigate to="/" />;

    return children;
};