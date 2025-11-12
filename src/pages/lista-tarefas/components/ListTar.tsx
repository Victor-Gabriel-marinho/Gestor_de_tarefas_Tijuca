import type { Task } from "../../../api/types/TaskTypes/TaskDTO";
import { Minimize_Btn } from "./Btns/minimize_btn";

type MinimizeKey =
  | "pendente"
  | "progresso"
  | "concluido"
  | "atrasadas"
  | "cancelada"
  | "revisao";

export interface ListProps {
  title: string;
  tasks: Task[];
  userrole?: string;
  minimizeKey: MinimizeKey;
  minimized: boolean;
  onToggleMinimize: (key: MinimizeKey) => void;
  children: React.ReactNode;
}

function ListTar({
  title,
  minimized,
  minimizeKey,
  onToggleMinimize,
  children,
  tasks,
}: ListProps) {
  return (
    <div className="bg-[#251F1F] text-center p-4 pb-5 flex flex-col w-[180px] sm:w-[240px]  rounded-[10px] shadow-lg shadow-[#1a1515]  truncate">
      <div className="flex items-center justify-between mb-1">
        <p className="text-white font-semibold flex-1 text-center">{title}</p>
      </div>

      {!minimized && children}

      {tasks.length > 0 && (
        <Minimize_Btn
          minimized={minimized}
          minimizeKey={minimizeKey}
          onToggleMinimize={onToggleMinimize}
        />
      )}
    </div>
  );
}

export default ListTar;
