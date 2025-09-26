import { TeamService } from "../api/services/teamService";
import { useAuthStore } from "../store/Auth";
import { useCallback, useEffect, useState } from "react";
import type { Team } from "../api/types/Team";

export default function Get_teams() {
  const Token = useAuthStore((state) => state.token);

  const [Teams, SetTeams] = useState<Team[]>([]);
  const [loading, Setloading] = useState<boolean>(false);
  const [first_team, Setfirst_team] = useState<Team>();

  
  const fetch_Teams = 
  useCallback( async () => {
    if (!Token) return;
    Setloading(true);
    try {
      const response = await TeamService.Get_Teams(Token);
      SetTeams(response);
      Setloading(false)
      Setfirst_team(response[0])
      
      return first_team

    } catch (error) {
      console.log(error);
    }
  }, [Token])

  useEffect(() => {
    fetch_Teams();
  }, [Token, fetch_Teams]);

  return {Teams,loading, first_team, refetch_teams:fetch_Teams}

}
