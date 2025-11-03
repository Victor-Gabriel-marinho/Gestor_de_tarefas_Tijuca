import { useCallback, useEffect, useState } from "react";
import { StatusService } from "../api/services/StatusService";
import type { StatusDTO } from "../api/types/StatusTypes/StatusDTO";

export default function Get_Status_Default() {

    const [GetStatusDefault, setstatusDefault] = useState<StatusDTO[]>()
    const [loading, setloading] = useState<boolean>(false) 
    
    const fetch_status_default = useCallback(async () => {
        setloading(true)
        try{ 
            const response = await StatusService.GetStatusDefault()
            if (response) {
            setstatusDefault(response)
           }
        }
        catch(error){
            console.log("erro ao buscar Status", error)
        }
        finally {
            setloading(false)
        }
    }, [])
    
    useEffect(() => {
        fetch_status_default()
    }, [fetch_status_default])

    return {GetStatusDefault, loading, refetch_Status: fetch_status_default}
}