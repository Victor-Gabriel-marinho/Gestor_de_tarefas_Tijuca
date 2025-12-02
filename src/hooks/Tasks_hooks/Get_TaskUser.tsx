import { useCallback, useEffect, useState } from "react";
import { TaskService } from "../../api/services/TaskService";
import type { user_for_invite } from "../../api/types/UserTypes/User";

export function Get_Taskuser(id_task: string) {
  const [taskuser, Settaskuser] = useState<user_for_invite[]>([]);
  const [loading, Setloading] = useState<boolean>(false);

  const fetchTaskuser = useCallback(async () => {
    Setloading(true);

    try {
      const response = await TaskService.GetTaskUser(id_task);
      if (response) {
        Settaskuser(response);
      }
    } catch (error) {
      console.error("erro ao fazer requisição", error);
    } finally {
      Setloading(false);
    }
  }, [id_task]);

  useEffect(() => {
    fetchTaskuser();
  }, [fetchTaskuser]);

  return { taskuser, loading, refetchTaskuser: fetchTaskuser };
}
