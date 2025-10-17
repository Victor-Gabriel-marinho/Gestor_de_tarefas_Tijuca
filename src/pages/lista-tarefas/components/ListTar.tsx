import { FiMinimize2 } from "react-icons/fi";

type MinimizeKey = "pendente" | "progresso" | "concluido" | "atrasadas" | "nova";

type ListProps = {
  title: string;
  minimizeKey: MinimizeKey;
  minimized: boolean;
  onToggleMinimize: (key: MinimizeKey) => void;
  onCreateClick: () => void;
  children: React.ReactNode;
};

function ListTar({
  title,
  minimizeKey,
  minimized,
  onToggleMinimize,
  onCreateClick,
  children,

}: ListProps) {

  return (
    <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-[240px] overflow-auto gap-y-2 max-w-60">
      <div className="flex items-center justify-between">
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

      {userRole !== 1 ? <div></div> :
      <button
        className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
        onClick={() => onCreateClick()}
      >
        + Criar Tarefa
      </button>}
    </div>
  );
}

export default ListTar;
