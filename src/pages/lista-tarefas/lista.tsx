import Nav from "../../components/layouts/nav";
import Modaltaf from "./components/Modaltaf";
import { useEffect, useState } from "react";
import { useFont } from "../../components/font";
import Filtrar from "./components/filtertask";
import { Get_Tasks } from "../../hooks/get_Tasks";
import { useParams } from "react-router-dom";
import type { Task } from "../../api/types/TaskTypes/TaskDTO";
import Criar from "./components/criartarefa";
import { Get_userRole } from "../../hooks/get_userRole";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import DraggableTask from "./components/DragAndDrop/DraggableTask";
import DroppableLane from "./components/DragAndDrop/DroppableLane";
import { TaskService } from "../../api/services/TaskService";
import { Get_status } from "../../hooks/get_Status";

function Lista() {
  // Hook para trazer a fonte
  useFont(" 'Poppins', 'SansSerif' ");

  // Estados para nova lista
  const [novaListaInput, setNovaListaInput] = useState<string>("");
  const [novalista, Setnovalista] = useState<boolean>(false);
  const [tarefaNovaLista, SettarefaNovaLista] = useState<string>("");
  const [nomelista, Setnomelista] = useState<string>("");

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
    nova: false,
  });

  const toggleMinimize = (key: keyof typeof minimize) => {
    setMinimize((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  enum Status {
    Pen = "5832cb1c-d7b2-40f3-8d01-6ee8fbcbb59c",
    Prog = "8fe799c7-0765-4bf0-82b7-f3d39678d260",
    Conc = "979fdfdf-0485-4cce-a8b8-05fd78c33928",
  }

  //filtro  de status e prazo
  const [filtro, setFiltro] = useState<{ status?: string; prazo?: string }>({});

  // Buscar tasks
  const { id } = useParams();
  const { tasks, refetchTasks } = id ? Get_Tasks(id) : {};

  const team = { id: id ?? "", Name: "" };
  const { userRole } = Get_userRole(team);

  const nenhumFiltroAtivo =
    (filtro.status === "todas" || filtro.status === undefined) &&
    (filtro.prazo === "todas" || filtro.prazo === undefined);

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
          await refetchTasks();
        }
      }
    } catch (error) {
      console.log("erro ao fazer requisição", error);
    }
  };


  useEffect(() => {
    if (!tasks) return;

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
      <div className="bg-[#1F2937] h-screen w-screen overflow-hidden">
        {/* Navbar */}
        <Nav SetAll={setall}>
          {/*o filtro envia suas mudanças de status /prazo via prop*/}
          <Filtrar onFiltroChange={(f) => setFiltro(f)} />
        </Nav>

        <main className="flex flex-col md:flex-row gap-5 md:gap-10 m-5 items-start justify-center">
          <div className="flex h-full">
            {userRole?.id === "3" ? (
              <div></div>
            ) : (
              <button
                className="bg-[#251F1F] text-white p-3 rounded-[10px] text-center hover:bg-[#3d3434] cursor-pointer"
                onClick={() => {
                  Setcriar("Criar");
                }}
              >
                + Criar Tarefa
              </button>
            )}
          </div>
          <div className="flex items-center justify-center flex-col gap-5 w-10/12 h-100 sm:flex-row">
            <DndContext onDragEnd={handleDragend}>
              {/* Pendentes */}
              {tasks !== null && (
                <DroppableLane
                  id={Status.Pen}
                  userrole={userRole?.id}
                  title="Pendente"
                  minimizeKey="pendente"
                  minimized={minimize.pendente}
                  onToggleMinimize={toggleMinimize}
                >
                  {/*{pendingTasks.map((pentask)*/}
                  {pen?.map((pentask) => (
                    <DraggableTask
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
                  id={Status.Prog}
                  title="Progresso"
                  minimizeKey="progresso"
                  minimized={minimize.progresso}
                  onToggleMinimize={toggleMinimize}
                >
                  {/*{inProgressTasks.map((progtask)*/}
                  {prog?.map((progtask) => (
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
                  id={Status.Conc}
                  userrole={userRole?.id}
                  title="Concluidas"
                  minimizeKey="concluido"
                  minimized={minimize.concluido}
                  onToggleMinimize={toggleMinimize}
                >
                  {/* doneTasks.map((taskdone)*/}
                  {done?.map((taskdone) => (
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
              {tasks && (
                <DroppableLane
                  id="123"
                  userrole={userRole?.id}
                  title="nada"
                  minimizeKey="concluido"
                  minimized={minimize.concluido}
                  onToggleMinimize={toggleMinimize}
                >
                  {tasks.map((task) =>
                    task.id_status === "123" ? (
                      <DraggableTask
                        key={task.id}
                        id={task.id}
                        taskname={task.Name}
                        setModal={() => {
                          Setselect(task);
                          Setmodaltask(true);
                        }}
                      />
                    ) : (
                      <div></div>
                    )
                  )}
                </DroppableLane>
              )}
            </DndContext>
            
          </div>
        </main>

        {/* Modals */}
        {modaltask && select && (
          <Modaltaf
            userrole={userRole?.id}
            task={select}
            onClose={() => Setmodaltask(false)}
            refetchtask={refetchTasks}
            idSelected={select.id}
            id_team={id ? id : ""}
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
          />
        )}
      </div>
    </>
  );
}

export default Lista;
