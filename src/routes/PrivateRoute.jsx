// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/layout/PageWrapper";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = (user.role || "").toLowerCase().trim();
  const normalizedAllowedRoles = (allowedRoles || []).map((r) => r.toLowerCase().trim());

  if (
    allowedRoles &&
    userRole !== "superadmin" &&
    userRole !== "super admin" &&
    !normalizedAllowedRoles.includes(userRole)
  ) {
    console.warn(
      `[PrivateRoute] Access denied. user.role = "${user.role}", allowedRoles = [${allowedRoles}]`
    );
    return <Navigate to="/dashboard" replace />;
  }

  return <PageWrapper>{children}</PageWrapper>;
}