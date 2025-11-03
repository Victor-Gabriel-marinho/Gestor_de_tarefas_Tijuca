import { FiMinimize2 } from "react-icons/fi";

type MinimizeKey =
  | "pendente"
  | "progresso"
  | "concluido"
  | "atrasadas"
  | "nova";

export interface ListProps  {
  title: string;
  userrole?: string;
  minimizeKey: MinimizeKey;
  minimized: boolean;
  onToggleMinimize: (key: MinimizeKey) => void;
  children: React.ReactNode;
};

function ListTar({
  title,
  minimizeKey,
  minimized,
  onToggleMinimize,
  children,
}: ListProps) {
  return (
    <div className="bg-[#251F1F] text-center p-4 pb-5 rounded-[5px] flex flex-col w-[240px]  max-w-60">
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

    </div>
  );
}

export default ListTar;
