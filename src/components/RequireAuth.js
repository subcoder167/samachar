import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    // const { auth } = useAuth();
    const location = useLocation();
    const auth= useSelector(state=>state.login)
    return (
        auth?.user?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;