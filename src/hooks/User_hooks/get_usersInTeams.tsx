import { useCallback, useEffect, useState } from "react";
import type { user_in_team } from "../../api/types/UserTypes/User";
import { TeamService } from "../../api/services/teamService";

export function Get_usersInTeams(id: string) {

  const [loading, Setloading] = useState<boolean>(false);
  const [users, Setusers] = useState<user_in_team[]>([]);

  const fetch_users = 
  useCallback(async () => {
    Setloading(true);
    try {
      const response = await TeamService.Get_Users_in_team(id);
      Setloading(false);
      if (response) {
        Setusers(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      Setloading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch_users();
  }, [id, fetch_users]);

  return { users, loading, refetch: fetch_users };
}
