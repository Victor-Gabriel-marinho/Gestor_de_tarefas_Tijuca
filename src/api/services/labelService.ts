import api from "../api";
import type { LabelDTO } from "../types/LabelTypes/LabelDTO";
import type { Create_LabelDTO } from "../types/LabelTypes/CreateLabelDTO"; 
import type { AddLAbelDTO } from "../types/LabelTypes/AddLabelDTO";
export const LabelService = {


    async Create_Label(Label: Create_LabelDTO): Promise<LabelDTO>{
        const {data} = await api.post<LabelDTO>("/label/create", Label)
        return data;
    },
    
    async Get_All_Label_Tasks(id_task: string): Promise<{Name: string, Color: string, id: string, isActive: boolean}[]> {
        const { data } = await api.get<{Name: string, Color: string, id:string, isActive: boolean}[]>(`label/getlabeltask/${id_task}`);
        return data;
    },
    async Get_All_Label_Team(idteam: string): Promise<{Name: string, Color: string , id:string, isActive: boolean}[]>{
        const {data} = await api.get<{Name: string, Color: string, id:string, isActive: boolean}[]>(`label/all-labels-team/${idteam}`)
        return data;
    },
    async Add_New_Label(NewLabel:AddLAbelDTO): Promise<LabelDTO>{
        const {data} = await api.post<LabelDTO>(`label/addlabel/${NewLabel.idtask}/${NewLabel.idlabel}`)
        return data
    },
    async Desactivate_Label(idlabel: string): Promise<{menssage:string}>{
        const {data} = await api.patch<{menssage:string}>(`label/desactivate/${idlabel}`)
        return data
    },
    async Activate_LabelTask(Label: AddLAbelDTO): Promise<{isActive: boolean}>{
        const{data} = await api.patch<{isActive: boolean}>(`label/activate/${Label.idtask}/${Label.idlabel}`)
        return data
    },
    async Remove_LabelTask(Label: AddLAbelDTO): Promise<{isActive: boolean}>{
        const{data} = await api.patch<{isActive: boolean}>(`label/remove/${Label.idtask}/${Label.idlabel}`)
        return data
    },
    async Check_LabelTask(Label: AddLAbelDTO): Promise<{isActive: boolean | null}>{
        const{data} = await api.get<{isActive:boolean}>(`label/alreadyexist/${Label.idtask}/${Label.idlabel}`)
        return data
    }
}