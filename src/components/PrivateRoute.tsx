import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/Auth";

export function PrivateRoute() {
  const token = useAuthStore((state) => state.token);
  
  const isAuthenticated = !!token

  return isAuthenticated ? <Outlet /> : <Navigate to="/Entrar" replace />;
}
