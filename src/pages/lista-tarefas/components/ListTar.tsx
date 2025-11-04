import { FiMinimize2 } from "react-icons/fi";

type MinimizeKey =
  | "pendente"
  | "progresso"
  | "concluido"
  | "atrasadas"
  | "cancelada"
  | "revisao";

export interface ListProps {
  title: string;
  userrole?: string;
  minimizeKey: MinimizeKey;
  minimized: boolean;
  onToggleMinimize: (key: MinimizeKey) => void;
  children: React.ReactNode;
}

function ListTar({
  title,
  minimizeKey,
  minimized,
  onToggleMinimize,
  children,
}: ListProps) {
  return (
    <div className="bg-[#251F1F] text-center p-4 pb-5 flex flex-col w-[180px] sm:w-[240px]  rounded-[10px] shadow-xl shadow-[#1a1515]">
      <div className="flex items-center justify-between mb-1">
        <p className="text-white font-semibold flex-1 text-center">{title}</p>
        <div className="flex justify-end p-1 rounded-[15px]">
          <FiMinimize2
            color="white"
            className="hover:scale-125 cursor-pointer"
            onClick={() => onToggleMinimize(minimizeKey)}
          />
        </div>
      </div>

      {!minimized && children}
    </div>
  );
}

export default ListTar;
