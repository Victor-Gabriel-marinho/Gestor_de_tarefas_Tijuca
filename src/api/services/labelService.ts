import api from "../api";
import type { LabelDTO } from "../types/LabelTypes/LabelDTO";
import type { Create_LabelDTO } from "../types/LabelTypes/CreateLabelDTO"; 
export const LabelService = {


    async Create_Label(Label: Create_LabelDTO): Promise<LabelDTO>{
        const {data} = await api.post<LabelDTO>("/label/create", Label)
        return data;
    },
    
    async Get_All_Label_Tasks(id_task: string): Promise<{Name: string, Color: string, id: string}[]> {
        const { data } = await api.get<{Name: string, Color: string, id:string}[]>(`label/getlabeltask/${id_task}`);
        return data;
    },
    async Get_All_Label_Team(idteam: string): Promise<{Name: string, Color: string , id:string}[]>{
        const {data} = await api.get<{Name: string, Color: string, id:string}[]>(`all-labels-team/${idteam}`)
        return data;
    }
}