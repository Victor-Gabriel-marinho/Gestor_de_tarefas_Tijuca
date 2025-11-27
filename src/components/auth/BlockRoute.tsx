import { Navigate, Outlet, useLocation } from "react-router-dom"; 
import { useAuthStore, UseinviteStore } from "../../store/Auth"; 

export function BlockRouter() {
  const token = useAuthStore((state) => state.token);

  const location = useLocation();
  const invite = UseinviteStore((state) => state.token);
  
  if (token) {
    if (
      invite &&
      (location.pathname === "/entrar" || location.pathname === "/cadastro")
    ) {
      return <Navigate to={invite} replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}