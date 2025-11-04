import { useCallback } from "react";
import { useEffect, useState } from "react";
import type{ UserWithNotInTask as User} from "../../api/types/UserTypes/User"
import { TaskService } from "../../api/services/TaskService";

export function get_UsersWithNotInTask(idTask: string, idTeam: string) {
    const [loading, Setloading ] = useState<boolean>(false);
    const [usersWithNotInTask, SetUsersWithNotInTask] = useState<User[]>([])

  const fetchUsersWithNotInTask = useCallback(async () => {

        Setloading(true);

        try{
            const response = await TaskService.GetUsersNotInTask(idTask,idTeam)
            if (response){
                SetUsersWithNotInTask(response)
            }
        }catch(error){
            console.log("erro ao fazer requisição", error)
        } finally{
            Setloading(false)
        }
  }, [idTask, idTeam])
  useEffect(() => {
    fetchUsersWithNotInTask();
  }, [fetchUsersWithNotInTask])

  return {usersWithNotInTask, loading, refetchUsersWithNotInTask: fetchUsersWithNotInTask};
}