type Create_task_BtnProps = {
  Setcriar: (value: React.SetStateAction<string>) => void;
};

export const Create_task_Btn = ({Setcriar}: Create_task_BtnProps) => {
    return (
      <div className="flex justify-center sm:justify-start">
        <button
          className="bg-[#251F1F] text-white p-3 rounded-[10px]  text-center hover:bg-[#3d3434] hover:scale-105 transition-all cursor-pointer"
          onClick={() => {
            Setcriar("Criar");
          }}
        >
          + Criar Tarefa
        </button>
      </div>
    );
}