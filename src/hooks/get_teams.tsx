import { TeamService } from "../api/services/teamService";
import { useAuthStore } from "../store/Auth";
import { useEffect, useState } from "react";
import type { Team } from "../api/types/Team";

export default function Get_teams() {
  const Token = useAuthStore((state) => state.token);

  const [Teams, SetTeams] = useState<Team[]>([]);
  const [loading, Setloading] = useState<boolean>(false);
  const [first_team, Setfirst_team] = useState<Team>();

  useEffect(() => {
    if (!Token) return;
    Setloading(true);

    const fetch_Teams = async () => {
      try {
        const response = await TeamService.Get_Teams(Token);
        SetTeams(response);
        Setloading(false)
        Setfirst_team(response[0])
        
        return first_team

      } catch (error) {
        console.log(error);
      }
    };

    fetch_Teams();
  }, [Token]);

  return {Teams,loading, first_team}

}
