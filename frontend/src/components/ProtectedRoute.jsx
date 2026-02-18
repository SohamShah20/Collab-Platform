import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authprovider";

const ProtectedRoute = () => {
    const { user } = useAuth();

    // Check if user is authenticated (either from context or localStorage)
    const isAuthenticated = user || localStorage.getItem("accessToken");

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
