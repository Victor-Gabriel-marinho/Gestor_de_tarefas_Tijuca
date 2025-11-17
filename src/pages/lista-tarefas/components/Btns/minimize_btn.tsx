import { IoIosArrowUp } from "react-icons/io";

type MinimizeKey =
  | "pendente"
  | "progresso"
  | "concluido"
  | "atrasadas"
  | "cancelada"
  | "revisao";

type Minimize_Btn_Props = {
  minimizeKey: MinimizeKey;
  minimized: boolean;
  onToggleMinimize: (key: MinimizeKey) => void;
};

export const Minimize_Btn = ({minimizeKey,minimized, onToggleMinimize}: Minimize_Btn_Props) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center p-2 mt-2 rounded-2xl  bg-[#44383e] cursor-pointer ${
        minimized ? "rotate-180" : ""
      }`}
      
      onClick={() => {
        onToggleMinimize(minimizeKey);
      }}
    >
      <IoIosArrowUp className="flex font-semibold text-white" />
    </div>
  );
};
