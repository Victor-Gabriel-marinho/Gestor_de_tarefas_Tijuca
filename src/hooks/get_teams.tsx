import { TeamService } from "../api/services/teamService";
import { useCallback, useEffect, useState } from "react";
import type { Team } from "../api/types/TeamTypes/Team";

export default function Get_teams() {

  const [Teams, SetTeams] = useState<Team[]>([]);
  const [loading, Setloading] = useState<boolean>(false);
  const [first_team, Setfirst_team] = useState<Team>();

  const fetch_Teams = useCallback(async () => {
    Setloading(true);
    try {
      const response = await TeamService.Get_Teams();
      SetTeams(response);
      Setfirst_team(response[0]);

      return first_team;
    } catch (error) {
      console.log(error);
    }
    finally{
      Setloading(false)
    }
  }, []);

  useEffect(() => {
    fetch_Teams();
  }, [fetch_Teams]);

  return { Teams, loading, first_team, refetch_teams: fetch_Teams };
}
