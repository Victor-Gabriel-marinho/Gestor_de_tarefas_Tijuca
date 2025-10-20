import { useDraggable } from "@dnd-kit/core";
import { useRef } from "react";

interface DraggableTaskProps {
  taskname: string;
  id: string;
  setModal: () => void;
}

const CLICK_THRESHOLD_MS = 250;

const DraggableTask = ({ taskname, setModal, id }: DraggableTaskProps) => {
  const {attributes, listeners,setNodeRef, transform, isDragging} = useDraggable({
    id: id,
  });

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

  return (
    <div
    ref={setNodeRef}
    style={style}
    {...listeners}
    {...attributes}
    >
      <p
        className="bg-white cursor-pointer p-1 flex justify-center items-center hover:scale-110  flex-wrap truncate  text-center rounded-[5px]"
       onMouseDown={handleMouseDown}
       onMouseUp={handleMouseUp}
       onMouseLeave={handleMouseLeave}
      >
        {taskname}
      </p>
    </div>
  );
};

export default DraggableTask;
