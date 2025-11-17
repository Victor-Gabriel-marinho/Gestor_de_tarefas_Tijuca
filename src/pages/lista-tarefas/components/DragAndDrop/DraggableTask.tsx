import { useDraggable } from "@dnd-kit/core";
import Tags from "../tagstaf";
import { Get_Taskuser } from "../../../../hooks/Tasks_hooks/Get_TaskUser";
import { decodeJWT } from "../../../../utils/decodeJWT";
import { useAuthStore } from "../../../../store/Auth";
import { FaUserCircle } from "react-icons/fa";
import { useTags } from "../../../../hooks/Label_hooks/get_alllabels_in_tasks";
import { useEffect, useMemo } from "react";
import type { Task } from "../../../../api/types/TaskTypes/TaskDTO";

interface DraggableTaskProps {
  taskname: string;
  id: string;
  task: Task;
  setModal: (task: Task) => void;
  idSelected: string;
  refreshtasks: string | null;
  setrefreshtask?: React.Dispatch<React.SetStateAction<string | null>>;
}

const DraggableTask = ({
  taskname,
  setModal,
  id,
  idSelected,
  task,
  refreshtasks,
  setrefreshtask
}: DraggableTaskProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const { tags, fetchTags } = useTags(idSelected);
  const { taskuser, refetchTaskuser } = Get_Taskuser(idSelected);

  const token = useAuthStore((state) => state.token);
  const payload = decodeJWT(token);  
    
  useEffect(() => {
    refetchTaskuser();
    fetchTags();
    setrefreshtask?.(null)
    
  }, [refreshtasks, idSelected]);

  const style = useMemo((): React.CSSProperties | undefined => {
    if (!transform) return undefined;

    return {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      opacity: isDragging ? 0 : 1,
      zIndex: isDragging ? 9999 : 10,
      transition: "opacity 0.2s ease, box-shadow 0.25s ease-in-out",
      boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
    };
  }, [transform, isDragging]);

  const isUserResponsible = useMemo(() => {
    return taskuser.some((user) => user.id === payload?.sub);
  }, [taskuser, payload?.sub]);

  const handleClick = () => {
    setModal(task);
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div
        className={`bg-white cursor-grab p-3 flex gap-1.5 justify-center items-center hover:opacity-90 flex-wrap text-center rounded-[5px] overflow-x-hidden sm:w-[200px] line-clamp-1 break-words whitespace-normal ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        onClick={handleClick}
      >
        {/* Revela a div caso houver tags ou a task for atribuida ao usuário */}
        {(tags.length > 0 || isUserResponsible) && (
          <div className="flex flex-row justify-between items-center sm:w-[200px] px-2">
            {tags?.length > 0 && (
              <Tags
                containerClassName={
                  "rounded-2xl flex flex-wrap justify-center items-center gap-2 w-full sm:max-w-[200px] sm:w-[190px] font-semibold"
                }
                tagclassName="text-[12px] text-amber-100 rounded-[10px] p-1 shadow-xl shadow-black/40 cursor-pointer"
                idSelected={idSelected}
                tags={tags}
                fetchTagsTask={fetchTags}
              />
            )}

            {isUserResponsible && (
              <div className="relative flex flex-col items-center">
                <FaUserCircle className="text-[20px]" />
                <span className="absolute l-0 text-[10px] text-gray-400 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#1f1a1a] rounded-[5px] text-center">
                  Responsável pela tarefa
                </span>
              </div>
            )}
          </div>
        )}
        <p className="line-clamp-1 sm:line-clamp-2 sm:break-words sm:whitespace-normal sm:max-w-[200px] overflow-hidden">
          {taskname}
        </p>
      </div>
    </div>
  );
};

export default DraggableTask;
