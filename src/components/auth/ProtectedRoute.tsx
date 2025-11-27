import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const role = localStorage.getItem("role"); // check saved role

  // ❌ If not logged in → send back to login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // ❌ If role is wrong → send back to login
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allowed → show the page
  return children;
};

export default ProtectedRoute;
