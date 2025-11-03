import { TaskService } from "../../../api/services/TaskService"
import type { user_for_invite } from "../../../api/types/UserTypes/User"

type TaskUserProps = {
    id_task: string,
    refetchs: () => void,
    taskusers: user_for_invite[]
}

export const TaskUser = ({taskusers, id_task, refetchs}:TaskUserProps) => {

  const Remove_Taskuser = async (id_task: string, id_user: string) => {
    try {
      const response = await TaskService.Delettaskuser(id_task, id_user);
      if (response) {
        refetchs()
      }
    } catch (error) {
      console.log("Erro ao deletar um taskUser", error);
    }
  };

    return (
      <div className="flex flex-row gap-3 cursor-pointer">
        {taskusers.map((taskuser) => (
          <div
            className="bg-[#1F2937] p-2 rounded-xl"
            onClick={() => {Remove_Taskuser(id_task, taskuser.id)}}
          >
            {taskuser.Name}
          </div>
        ))}
      </div>
    );
}