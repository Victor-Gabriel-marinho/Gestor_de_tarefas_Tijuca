import { useEffect, useState } from "react";
import type { user_in_team } from "../api/types/User";
import { TeamService } from "../api/services/teamService";
import { useAuthStore } from "../store/Auth";
export function Get_usersInTeams(id: string) {
  const token = useAuthStore((state) => state.token);

  const [loading, Setloading] = useState<boolean>(false);
  const [users, Setusers] = useState<user_in_team[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetch_users = async () => {
      if (!token) return;
      Setloading(true);
      try {
        const response = await TeamService.Get_Users_in_team(id, token);
        Setloading(false)
        if (response) {
          Setusers(response);
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        Setloading(false)
      }
    };
    fetch_users();
  }, [id]);

  return { users, loading };
}
