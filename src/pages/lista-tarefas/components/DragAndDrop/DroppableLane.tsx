import { useDroppable } from "@dnd-kit/core";
import type { ListProps } from "../ListTar";
import type React from "react";
import ListTar from "../ListTar";

interface DroppableLane extends ListProps {
  id: string;
  children: React.ReactNode;
}

function DroppableLane({ id, children, ...rest }: DroppableLane) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: id,
  });  

  const style = isOver
    ? {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        transition: "background-color 0.2s ease",
      }
    : undefined;

  return (
    <ListTar {...rest}>
      <div
        ref={setNodeRef}
        style={style}
        className={`flex flex-col gap-2 min-h-5 w-[200px] max-h-[500px] ${active ? "overflow-hidden" : "overflow-auto"}`}
      >
        {children}
      </div>
    </ListTar>
  );
}

export default DroppableLane;
