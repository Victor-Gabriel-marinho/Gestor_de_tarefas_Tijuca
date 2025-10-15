import api from "../api"
import type { CreateTaskUserDTO } from "../types/TaskTypes/CreateTaskUserDTO"
import type { CreateTaskDTO, Task } from "../types/TaskTypes/TaskDTO"

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

    async DeleteTask(idTask: string){
        const {data} = await api.delete<{menssage:string}>(`/tasks/Delete_Task/${idTask}`)

        return data 
    },

    async EditTask(idTask: string, taskEdited: CreateTaskDTO): Promise<Task> {
        const {data} = await api.patch<Task>(`tasks/Edit_task/${idTask}`, taskEdited)

        return data
    },

    async CreateTaskUser(TaskUser: CreateTaskUserDTO[]): Promise<{menssage:string}> {
        const {data} = await api.post<{menssage: string}>("/tasks/Create_taskUser", TaskUser)
        return data 
    }
}
