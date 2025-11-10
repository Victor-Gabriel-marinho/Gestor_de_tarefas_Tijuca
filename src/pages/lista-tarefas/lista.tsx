import Nav from "../../components/layouts/nav";
import Modaltaf from "./components/Modaltaf";
import { useEffect, useState } from "react";
import { useFont } from "../../components/font";
import { Get_Tasks } from "../../hooks//Tasks_hooks/get_Tasks";
import { useParams } from "react-router-dom";
import type { Task } from "../../api/types/TaskTypes/TaskDTO";
import Criar from "./components/criartarefa";
import { Get_userRole } from "../../hooks/User_hooks/get_userRole";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import DraggableTask from "./components/DragAndDrop/DraggableTask";
import DroppableLane from "./components/DragAndDrop/DroppableLane";
import { TaskService } from "../../api/services/TaskService";
import Get_All_Status from "../../hooks//Status_hooks/Get_All_Status";
import Dashboard from "./components/dashboard";
import Get_Status_Default from "../../hooks/Status_hooks/Get_StatusDefaul";
import type { FiltroDashboard } from "../../api/types/DashboardTypes/filtro";

function Lista() {
  useFont(" 'Poppins', 'SansSerif' ");

  const [modaltask, Setmodaltask] = useState<boolean>(false);
  const [select, Setselect] = useState<Task>();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [criar, Setcriar] = useState<string>("");

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
    Pen: GetStatusDefault?.filter((Status) => Status.Name === "Pendente")[0]
      ?.id,
    Prog: GetStatusDefault?.filter((Status) => Status.Name === "Progresso")[0]
      ?.id,
    Conc: GetStatusDefault?.filter((Status) => Status.Name === "Concluido")[0]
      ?.id,
    Atra: GetStatusDefault?.filter((Status) => Status.Name === "Atrasadas")[0]
      ?.id,
    Canc: GetStatusDefault?.filter((Status) => Status.Name === "Cancelada")[0]
      ?.id,
    Rev: GetStatusDefault?.filter((Status) => Status.Name === "Revisão")[0]?.id,
  };


  const { id } = useParams();
  const { tasks, refetchTasks } = id ? Get_Tasks(id) : {};
  const { userRole } = Get_userRole(id ?? "");

  const { status, refetch_Status } = Get_All_Status(id!)

  const [pen, setpen] = useState<Task[]>();
  const [prog, setprog] = useState<Task[]>();
  const [done, setdone] = useState<Task[]>();

  // Sensores (Permite Scroll Vertical)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragend = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

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

  const findTaskById = (id: string | null): Task | undefined => {
    if (!id || !tasks) return undefined;
    return tasks.find((task) => task.id === id);
  };

  const activeTask = findTaskById(activeId);

  const [filtro, setFiltro] = useState<{ status?: string; prazo?: string; prioridade?:string}>({});
  useEffect(() => {
    if (!tasks || !Status?.Pen || !Status?.Prog || !Status?.Conc) return;
    if (!tasks) return;

    let filteredtask = tasks

    if (filtro.status && filtro.status !== "todas") {
      let statusId = ""
      console.log(filtro.status);
      

      if (filtro.status === "Pendente") statusId = Status.Pen ?? "";
      else if (filtro.status === "Progresso") statusId = Status.Prog ?? "";
      else if (filtro.status === "Concluidas") statusId = Status.Conc ?? "";

      filteredtask = filteredtask.filter((t) => t.id_status === statusId);
    }
    if (filtro.prazo && filtro.prazo !== "todas") {

      const now = new Date();

      const isSameDay = (date1: Date, date2: Date) =>
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();

      filteredtask = filteredtask.filter((t) => {
        const end = new Date(t.EndDate)

        switch (filtro.prazo) {

          case "dia":
            return isSameDay(end, now);

          case "atraso":
            return end < now;

          case "semana":
            const oneWeek = new Date(now);
            oneWeek.setDate(now.getDate() + 7);
            return end >= now && end <= oneWeek;

          case "mes":
            const oneMonth = new Date(now);
            oneMonth.setMonth(now.getMonth() + 1);
            return end >= now && end <= oneMonth;
          default:
            return true;
        }
      })
    }
   
    
      if (filtro.prioridade && filtro.prioridade != "todas") {
        filteredtask = filteredtask.filter( 
          (t) => t.Priority === filtro.prioridade
        )
  }


    const pending: Task[] = [];
    const inProgress: Task[] = [];
    const completed: Task[] = [];

    filteredtask.forEach((task) => {
      if (task.id_status === Status.Pen) pending.push(task);
      else if (task.id_status === Status.Prog) inProgress.push(task);
      else if (task.id_status === Status.Conc) completed.push(task);
    });

    setpen(pending);
    setprog(inProgress);
    setdone(completed);

  }, [tasks, filtro]);
  

  return (
    <>
      <div className="bg-[#1F2937] min-h-screen w-screen overflow-auto">
        {/* Navbar */}
        <Nav/>

        <main className="flex flex-col min-h-1/2 md:flex-row gap-5 sm:gap-0 m-5 sm:mb-10 items-center sm:items-start justify-center overflow-hidden">
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
          <div className="flex flex-col w-full items-center justify-center gap-5">
            <h2 className="text-white font-semibold text-[29.5px] sm:text-3xl">
              Tarefas do time 📒
            </h2>
            <p className="text-white font-semibold text-xl">
              Arraste para mudar o status e clique para expandir
            </p>
            <div className="flex flex-wrap flex-row gap-5 w-full h-10/12 items-center sm:items-start justify-center overflow-x-auto">
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragend}
                autoScroll={false}
              >
                {tasks !== null && (
                  <DroppableLane
                    id={Status.Pen ?? "PENDING_ID"}
                    userrole={userRole?.id}
                    title="Pendente"
                    minimizeKey="pendente"
                    minimized={minimize.pendente}
                    onToggleMinimize={toggleMinimize}
                  >
                    {pen?.map((pentask) => (
                      <DraggableTask
                        key={pentask.id}
                        idSelected={pentask.id}
                        taskname={pentask.Name}
                        setModal={() => {
                          Setmodaltask(true);
                          Setselect(pentask);
                        }}
                        id={pentask.id}
                      />
                    ))}
                  </DroppableLane>
                )}
                {tasks && (
                  <DroppableLane
                    userrole={userRole?.id}
                    id={Status.Prog ?? "IN_PROGRESS_ID"}
                    title="Progresso"
                    minimizeKey="progresso"
                    minimized={minimize.progresso}
                    onToggleMinimize={toggleMinimize}
                  >
                    {prog?.map((progtask) => (
                      <DraggableTask
                        idSelected={progtask.id}
                        key={progtask.id}
                        id={progtask.id}
                        taskname={progtask.Name}
                        setModal={() => {
                          Setmodaltask(true);
                          Setselect(progtask);
                        }}
                      />
                    ))}
                  </DroppableLane>
                )}
                {tasks && (
                  <DroppableLane
                    id={Status.Conc ?? "COMPLETED_ID"}
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
                          Setmodaltask(true);
                          Setselect(taskdone);
                        }}
                      />
                    ))}
                  </DroppableLane>
                )}

                {status?.map((status) => {
                  const key = normalizeKey(status.Name);
                  const otherTasks =
                    tasks?.filter(
                      (task) =>
                        task.id_status === status.id &&
                        status.id !== Status.Pen &&
                        status.id !== Status.Prog &&
                        status.id !== Status.Conc
                    ) || [];

                  if (otherTasks.length === 0) return null;

                  return (
                    <DroppableLane
                      key={status.id}
                      id={status.id}
                      userrole={userRole?.id}
                      title={status.Name}
                      minimizeKey={key}
                      minimized={minimize[key]}
                      onToggleMinimize={toggleMinimize}
                    >
                      {otherTasks.map((task) => (
                        <DraggableTask
                          idSelected={task.id}
                          key={task.id}
                          id={task.id}
                          taskname={task.Name}
                          setModal={() => {
                            Setmodaltask(true);
                            Setselect(task);
                          }}
                        />
                      ))}
                    </DroppableLane>
                  );
                })}

                {/* DRAG OVERLAY */}
                <DragOverlay>
                  {activeTask ? (
                    <DraggableTask
                      idSelected={activeTask.id}
                      id={activeTask.id}
                      taskname={activeTask.Name}
                      setModal={() => {}}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        </main>

        {/* Modals e Dashboard */}
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

      </div>

      <Dashboard
        id_team={id ? id : ""}
        prazo={id ? id : ""}  
        onFiltroChange={(filtros: FiltroDashboard) =>
          setFiltro(filtros)
          }
      />


    </>
  );
}

export default Lista;
