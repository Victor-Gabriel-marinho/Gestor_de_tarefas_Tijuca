import { useDraggable } from "@dnd-kit/core";
import { useEffect, useRef } from "react";
import Tags from "../tagstaf";
import { Get_Taskuser } from "../../../../hooks/Tasks_hooks/Get_TaskUser";
import { decodeJWT } from "../../../../utils/decodeJWT";
import { useAuthStore } from "../../../../store/Auth";
import { FaUserCircle } from "react-icons/fa";
import { useTags } from "../../../../hooks/Label_hooks/get_alllabels_in_tasks";

interface DraggableTaskProps {
  taskname: string;
  id: string;
  setModal: () => void;
  idSelected: string
}

const CLICK_THRESHOLD_MS = 250;

const DraggableTask = ({ taskname, setModal, id, idSelected }: DraggableTaskProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });
  const {tags, fetchTags} = useTags(idSelected);
  const {taskuser } = Get_Taskuser(idSelected);  
 
  const token = useAuthStore((state) => state.token);
  const payload = decodeJWT(token);

  const clickStartTime = useRef<number>(0);

  const handleMouseDown = () => {
    clickStartTime.current = Date.now();

  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const duration = Date.now() - clickStartTime.current;


    const isQuickClick = duration < CLICK_THRESHOLD_MS;

    const isNotDragging = !isDragging;

    if (isQuickClick && isNotDragging) {
      e.stopPropagation();
      setModal();
    }

    clickStartTime.current = 0;
  };

  const handleMouseLeave = () => {
    clickStartTime.current = 0;
  };

  const style = transform
    ? {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      zIndex: isDragging ? 9999 : 10,
      transition: "box-shadow 0.25s ease-in-out",
      boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
    }
    : undefined;
    
    useEffect(()=>{
      fetchTags()
    },[tags])

    return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div
        className="bg-white cursor-pointer p-3 flex gap-1.5 justify-center items-center hover:scale-110 flex-wrap text-center rounded-[5px]"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
      {/* Revela a div caso houver tags ou a task for atribuida ao usuário */}
       {(tags.length > 0 || taskuser.some((user)=> user.id === payload?.sub))  && ( 
        <div className="flex flex-row justify-between items-center max-w-[205px] max-h-[50p]">
            {tags?.length > 0 && (
              <Tags
              containerClassName={"rounded-2xl flex flex-wrap justify-center items-center gap-2 w-[290px] max-w-[300px] sm:max-w-[200px] sm:w-[190px]"}
              tagclassName="text-[9px] text-amber-100 rounded-[10px] p-1 shadow-xl shadow-black/40 cursor-pointer"
              idSelected={idSelected}
              tags={tags}
              fetchTagsTask={fetchTags}
            />
            )}
            
            <div className="pr-3">
              {taskuser.some((user)=> user.id === payload?.sub) &&(
                <FaUserCircle className="text-[20px]"/>
              )}  
            </div>

        </div>)}
        {taskname}
      </div>

    </div>
  );
};

export default DraggableTask;
