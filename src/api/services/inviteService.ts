import api from "../api"
import type { ReturnaceptDTO } from "../types/inviteTypes/ReturnaceptDTO"



export const inviteService = {

    async Aceptinvite(token: string): Promise<ReturnaceptDTO> {
        const { data } = await api.post<ReturnaceptDTO>(`/email/accept/${token}`)
        return data
    }       
}   
