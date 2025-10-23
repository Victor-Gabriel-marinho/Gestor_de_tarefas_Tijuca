import { useCallback, useEffect, useState } from "react"
import { LabelService } from "../api/services/labelService"


type Tag = {
    id: string,
    Name: string,
    Color: string
}

export function useTagsTeam(idSelected:string){
    const [tagsTeam, setTagsTeam]= useState<Tag[]>([])
    const [error, setError]= useState<string | null>(null)

    const fetchTagsTeam = useCallback(async()=>{
        try {
            const response = await LabelService.Get_All_Label_Team(idSelected)
            setTagsTeam(response)
        } catch (error) {
            setError("erro ao buscar as tags")
        }
    },[idSelected])
    useEffect(()=>{
        if(idSelected)fetchTagsTeam()
    },[fetchTagsTeam])
    return {tagsTeam, fetchTagsTeam}
}