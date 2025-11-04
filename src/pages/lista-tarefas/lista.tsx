import Nav from "../../components/layouts/nav";
import Modaltaf from "./components/Modaltaf";
import { useEffect, useState } from "react";
import { useFont } from "../../components/font";
import Filtrar from "./components/filtertask";
import { Get_Tasks } from "../../hooks//Tasks_hooks/get_Tasks";
import { useParams } from "react-router-dom";
import type { Task } from "../../api/types/TaskTypes/TaskDTO";
import Criar from "./components/criartarefa";
import { Get_userRole } from "../../hooks/User_hooks/get_userRole";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import DraggableTask from "./components/DragAndDrop/DraggableTask";
import DroppableLane from "./components/DragAndDrop/DroppableLane";
import { TaskService } from "../../api/services/TaskService";
import Get_All_Status from "../../hooks//Status_hooks/Get_All_Status";
import Dashboard from "./components/dashboard";
import Get_Status_Default from "../../hooks/Status_hooks/Get_StatusDefaul";

function Lista() {
  // Hook para trazer a fonte
  useFont(" 'Poppins', 'SansSerif' ");

  // Modal e seleção
  const [modaltask, Setmodaltask] = useState<boolean>(false);
  const [select, Setselect] = useState<Task>();

  // Criar tarefa
  const [criar, Setcriar] = useState<string>("");

  // Minimizar listas
  const [minimize, setMinimize] = useState({
    pendente: false,
    progresso: false,
    concluido: false,
    atrasadas: false,
    cancelada: false,
    revisao: false,
  });

  const toggleMinimize = (key: keyof typeof minimize) => {
    setMinimize((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  type MinimizeKey = keyof typeof minimize;

  const normalizeKey = (name: string): MinimizeKey => {
    const lowerCase = name.toLowerCase();

    const normalized = lowerCase
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return normalized as MinimizeKey;
  };

  const { GetStatusDefault } = Get_Status_Default();  

  const Status = {
    Pen: GetStatusDefault?.filter((Status) => Status.Name === "Pendente")[0].id,
    Prog: GetStatusDefault?.filter((Status) => Status.Name === "Progresso")[0]
      .id,
    Conc: GetStatusDefault?.filter((Status) => Status.Name === "Concluido")[0]
      .id,
    Atra: GetStatusDefault?.filter((Status) => Status.Name === "Atrasadas")[0]
      .id,
    Canc: GetStatusDefault?.filter((Status) => Status.Name === "Cancelada")[0]
      .id,
    Rev: GetStatusDefault?.filter((Status) => Status.Name === "Revisão")[0].id,
   };

  //filtro  de status e prazo
  const [, setFiltro] = useState<{ status?: string; prazo?: string }>({});

  // Buscar tasks
  const { id } = useParams();
  const { tasks, refetchTasks } = id ? Get_Tasks(id) : {};

  const { userRole } = Get_userRole(id ?? "");

  const { status, refetch_Status } = Get_All_Status(id ?? "");

  const setall = () => {
    setFiltro((prevfiltro) => ({
      ...prevfiltro,
      status: "todas",
      prazo: "",
    }));
  };

  //States de tasks filtradas
  const [pen, setpen] = useState<Task[]>();
  const [prog, setprog] = useState<Task[]>();
  const [done, setdone] = useState<Task[]>();

  //States de tags do team


  const handleDragend = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const draggedTaskId = active.id.toString();
    const newStatus = over.id.toString();

    if (active.data.current?.status === newStatus) return;

    try {
      const response = await TaskService.AlterStatus(draggedTaskId, newStatus);
      if (response) {
        if (refetchTasks) {
          refetchTasks();
          refetch_Status();
        }
      }
    } catch (error) {
      console.log("erro ao fazer requisição", error);
    }
  };

  useEffect(() => {
    if (!tasks) return;

<<<<<<< HEAD
    let filteredtask = tasks

    
=======
>>>>>>> eec5112 (retirando mods da develop)
    const pending: Task[] = [];
    const inProgress: Task[] = [];
    const completed: Task[] = [];

    tasks.forEach((task) => {
      if (task.id_status === Status.Pen) {
        pending.push(task);
      } else if (task.id_status === Status.Prog) {
        inProgress.push(task);
      } else if (task.id_status === Status.Conc) {
        completed.push(task);
      }
    });

    setpen(pending);
    setprog(inProgress);
    setdone(completed);
  }, [tasks]);
  return (
    <>
      <div className="bg-[#1F2937] h-screen w-screen overflow-auto">
        {/* Navbar */}
        <Nav SetAll={setall}>
          {/*o filtro envia suas mudanças de status /prazo via prop*/}
          <Filtrar onFiltroChange={(f) => setFiltro(f)} />
        </Nav>

        <main className="flex flex-col min-h-1/2 md:flex-row gap-5 sm:gap-0 m-5 items-center sm:items-start justify-center overflow-hidden">
          <div className="flex w-35 sm:w-1/12">
            {userRole?.id === "3" ? (
              <div></div>
            ) : (
              <div className="flex justify-center sm:justify-start">
                <button
                  className="bg-[#251F1F] text-white p-3 rounded-[10px]  text-center hover:bg-[#3d3434] cursor-pointer"
                  onClick={() => {
                    Setcriar("Criar");
                  }}
                >
                  + Criar Tarefa
                </button>
              </div>
            )}
          </div>
<<<<<<< HEAD
          <div className="flex flex-col sm:flex-row gap-5 w-full items-center sm:items-start justify-center">
            <DndContext onDragEnd={handleDragend}>
              {/* Pendentes */}
              {tasks !== null && (
                <DroppableLane
                  id={Status.Pen ?? ""}
                  userrole={userRole?.id}
                  title="Pendente"
                  minimizeKey="pendente"
                  minimized={minimize.pendente}
                  onToggleMinimize={toggleMinimize}
                >
                  {/*{pendingTasks.map((pentask)*/}
                  {pen?.map((pentask) => (
                    <DraggableTask
                      idSelected={pentask.id}
                      key={pentask.id}
                      taskname={pentask.Name}
                      setModal={() => {
                        Setselect(pentask);
                        Setmodaltask(true);
                      }}
                      id={pentask.id}
                    />
                  ))}
                </DroppableLane>
              )}
              {/* Em progresso */}
              {tasks && (
                <DroppableLane
                  userrole={userRole?.id}
                  id={Status.Prog ?? ""}
                  title="Progresso"
                  minimizeKey="progresso"
                  minimized={minimize.progresso}
                  onToggleMinimize={toggleMinimize}
                >
                  {/*{inProgressTasks.map((progtask)*/}
                  {prog?.map((progtask) => (
                    <DraggableTask
                    idSelected={progtask.id}
                      key={progtask.id}
                      id={progtask.id}
                      taskname={progtask.Name}
                      setModal={() => {
                        Setselect(progtask);
                        Setmodaltask(true);
                      }}
                    />
                  ))}
                </DroppableLane>
              )}
              {/* Concluídas */}
              {tasks && (
                <DroppableLane
                  id={Status.Conc ?? ""}
                  userrole={userRole?.id}
                  title="Concluidas"
                  minimizeKey="concluido"
                  minimized={minimize.concluido}
                  onToggleMinimize={toggleMinimize}
                >
                  {done?.map((taskdone) => (
                    <DraggableTask
                    idSelected={taskdone.id}
                      key={taskdone.id}
                      id={taskdone.id}
                      taskname={taskdone.Name}
                      setModal={() => {
                        Setselect(taskdone);
                        Setmodaltask(true);
                      }}
                    />
                  ))}
                </DroppableLane>
              )}

              {/* Outros Status */}
              {status?.map((status) => (
                <DroppableLane
                  id={status.id}
                  userrole={userRole?.id}
                  title={status.Name}
                  minimizeKey="concluido"
                  minimized={minimize.concluido}
                  onToggleMinimize={toggleMinimize}
                >
                  {tasks?.map((task) =>
                    task.id_status === status.id ? (
                      <DraggableTask
                        idSelected={task.id}
                        key={task.id}
                        id={task.id}
                        taskname={task.Name}
=======
          <div className="flex flex-col w-full items-center justify-center gap-5">
            <h2 className="text-white font-semibold text-3xl">
              Tarefas do time 📒
            </h2>
            <p className="text-white font-semibold text-xl">Arraste para mudar o status e clique para expandir</p>
            <div className="flex flex-wrap flex-row gap-5 w-full h-10/12 items-center sm:items-start justify-center">
              <DndContext onDragEnd={handleDragend}>
                {/* Pendentes */}
                {tasks !== null && (
                  <DroppableLane
                    id={Status.Pen ?? ""}
                    userrole={userRole?.id}
                    title="Pendente"
                    minimizeKey="pendente"
                    minimized={minimize.pendente}
                    onToggleMinimize={toggleMinimize}
                  >
                    {pen?.slice(0, 5).map((pentask) => (
                      <DraggableTask
                        key={pentask.id}
                        taskname={pentask.Name}
>>>>>>> eec5112 (retirando mods da develop)
                        setModal={() => {
                          Setselect(pentask);
                          Setmodaltask(true);
                        }}
                        id={pentask.id}
                      />
                    ))}
                  </DroppableLane>
                )}
                {/* Em progresso */}
                {tasks && (
                  <DroppableLane
                    userrole={userRole?.id}
                    id={Status.Prog ?? ""}
                    title="Progresso"
                    minimizeKey="progresso"
                    minimized={minimize.progresso}
                    onToggleMinimize={toggleMinimize}
                  >
                    {/*{inProgressTasks.map((progtask)*/}
                    {prog?.slice(0, 5).map((progtask) => (
                      <DraggableTask
                        key={progtask.id}
                        id={progtask.id}
                        taskname={progtask.Name}
                        setModal={() => {
                          Setselect(progtask);
                          Setmodaltask(true);
                        }}
                      />
                    ))}
                  </DroppableLane>
                )}
                {/* Concluídas */}
                {tasks && (
                  <DroppableLane
                    id={Status.Conc ?? ""}
                    userrole={userRole?.id}
                    title="Concluidas"
                    minimizeKey="concluido"
                    minimized={minimize.concluido}
                    onToggleMinimize={toggleMinimize}
                  >
                    {done?.slice(0, 5).map((taskdone) => (
                      <DraggableTask
                        key={taskdone.id}
                        id={taskdone.id}
                        taskname={taskdone.Name}
                        setModal={() => {
                          Setselect(taskdone);
                          Setmodaltask(true);
                        }}
                      />
                    ))}
                  </DroppableLane>
                )}
                {/* Outros Status */}
                {status?.map((status) => {
                  const key = normalizeKey(status.Name);
                  return (
                    <DroppableLane
                      id={status.id}
                      userrole={userRole?.id}
                      title={status.Name}
                      minimizeKey={key}
                      minimized={minimize[key]}
                      onToggleMinimize={toggleMinimize}
                    >
                      {tasks?.map((task) =>
                        task.id_status === status.id ? (
                          <DraggableTask
                            key={task.id}
                            id={task.id}
                            taskname={task.Name}
                            setModal={() => {
                              Setselect(task);
                              Setmodaltask(true);
                            }}
                          />
                        ) : null
                      )}
                    </DroppableLane>
                  );
                })}
              </DndContext>
            </div>
          </div>
        </main>

        {/* Modals */}
        {modaltask && select && (
          <Modaltaf
            userrole={userRole?.id}
            task={select}
            onClose={() => Setmodaltask(false)}
            refetchtask={refetchTasks}
            refetchStatus={refetch_Status}
            idSelected={select.id}
            setcriar={() => {
              Setcriar("Editar");
            }}
          />
        )}
        {criar && (
          <Criar
            title={criar}
            onClose={() => Setcriar("")}
            closeModal={() => Setmodaltask(false)}
            Selected={select}
            refetchTasks={refetchTasks}
            id_team={id}
            refetch_Status={refetch_Status}
            Status={Status}
          />
        )}

        <Dashboard id_team={id ? id : ""} />
      </div>
    </>
  );
}

export default Lista;
