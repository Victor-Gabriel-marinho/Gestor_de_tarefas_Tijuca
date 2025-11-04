
import { useCallback, useEffect, useState } from "react";
import { LabelService } from "../../api/services/labelService";

type Tag = {
    id: string,
    Name: string,
    Color: string
    isActive: boolean
}

export function useTags(idSelected: string){
    const [tags, setTags] = useState<Tag[]>([])
    const [error, setError]= useState<string | null>(null)

    const fetchTags = useCallback(async()=> {
        try {
            const response = await LabelService.Get_All_Label_Tasks(idSelected)
            setTags(response)
        } catch (err) {
            setError("erro ao buscar as tags")        
        }
    }, [idSelected])
    useEffect(()=>{
        if(idSelected)fetchTags()
    }, [fetchTags])

    return{tags, fetchTags}
}
