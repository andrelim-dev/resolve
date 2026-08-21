import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
