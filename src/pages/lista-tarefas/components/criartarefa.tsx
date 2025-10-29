import { IoIosClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { TaskService } from "../../../api/services/TaskService";
import type { CreateTaskDTO, Task } from "../../../api/types/TaskTypes/TaskDTO";

type CreateProps = {
  title: string;
  id_team: string | undefined;
  Selected: Task | undefined;
  onClose: () => void;
  closeModal?: () => void;
  refetchTasks: (() => Promise<void>) | undefined;
  statusForCreate: string;
};

function Criar({ onClose, statusForCreate, id_team,title, refetchTasks, Selected, closeModal }: CreateProps) {
  const [error, setError] = useState<string>("");
  const [TaskSelected, setTaskSelected] = useState<Task | undefined>(Selected);

  async function Criar(e: React.FormEvent<HTMLFormElement>) {
    if (!id_team) return;
    const formdata = new FormData(e.currentTarget);
    e.preventDefault();

    const nome = formdata.get("Name") as string;

    if (!nome || (nome.trim() === "" && title === "Criar")) {
      setError("O nome da tarefa é obrigatório.");
      return;
    }

    const desc = formdata.get("Content") as string;
    const prio = formdata.get("Priority") as string;
    const data = formdata.get("endDate") as string;
    if (!data && title === "Criar") {
      setError("A data de entrega é obrigatória.");
      return;
    }

    const task = {
      id_team: id_team,
      Name: nome,
      Content: desc,
      Priority: prio,
      id_status: statusForCreate,
      EndDate: new Date(data),
    };

    console.log(task);
    

    if (title === "Criar") {
      Create_task(task);
    } else {
      Edit_task(task);
    }
  }

  async function Create_task(task: CreateTaskDTO) {
    try {
      const response = await TaskService.CreateTask(task);
      if (response) {
        refetchTasks?.();
        onClose();
      }
    } catch (error) {
      console.log("erro ao fazer requisição", error);
    }
  }

  async function Edit_task(task: CreateTaskDTO) {
    try {
      if (!Selected?.id) return;
      const response = await TaskService.EditTask(Selected.id, task);
      if (response) {
        refetchTasks?.();
        closeModal?.();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const estadoInicial = {
    Name: "",
    Content: "",
    Priority: "",
    endDate: "",
  };

  const [formData, setFormData] = useState(estadoInicial);

  useEffect(() => {
    if (title !== "Criar" && TaskSelected) {
      setFormData({
        Name: TaskSelected.Name || "",
        Content: TaskSelected.Content || "",
        Priority: TaskSelected.Priority || "",
        endDate: TaskSelected.EndDate
          ? new Date(TaskSelected.EndDate).toISOString().slice(0, 10)
          : "",
      });
    } else {
      setFormData(estadoInicial);
    }
  }, [title, TaskSelected]);

  const handlechange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center bg-black/50 w-screen h-screen fixed top-0 left-0 right-0 backdrop-blur-[20px]">
      <div className="bg-[#251F1F] h-[600px] w-[400px] max-w-[90vw] max-h-[90vh] overflow-auto text-white relative p-10 gap-5 flex flex-col rounded-[10px]">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-sm sm:text-xl font-bold">{title} tarefa</h2>
          <button className="cursor-pointer" onClick={onClose}>
            <IoIosClose size={40} />
          </button>
        </div>
        <form
          action=""
          onSubmit={(e) => Criar(e)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Nome da tarefa</p>
            <input
              type="text"
              name="Name"
              placeholder="Nome"
              className="bg-white text-black rounded-[5px] outline-none p-2"
              value={formData.Name}
              onChange={handlechange}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold">Descrição da tarefa</p>
            <textarea
              name="Content"
              value={formData.Content}
              placeholder="Descrição (opcional)"
              className="bg-white text-black resize-none rounded-[5px] outline-none p-2"
              onChange={handlechange}
            ></textarea>
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold">Prioridade</p>
            <select
              name="Priority"
              value={formData.Priority}
              className="bg-white text-black rounded-[5px] p-2"
              onChange={handlechange}
            >
              <option value="" disabled>
                Prioridade
              </option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold">Data de Entrega</p>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              className="bg-white text-black rounded-[5px] p-2 outline-none"
              onChange={handlechange}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 p-2 rounded-[5px] cursor-pointer"
          >
            {title} tarefa
          </button>
        </form>
        {error && (
          <div className="w-full h-15 bg-red-500 gap-2  flex flex-row items-center justify-center p-3 rounded-[5px]">
            <p className="text-white text-lg">{error}</p>
            <p
              className="font-semibold text-white text-lg cursor-pointer"
              onClick={() => setError("")}
            >
              X
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Criar;
