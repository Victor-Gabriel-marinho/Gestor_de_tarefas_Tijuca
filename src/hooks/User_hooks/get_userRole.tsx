import { useEffect, useState } from "react";
import { UserService } from "../../api/services/userService";
import type { Role } from "../../api/types/UserTypes/Role";

export function Get_userRole(id_team: string) {
  const [loadingRole, SetloadingRole] = useState<boolean>(false);
  const [userRole, setuserRole] = useState<Role>();

  useEffect(() => {
    const fetch_userRole = async () => {
      SetloadingRole(true);
      try {
        const response = await UserService.get_userRole(id_team);
        SetloadingRole(false);
        if (response) {
          setuserRole(response);
        }
      } catch (err: any) {
        SetloadingRole(false);
        console.log('id do time: ', id_team)
        console.error("erro ao fazer requisição", err?.response ?? err);
      }
    };
    fetch_userRole();
  }, [id_team]);
  return { userRole, loadingRole };
}
