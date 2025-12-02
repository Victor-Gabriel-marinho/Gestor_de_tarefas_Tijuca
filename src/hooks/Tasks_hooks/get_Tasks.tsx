import { useCallback, useEffect, useState } from "react";
import { TaskService } from "../../api/services/TaskService";
import type { Task } from "../../api/types/TaskTypes/TaskDTO";
export function Get_Tasks(idTeam: string) {

    const [ tasks, Settasks ] = useState<Task[]>([])
    const [loading, Setloading ] = useState<boolean>(false);


    const fetchTasks = useCallback(async () => {

        Setloading(true);

        try {
            const response = await TaskService.GetTasksInThisTeam(idTeam)
            if (response) {
                Settasks(response)
            }
        }
        catch(error) {
            console.error("erro ao buscar tasks", error)
        }
        finally{ 
            Setloading(false)
        }

    }, [idTeam])

    useEffect(() => {
        fetchTasks(); 
    }, [fetchTasks])
    
    return {tasks,loading , refetchTasks: fetchTasks};
}