import { useDroppable } from "@dnd-kit/core";
import type { ListProps } from "../ListTar";
import type React from "react";
import ListTar from "../ListTar";

interface DroppableLane extends ListProps {
  id: string;
  children: React.ReactNode;
}

function DroppableLane({ id, children, ...rest }: DroppableLane) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const style = isOver
    ? {
        backgroundColor: isOver ? "rgba(0, 0, 0, 0.1)" : undefined,
        borderRadius: "8px",
        transition: "background-color 0.2s ease",
      }
    : undefined; 

  return (
    <ListTar {...rest}>
      <div ref={setNodeRef} style={style} className="flex flex-col gap-2 w-full min-h-1">
        {children}
        </div>
    </ListTar>
  );
}

export default DroppableLane;
