import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { getAuth } from "../functions/index";

const RequireAuth = ({ allowedRoles }) => {
    // const { auth } = useAuth();
    const location = useLocation();
    const auth = getAuth();
    return (
        new Array(auth?.roles)?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : JSON.parse(auth?.token)
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;