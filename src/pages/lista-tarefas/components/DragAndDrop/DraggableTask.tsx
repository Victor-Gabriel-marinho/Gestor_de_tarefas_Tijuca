import { useDraggable } from "@dnd-kit/core";
import { useCallback, useEffect, useRef } from "react";
import Tags from "../tagstaf";
<<<<<<< HEAD
=======
import { useTags } from "../../../../hooks/Label_hooks/get_alllabels_in_tasks";
import { Modal_taskUser } from "../AddTaskUser";
>>>>>>> bd302c1 (hovers finalizados)
import { Get_Taskuser } from "../../../../hooks/Tasks_hooks/Get_TaskUser";
import { decodeJWT } from "../../../../utils/decodeJWT";
import { useAuthStore } from "../../../../store/Auth";
import { FaUserCircle } from "react-icons/fa";
import { useTags } from "../../../../hooks/Label_hooks/get_alllabels_in_tasks";

interface DraggableTaskProps {
  taskname: string;
  id: string;
  setModal: () => void;
  idSelected: string;
}

<<<<<<< HEAD
const DraggableTask = ({ taskname, setModal, id, idSelected }: DraggableTaskProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });    
  
=======
const CLICK_THRESHOLD_MS = 250;

const DraggableTask = ({ taskname, setModal, id, idSelected }: DraggableTaskProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });
>>>>>>> bd302c1 (hovers finalizados)
  const {tags, fetchTags} = useTags(idSelected);
  const {taskuser } = Get_Taskuser(idSelected);  
 
  const token = useAuthStore((state) => state.token);
  const payload = decodeJWT(token);
<<<<<<< HEAD
=======

  const clickStartTime = useRef<number>(0);

  const handleMouseDown = () => {
    clickStartTime.current = Date.now();

  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const duration = Date.now() - clickStartTime.current;
>>>>>>> bd302c1 (hovers finalizados)



  const handleclick = (e: React.MouseEvent) => {

      e.stopPropagation();
      setModal();

  };

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0 : 1, // Esconde o item original
        zIndex: isDragging ? 9999 : 10,
        transition: "opacity 0.2s ease, box-shadow 0.25s ease-in-out",
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
      }
    : undefined;
<<<<<<< HEAD
=======
    
  /*   useEffect(()=>{
      fetchTags()
    },[tags]) */
>>>>>>> bd302c1 (hovers finalizados)

    return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <div
        className={`bg-white cursor-grab p-3 flex gap-1.5 justify-center items-center hover:opacity-90 hover:animate-pulse flex-wrap text-center rounded-[5px] ${isDragging ? "cursor-grabbing": ""}`}
       onClick={handleclick}
      >
      {/* Revela a div caso houver tags ou a task for atribuida ao usuário */}
       {(tags.length > 0 || taskuser.some((user)=> user.id === payload?.sub))  && ( 
        <div className="flex flex-row justify-between items-center max-w-[200px] max-h-[50p]">
            {tags?.length > 0 && (
              <Tags
              containerClassName={"rounded-2xl flex flex-wrap justify-center items-center gap-2 w-full sm:max-w-[200px] sm:w-[190px] font-semibold "}
              tagclassName="text-[12px] text-amber-100 rounded-[10px] p-1 shadow-xl shadow-black/40 cursor-pointer"
              idSelected={idSelected}
              tags={tags}
              fetchTagsTask={fetchTags}
            />
            )}
            
            <div className="mr-3 relative group flex flex-col items-center ">
              {taskuser.some((user)=> user.id === payload?.sub) &&(
                <FaUserCircle className="text-[20px]"/>
              )}
              <span className="absolute left-5 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#1f1a1a] p-1 rounded-[5px] text-center"
              >Responsável pela tarefa</span>  
            </div>

        </div>)}
        {taskname}
      </div>

    </div>
  );
};

export default DraggableTask;
