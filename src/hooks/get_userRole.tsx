import type { Team } from "../api/types/TeamTypes/Team";
import { useEffect, useState } from "react";
import { UserService } from "../api/services/userService";
import type { Role } from "../api/types/UserTypes/Role";

export function Get_userRole(team: Team) {
  const [loadingRole, SetloadingRole] = useState<boolean>(false);
  const [userRole, setuserRole] = useState<Role>();

  useEffect(() => {
    const fetch_userRole = async () => {
      SetloadingRole(true);
      try {
        const response = await UserService.get_userRole(team.id);
        SetloadingRole(false);
        if (response) {
          setuserRole(response);
        }
      } catch (err) {
        SetloadingRole(false);
        console.error("erro ao fazer requisição", err);
      }
    };
    fetch_userRole();
  }, [team.id]);
  return { userRole, loadingRole };
}
