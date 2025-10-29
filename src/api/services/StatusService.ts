import api from "../api"
import type { StatusDTO } from "../types/StatusTypes/StatusDTO"


export const StatusService = {
    async GetStatusThisTeam(id_team: string): Promise<StatusDTO[]> {
        const {data} = await api.get<StatusDTO[]>(`/status/Getstatus/${id_team}`)
        return data
    },
    async CreateStatus(Name: string): Promise<StatusDTO> {
        const {data}= await api.post<StatusDTO>("/status/CreateStatus", {Name})
        return data
    }
}