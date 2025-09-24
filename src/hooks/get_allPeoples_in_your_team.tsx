import { useEffect, useState } from "react";
import { useAuthStore } from "../store/Auth";
import { TeamService } from "../api/services/teamService";
import type { user_in_team } from "../api/types/User";

export default function Get_allPeoples_in_your_teams () {
    const token = useAuthStore((state) => state.token)
    const [loading, Setloading] = useState<boolean>(false);
    const [users, setusers] = useState<user_in_team[]>([])


    useEffect(() => {
        if (!token) return
        Setloading(true)

        const fetch_peoples_in_all_teams = async () => {
            try {
                const response = await TeamService.Get_All_users_in_your_team(token)
                if (response) {
                    Setloading(false)
                    setusers(response)
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        fetch_peoples_in_all_teams()
    }, []) 

    return {loading, users}
}