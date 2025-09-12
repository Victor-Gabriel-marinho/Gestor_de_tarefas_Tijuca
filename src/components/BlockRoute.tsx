import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/Auth";

export function BlockRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return isAuthenticated ? <Navigate to="/quadros" replace /> : <Outlet />;
}
