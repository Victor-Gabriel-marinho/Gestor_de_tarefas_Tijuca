import api from "../api"
import type { CreateTaskUserDTO } from "../types/TaskTypes/CreateTaskUserDTO"
import type { CreateTaskDTO, Task } from "../types/TaskTypes/TaskDTO"
import type { user_for_invite } from "../types/UserTypes/User"

export const TaskService = {
    //Cria uma Task
    async CreateTask(Task: CreateTaskDTO): Promise<Task> { 
        const {data} = await api.post<Task>("/tasks/Create_task", Task)
        return data
    },

    async GetTasksInThisTeam(idTeam: string): Promise<Task[]> {
        const { data } = await api.get<Task[]>(
          `/tasks/Get_all_tasks_in_this_team/${idTeam}`
        );
        return data
    },

    async GetById(idTask: string): Promise<Task> {
        const {data} = await api.get<Task>(`/tasks/GetById/${idTask}`)
        
        return data
    },

    async DeleteTask(idTask: string){
        const {data} = await api.delete<{menssage:string}>(`/tasks/Delete_Task/${idTask}`)

        return data 
    },

    async Delettaskuser(id_task: string, id_user: string): Promise<{menssage: string}> {
        const {data} = await api.patch<{menssage: string}>(`/tasks/InactiveTaskUser/${id_task}/${id_user}`)
        return data
    },

    async EditTask(idTask: string, taskEdited: CreateTaskDTO): Promise<Task> {
        const {data} = await api.patch<Task>(`tasks/Edit_task/${idTask}`, taskEdited)

        return data
    },

    async CreateTaskUser(TaskUser: CreateTaskUserDTO[]): Promise<{menssage:string}> {
        const {data} = await api.post<{menssage: string}>("/tasks/Create_taskUser", TaskUser)
        return data 
    },

    async GetTasksByUser(): Promise<Task[]> {
        const {data} = await api.get<Task[]>(`/tasks/TasksByUser`)
        return data
    },
    
    async GetUsersNotInTask(idTask: string, idTeam: string) {
        const {data} = await api.get(`/tasks/GetUsersNotInTask/${idTask}/${idTeam}`)
        return data 
    },

    async GetTaskUser(id_task: string): Promise<user_for_invite[]> {
        const {data} = await api.get<user_for_invite[]>(`/tasks/GetUsersTask/${id_task}`)
        return data
    },

    async AlterStatus(idtask: string, NewTaskStatus: string): Promise<Task> {
        const { data } = await api.patch<Task>(`/tasks/EditTaskStatus/${idtask}`, {NewTaskStatus});
        return data
    }
}
