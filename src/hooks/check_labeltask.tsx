import { useState } from "react";
import { LabelService } from "../api/services/labelService";



export function useCheckTaskLabel(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    async function checkIfExist(idtask:string, idlabel: string): Promise<boolean | null> {
        setLoading(true)
        setError(null)
        try {
            setLoading(true);
            const exists = await LabelService.Check_LabelTask({idtask,idlabel})

            if(!exists) return null;
            return exists.isActive
            
        } catch (error) {
            console.error("Erro ao verificar taskLabel: ", error)
            setError("Erro ao Verificar TaskLabel")
            return false
        }finally{
            setLoading(false)
        }
    }
    return {checkIfExist, loading, error}


}