import { useCallback, useState, useEffect } from "react";
import type { StatusDTO } from "../../api/types/StatusTypes/StatusDTO";
import { StatusService } from "../../api/services/StatusService";


export function Get_status(id_status: string) {
  
  const [loading, Setloading] = useState<boolean>(false);
  const [arraystatus, Setarraystatus] = useState<StatusDTO[]>();

  const fetch_Status = useCallback(async () => {
    Setloading(true)

    try{
        const response = await StatusService.GetStatusByID(id_status)
        if (response) {          
            Setarraystatus(response)
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

  return {arraystatus, loading, refetchstatus: fetch_Status}
}
