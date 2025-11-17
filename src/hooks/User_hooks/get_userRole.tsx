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
        console.log(1);
        const response = await UserService.get_userRole(id_team);
        console.log(2);
        SetloadingRole(false);
        console.log(3);
        if (response) {
        console.log(4);
          setuserRole(response);
        console.log(5);

        }
      } catch (err: any) {
        SetloadingRole(false);
        console.log(id_team)
        console.error("erro ao fazer requisição", err?.response ?? err);
      }
    };
    fetch_userRole();
  }, [id_team]);
  return { userRole, loadingRole };
}
