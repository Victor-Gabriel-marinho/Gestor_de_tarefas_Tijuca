import { useCallback, useEffect, useState } from "react";
import type { Task } from "../api/types/TaskTypes/TaskDTO";
import { TaskService } from "../api/services/TaskService";

export function Get_Tasks(idTeam: string) {
    const [loading, Setloading ] = useState<boolean>(false);
    const [tasks, SetTasks] = useState<Task[]>([])

    const fetchTasks = useCallback(async () => {

        Setloading(true);

        try {
            const response = await TaskService.GetTasksInThisTeam(idTeam)
            if (response) {
                SetTasks(response)
            }
        }
        catch(error) {
            console.log("erro ao fazer requisição", error)
        }
        finally{ 
            Setloading(false)
        }

    }, [idTeam])

    useEffect(() => {
        fetchTasks(); 
    }, [fetchTasks])
    
    return {tasks, loading, refetchTasks: fetchTasks};
}