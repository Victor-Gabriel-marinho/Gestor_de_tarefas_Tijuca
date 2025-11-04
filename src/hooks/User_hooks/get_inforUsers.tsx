import { useEffect, useState, useCallback } from "react";
import type { user_for_invite } from "../../api/types/UserTypes/User";
import { useAuthStore } from "../../store/Auth";
import { decodeJWT } from "../../utils/decodeJWT";
import { UserService } from "../../api/services/userService";
import { TeamService } from "../../api/services/teamService";
import { TaskService } from "../../api/services/TaskService";

export function useInforUsers() {
  const [user, setUser] = useState<user_for_invite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [teamCount, setTeamCount] = useState<number>(0);
  const [taskCount, setTaskCount] = useState<number>(0);

  const token = useAuthStore((state) => state.token);

  // Função responsável por buscar informações do usuário
  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { sub } = decodeJWT(token) || {};

      if (!sub) {
        setUser(null);
        return;
      }

      const response = await UserService.get_users_by_id([sub]);
      const currentUser = response?.[0] || null;
      setUser(currentUser);
      if (currentUser) {
        const [task, teams] = await Promise.all([
          TaskService.GetTasksByUser(),
          TeamService.Get_Teams(),
        ]);

        setTaskCount(task.length);
        setTeamCount(teams.length);
      } else {
        setTaskCount(0);
        setTeamCount(0);
      }
    } catch (err) {
      console.error("Erro ao buscar informações do usuário:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Executa automaticamente quando o token muda
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    teamCount,
    taskCount,
    loading,
    error,
    refetch: fetchUser,
  };
}
