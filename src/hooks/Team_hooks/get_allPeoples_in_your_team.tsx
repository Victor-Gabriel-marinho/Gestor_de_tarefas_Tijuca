import { useEffect, useState } from "react";
import { TeamService } from "../../api/services/teamService";
import type { user_in_team } from "../../api/types/UserTypes/User";

export default function Get_allPeoples_in_your_teams() {
  const [loading, Setloading] = useState<boolean>(false);
  const [users, setusers] = useState<user_in_team[]>([]);

  useEffect(() => {
    Setloading(true);

    const fetch_peoples_in_all_teams = async () => {
      try {
        const response = await TeamService.Get_All_users_in_your_team();
        if (response) {
          setusers(response);
        }
      } catch (error) {
        console.error(error);
      }
      finally{
        Setloading(false)
      }
    };

    fetch_peoples_in_all_teams();
  }, []);

  return { loading, users };
}
