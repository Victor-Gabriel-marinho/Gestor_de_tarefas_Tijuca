import api from "../api"
import type { CreateInviteDTO } from "../types/inviteTypes/CreateInviteDTO"
import type { ReturnaceptDTO } from "../types/inviteTypes/ReturnaceptDTO"



export const inviteService = {

    async Aceptinvite(token: string): Promise<ReturnaceptDTO> {
        const { data } = await api.post<ReturnaceptDTO>(`/email/accept/${token}`)
        return data
    },     

    async SendInvite(invite:CreateInviteDTO): Promise<{Menssage: string}> {
        const {data} = await api.post<{Menssage:string}>("/email/invites", invite)
        return data
    } 
}   
