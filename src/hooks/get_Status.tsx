import { useCallback, useState, useEffect } from "react";
import type { StatusDTO } from "../api/types/StatusTypes/StatusDTO";
import { StatusService } from "../api/services/StatusService";


export function Get_status(id_team: string) {
  const [loading, Setloading] = useState<boolean>(false);
  const [status, Setstatus] = useState<StatusDTO[]>();

  const fetch_Status = useCallback(async () => {
    Setloading(true)

    try{
        const response = await StatusService.GetStatusThisTeam(id_team)
        if (response) {
            Setstatus(response)
        }
    }   
    catch (error){
        console.log("erro ao buscar Status", error)
    }
    finally{
        Setloading(false)
    }
  },[]);

  useEffect(() => {
    fetch_Status()
  }, [fetch_Status])

  return {status, loading, refetchstatus: fetch_Status}
}
