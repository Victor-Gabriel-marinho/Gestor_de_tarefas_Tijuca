import { IoIosArrowUp } from "react-icons/io";

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
    <div className="bg-[#251F1F] text-center p-4 pb-5 flex flex-col w-[180px] sm:w-[240px]  rounded-[10px] shadow-xl shadow-[#1a1515]  ">
      <div className="flex items-center justify-between mb-1">
        <p className="text-white font-semibold flex-1 text-center">{title}</p>
      </div>

      {!minimized && children}

      <div
        className={`w-full h-full flex items-center justify-center p-2 mt-2 rounded-2xl  bg-[#44383e] cursor-pointer ${minimized ? "rotate-180" : ""}`}
        onClick={() => {
          onToggleMinimize(minimizeKey);
        }}
      >
        <IoIosArrowUp className="flex font-semibold text-white" />
      </div>
    </div>
  );
}

export default ListTar;
