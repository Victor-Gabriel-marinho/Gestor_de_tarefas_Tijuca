import { useCallback, useEffect, useState } from "react";
import { StatusService } from "../api/services/StatusService";
import type { StatusDTO } from "../api/types/StatusTypes/StatusDTO";

export default function Get_All_Status(id_team: string) {

    const [status, setstatus] = useState<StatusDTO[]>()
    const [loading, setloading] = useState<boolean>(false) 
    
    const fetch_all_status = useCallback(async () => {
        setloading(true)
        try{ 
            const response = await StatusService.GetStatusThisTeam(id_team)
            if (response) {
                const filter_status = response.filter(
                  (status) =>
                    status.Name !== "Pendente" &&
                    status.Name !== "Progresso" &&
                    status.Name !== "Concluido"
                );
                setstatus(filter_status)
            }
        }
        catch(error){
            console.log("erro ao buscar Status", error)
        }
        finally {
            setloading(false)
        }
    }, [id_team])
    
    useEffect(() => {
        fetch_all_status()
    }, [fetch_all_status])

    return {status, loading, refetch_Status: fetch_all_status}
}