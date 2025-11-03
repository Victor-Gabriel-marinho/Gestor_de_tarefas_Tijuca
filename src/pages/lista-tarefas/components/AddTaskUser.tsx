import { useState } from "react";
import type { UserWithNotInTask } from "../../../api/types/UserTypes/User";
import { Loading_anim } from "../../../components/commons/loading";
import { useParams } from "react-router-dom";
import { TaskService } from "../../../api/services/TaskService";
import { get_UsersWithNotInTask } from "../../../hooks/get_UsersWithNotInTask";

type Modal_taskUserProps = {
    id_task: string;
    refetch_taskuser: () => void;
    closeModal: () => void
}

export function Modal_taskUser({id_task, refetch_taskuser, closeModal}:Modal_taskUserProps) {
    const {id} = useParams()

    const [selectedUser, SetselectedUser] = useState<UserWithNotInTask[]>([])

      function selectUser(user: UserWithNotInTask) {
        SetselectedUser((prev) => {
         if (prev.some((u) => u.id === user.id)) {
          return prev.filter((u) => u.id !== user.id)
         }
         return [...prev, user]
        });
    }

    const CreateUserTask = async () => {
        const taskUser = selectedUser.map((user) => ({
            id_user: user.id,
            id_task: id_task
        }))
        try {
            const response = await TaskService.CreateTaskUser(taskUser)
            if(response) {
                refetchUsersWithNotInTask()
                refetch_taskuser()
                closeModal()
            }

            SetselectedUser([])
        }catch (error) {
            console.log(error)
        }
    }

    const {usersWithNotInTask, loading, refetchUsersWithNotInTask} = get_UsersWithNotInTask(id_task, id ?? "")
    

    return (
      <div className="w-[280px] h-[240px] flex flex-col text-center items-center justify-center bg-[#251F1F] mr-5 rounded-[10px] shadow-2xl shadow-[#3b3232]">
        {loading ?
        < Loading_anim/>
        : ( 
        <div className="h-full w-full p-5 flex items-center justify-center flex-col gap-3">
            <h2 className="text-white font-semibold text-lg">Atribuir tarefa</h2>
            <div className="w-full h-full flex flex-col gap-2 max-h-[241px]">
             {usersWithNotInTask.map((user) => { 
                const isSelected = selectedUser.some((u) => u.id === user.id)
                
                return (
                  <div
                    key={user.id}
                    id={user.id}
                    className={` text-white rounded-[5px] hover:scale-110 cursor-pointer p-1 ${
                      isSelected
                        ? "bg-[#1F2937] hover:bg-[#1F2947] font-semibold  "
                        : "bg-zinc-950 hover:bg-zinc-800 "
                    }`}
                    onClick={() => selectUser(user)}
                  >
                    {user.Name}
                  </div>
                );})}
            </div>
            <button className="bg-green-500 w-full text-white rounded-[5px] cursor-pointer hover:scale-110 hover:bg-green-400 p-2" onClick={CreateUserTask}>Atribuir</button>
        </div>
    )}
      </div>
    );
}