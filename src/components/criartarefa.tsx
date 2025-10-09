import { IoIosClose } from "react-icons/io";
import React, { useState } from "react";
import { TaskService } from "../api/services/TaskService";
import type { CreateTaskDTO } from "../api/types/TaskTypes/TaskDTO";

type CreateProps = {
  title: string;
  id_team: string | undefined;
  idSelected: string | undefined;
  onClose: () => void;
  refetchTasks: (() => Promise<void>) | undefined;
  statusForCreate: string;
};

function Criar({ onClose, statusForCreate, id_team,title, refetchTasks, idSelected }: CreateProps) {
  const [tarefa, Settarefa] = useState<string>("");

  async function Criar(e: React.FormEvent<HTMLFormElement>) {
    if (!id_team) return;
    const formdata = new FormData(e.currentTarget);
    e.preventDefault();

    const nome = formdata.get("Nome") as string;
    const desc = formdata.get("desc") as string;
    const prio = formdata.get("Prio") as string;
    const data = formdata.get("data") as string;

    const task = {
      id_team: id_team,
      Name: nome,
      Content: desc,
      Priority: prio,
      Status: statusForCreate,
      EndDate: new Date(data),
    };

    if (title === "Criar"){
      Create_task(task)
    } else {
      Edit_task(task)
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

  async function Edit_task(task: CreateTaskDTO){
    try {
      if (!idSelected) return
      const response = await TaskService.EditTask(idSelected,task)
      if (response) {
        refetchTasks?.();
        onClose();
      }
    }
    catch (error){
      console.log(error)
    }
  }

  const [data, Setdata] = useState("");

  return (
    <div className="flex items-center justify-center bg-black/50 w-screen h-screen fixed top-0 left-0 right-0 backdrop-blur-[20px]">
      <div className="bg-[#251F1F] max-w-[90vw] max-h-[90vh] overflow-auto text-white relative p-10 gap-5 flex flex-col rounded-[10px]">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-sm sm:text-xl ">{title} tarefa</h2>
          <button className="cursor-pointer" onClick={onClose}>
            <IoIosClose size={40} />
          </button>
        </div>
        <form
          action=""
          onSubmit={(e) => Criar(e)}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            name="Nome"
            placeholder="Nome da tarefa"
            required
            className="bg-white text-black rounded-[5px] outline-none p-2"
            value={tarefa}
            onChange={(e) => Settarefa(e.target.value)}
          />

          <textarea
            name="desc"
            id=""
            placeholder="Adicione uma descrição"
            className="bg-white text-black resize-none rounded-[5px] outline-none p-2"
          ></textarea>
          <select
            name="Prio"
            id=""
            className="bg-white text-black rounded-[5px] p-2"
          >
            <option value="" disabled>
              Prioridade
            </option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <input
            type="datetime-local"
            name="data"
            id=""
            className="bg-white text-black rounded-[5px] p-2 outline-none"
            value={data}
            onChange={(e) => Setdata(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-[5px] cursor-pointer"
          > 
            {title} Tarefa
          </button>
        </form>
      </div>
    </div>
  );
}

export default Criar;
