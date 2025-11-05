import { Navigate, Outlet, useLocation } from "react-router-dom"; 
import { useAuthStore, UseinviteStore } from "../../store/Auth"; 

export function BlockRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());  
  const location = useLocation(); 
  const hasPendingInvite = UseinviteStore((state) => state.token);   
  
  if (isAuthenticated) {
      if (hasPendingInvite && location.pathname === '/Entrar') {
          return <Navigate to= {hasPendingInvite} replace />;
      }
      
      return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}