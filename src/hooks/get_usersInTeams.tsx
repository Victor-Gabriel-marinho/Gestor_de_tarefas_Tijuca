import { useCallback, useEffect, useState } from "react";
import type { user_in_team } from "../api/types/User";
import { TeamService } from "../api/services/teamService";
import { useAuthStore } from "../store/Auth";

export function Get_usersInTeams(id: string) {
  const token = useAuthStore((state) => state.token);

  const [loading, Setloading] = useState<boolean>(false);
  const [users, Setusers] = useState<user_in_team[]>([]);

  const fetch_users = 
  useCallback(async () => {
    if (!token) return;
    Setloading(true);
    try {
      const response = await TeamService.Get_Users_in_team(id, token);
      Setloading(false);
      if (response) {
        Setusers(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      Setloading(false);
    }
  }, [id,token])

  useEffect(() => {
    fetch_users();
  }, [id, fetch_users]);

  return { users, loading, refetch: fetch_users };
}
