
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";

// function ProtectedRoute() {
//   const { authState, isInitializing } = useAuth();

//   if (isInitializing) {
//     return <div>Checking authentication...</div>;
//   }

//   if (!authState.token || !authState.user) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }

// export default ProtectedRoute;



import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: ("Admin" | "Customer")[];
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { authState, isInitializing } = useAuth();

  if (isInitializing) {
    return <div>Checking authentication...</div>;
  }

  if (!authState.token || !authState.user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(authState.user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
