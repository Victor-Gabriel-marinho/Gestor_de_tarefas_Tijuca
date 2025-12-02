import { IoIosClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { TaskService } from "../../../api/services/TaskService";
import type { CreateTaskDTO, Task } from "../../../api/types/TaskTypes/TaskDTO";
import type { StatusDefault } from "../../../api/types/StatusTypes/StatusDefault";
import { Get_status } from "../../../hooks/Status_hooks/get_Status";


type CreateProps = {
  title: string;
  id_team: string | undefined;
  Selected: Task | undefined;
  onClose: () => void;
  closeModal?: () => void;
  refetchTasks: (() => Promise<void>) | undefined;
  refetch_Status: (() => Promise<void>) | undefined
  Status?: StatusDefault
  
};

function Criar({ onClose, id_team, title, refetchTasks, Selected, closeModal, refetch_Status }: CreateProps) {
  const [error, setError] = useState<string>("");


  async function Create_task(task: CreateTaskDTO) {
    try {

      const response = await TaskService.CreateTask(task);
      if (response) {
        console.log(response);

        await refetchTasks?.();
        refetch_Status?.()
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
        await refetchTasks?.();
        closeModal?.();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

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
    if (!prio) {
      setError("Prioridade é obrigatório")
      return
    }
    const status = formdata.get("Status") as string

    if (!status) {
      setError("Status é obrigatório")
      return
    }
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
      id_status: status,
      EndDate: new Date(data),
    };

    if (title === "Criar") {
      Create_task(task);
    } else {
      Edit_task(task);
    }
  }

  const estadoInicial = {
    Name: "",
    Content: "",
    Status: "",
    Priority: "",
    endDate: "",
  };

  const [formData, setFormData] = useState(estadoInicial);
  const { arraystatus } = Get_status(Selected?.id_status ?? "")

  useEffect(() => {
    if (title !== "Criar" && Selected) {
      if (arraystatus && arraystatus.length > 0) {
        const StatusName = arraystatus[0].Name || ""
        console.log(StatusName);

        setFormData({
          Name: Selected.Name || "",
          Status: StatusName,
          Content: Selected.Content || "",
          Priority: Selected.Priority || "",
          endDate: Selected.EndDate
            ? new Date(Selected.EndDate).toISOString().slice(0, 10)
            : "",
        });
      }
    } else {
      setFormData(estadoInicial);
    }
  }, [title, Selected, arraystatus]);  
    
  const handlechange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen h-screen bg-black/50 flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-center fixed inset-0 backdrop-blur-[20px]">
      <div className="bg-[#251F1F] h-[690px] w-[450px] max-w-[90vw] max-h-[100vh] text-white  p-8 gap-5 gap-y-0 flex flex-col rounded-[10px]">
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

          <div className="flex flex-col gap-2">
            <p className="test-lg font-semibold">Status da tarefa</p>
            <select
              name="Status"
              value={formData.Status}
              onChange={handlechange}
              className="bg-white text-black rounded-[5px] p-2 w-full"
            >
              <option value="" disabled>
                Status
              </option>
              <option value="Pendente">Pendente</option>
              <option value="Progresso">Progresso</option>
              <option value="Concluido">Concluido</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Atrasada">Atrasada</option>
              <option value="Revisão">Revisão</option>
            </select>
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
          <div className="w-full h-15 bg-red-500 gap-5 flex flex-row items-center justify-center p-1 mt-1 rounded-[5px]">
            <p className="text-white text-lg">{error}</p>
            <div>
              <p
                className="font-semibold text-white text-lg cursor-pointer"
                onClick={() => setError("")}
              >
                <IoIosClose size={30} />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Criar;
