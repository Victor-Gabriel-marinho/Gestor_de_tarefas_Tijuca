import { useAuthStore } from "../store/Auth";
import type { Team } from "../api/types/Team";
import { useEffect, useState } from "react";
import { UserService } from "../api/services/userService";
import type { Role } from "../api/types/Role";

export function Get_userRole(team: Team) {
    const token = useAuthStore((state) => state.token)
    const [loadingRole, SetloadingRole] = useState<boolean>(false);
    const [userRole, setuserRole] = useState<Role>() 

    useEffect(() => {
        if (!token) return

    const fetch_userRole = async () => {
        SetloadingRole(true)
        try {
            const response = await UserService.get_userRole(token, team.id)
            SetloadingRole(false)
            if (response) {
                setuserRole(response)
            }
        }
        catch (err){
            SetloadingRole(false)
            console.error("erro ao fazer requisição", err);
        }
    };
    fetch_userRole();
    }, [team]);
    return {userRole, loadingRole}
}