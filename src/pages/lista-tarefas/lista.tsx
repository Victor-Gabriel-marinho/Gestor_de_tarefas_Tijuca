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
  const [statusForCreate, setstatusForCreate] = useState<string>("");

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

  //filtro  de status e prazo
  const [filtro, setFiltro] = useState<{ status?: string; prazo?: string }>({});

  // Buscar tasks
  const { id } = useParams();
  const { tasks, refetchTasks } = id ? Get_Tasks(id) : { tasks: [] };
  const team = { id: id ?? "", Name: "" };
  const { userRole } = Get_userRole(team);
  // States para
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!tasks) return;

    setPendingTasks(tasks.filter((t) => t.Status === "Pendente"));
    setInProgressTasks(tasks.filter((t) => t.Status === "Progresso"));
    setDoneTasks(tasks.filter((t) => t.Status === "Concluido"));
  }, [tasks]);

  // função que auxilia para filtrar por status
  const filtrarPorStatus = (t: Task, status?: string) => {
    if (!status) return true;
    switch (status) {
      case "concluido":
        return t.Status === "Concluido";
      case "naoConcluido":
        return t.Status !== "Concluido";
      case "pendente":
        return t.Status === "Pendente";
      default:
        return true;
    }
  };

  //função que auxilia a filtrar por prazo
  const filtrarprazo = (t: Task, prazo?: string) => {
    if (!prazo) return true;
    const hoje = new Date();
    const prazoData = new Date(t.EndDate);

    switch (prazo) {
      case "atrasadas":
        return prazoData < hoje;
      case "dia":
        return prazoData <= new Date(hoje.getTime() + 24 * 60 * 60 * 1000); //24h * 60min * 60s * 1000ms

      case "semana":
        return prazoData <= new Date(hoje.getTime() + 7 * 60 * 60 * 1000);
      case "mes":
        return prazoData <= new Date(hoje.getTime() + 30 * 60 * 60 * 1000);
      default:
        return true;
    }
  };

  //aplica os filtros ás listas já separadas por status
  const pendingTasksFiltradas = pendingTasks.filter(
    (t) => filtrarPorStatus(t, filtro.status) && filtrarprazo(t, filtro.prazo)
  );
  const inProgressTasksFiltradas = inProgressTasks.filter(
    (t) => filtrarPorStatus(t, filtro.status) && filtrarprazo(t, filtro.prazo)
  );
  const doneTasksFiltradas = doneTasks.filter(
    (t) => filtrarPorStatus(t, filtro.status) && filtrarprazo(t, filtro.prazo)
  );

  const nenhumFiltroAtivo =
    (filtro.status === "todas" || filtro.status === undefined) &&
    (filtro.prazo === "todas" || filtro.prazo === undefined);

  useEffect(() => {
    if (!nenhumFiltroAtivo) {
      Setnovalista(false); // Força o fechamento do textarea/input de criar lista
    }
  }, [nenhumFiltroAtivo]);

  const setall = () => {
    setFiltro((prevfiltro) => ({
      ...prevfiltro,
      status: "todas",
      prazo: "",
    }));
  };

  const handleDragend = async (event:DragEndEvent ) => {
    const { active, over } = event;

    if (!over) return;

    const draggedTaskId = active.id.toString();
    const newStatus = over.id.toString(); 

    if (active.data.current?.status === newStatus) return;

    try {
      const response = await TaskService.AlterStatus(draggedTaskId, newStatus)
      if (response) {
        if (refetchTasks) {
          await refetchTasks();
        }
      }
    } catch(error){
      console.log("erro ao fazer requisição", error)
    }   
  }

  return (
    <>
      <div className="bg-[#1F2937] h-screen w-screen overflow-hidden">
        {/* Navbar */}
        <Nav SetAll={setall}>
          {/*o filtro envia suas mudanças de status /prazo via prop*/}
          <Filtrar onFiltroChange={(f) => setFiltro(f)} />
        </Nav>

        <main className="flex flex-col md:flex-row gap-5 md:gap-10 m-5 items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-5 w-10/12 h-100 sm:flex-row">
          
            <DndContext onDragEnd={handleDragend}>

              {/* Pendentes */}
              {pendingTasksFiltradas.length >= 0 && (
                <DroppableLane
                id="Pendente"
                  userrole={userRole?.id}
                  title="Pendente"
                  minimizeKey="pendente"
                  minimized={minimize.pendente}
                  onToggleMinimize={toggleMinimize}
                  onCreateClick={() => {
                    Setcriar("Criar");
                    setstatusForCreate("Pendente");
                  }}
                >
                  {/*{pendingTasks.map((pentask)*/}
                  {pendingTasksFiltradas.map((pentask) => (
                   <DraggableTask
                    key={pentask.id}
                    taskname={pentask.Name}
                    setModal={()=>{
                    Setselect(pentask);
                    Setmodaltask(true);}}
                    id= {pentask.id}
                   />
                  ))}
                </DroppableLane>
              )}
              {/* Em progresso */}
              {inProgressTasksFiltradas.length >= 0 && (
                <DroppableLane
                  userrole={userRole?.id}
                  id="Progresso"
                  title="Progresso"
                  minimizeKey="progresso"
                  minimized={minimize.progresso}
                  onToggleMinimize={toggleMinimize}
                  onCreateClick={() => {
                    Setcriar("Criar");
                    setstatusForCreate("Progresso");
                  }}
                >
                  {/*{inProgressTasks.map((progtask)*/}
                  {inProgressTasksFiltradas.map((progtask) => (
                   <DraggableTask
                   key={progtask.id}
                   id= {progtask.id}
                    taskname={progtask.Name}
                    setModal={()=>{
                    Setselect(progtask);
                    Setmodaltask(true);}}
                   />
                  ))}
                </DroppableLane>
              )}
              {/* Concluídas */}
              {doneTasksFiltradas.length >= 0 && (
                <DroppableLane
                id="Concluido"
                  userrole={userRole?.id}
                  title="Concluidas"
                  minimizeKey="concluido"
                  minimized={minimize.concluido}
                  onToggleMinimize={toggleMinimize}
                  onCreateClick={() => {
                    Setcriar("Criar");
                    setstatusForCreate("Concluido");
                  }}
                >
                  {/* doneTasks.map((taskdone)*/}
                  {doneTasksFiltradas.map((taskdone) => (
                   <DraggableTask
                   key={taskdone.id}
                   id= {taskdone.id}
                    taskname={taskdone.Name}
                    setModal={()=>{
                    Setselect(taskdone);
                    Setmodaltask(true);}}
                   />
                  ))}
                </DroppableLane>
              )}
            </DndContext>

            {/* Nova lista */}
            {userRole?.id === "3" ? (
              <div></div>
            ) : (
              <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full gap-y-1 max-w-60">
                <p className="text-white font-semibold truncate resize-none p-1">
                  {nomelista}
                </p>

                {!minimize.nova && (
                  <>
                    {novalista && (
                      <textarea
                        className="bg-white text-black outline-none placeholder-gray-400 h-[35px] w-full truncate resize-none"
                        value={novaListaInput}
                        onChange={(e) => setNovaListaInput(e.target.value)}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" &&
                            novaListaInput.trim() !== ""
                          ) {
                            event.preventDefault();
                            Setnomelista(novaListaInput);
                            setNovaListaInput("");
                            Setnovalista(false);
                          }
                        }}
                      />
                    )}

                    {tarefaNovaLista && (
                      <p
                        className="bg-white cursor-pointer truncate h-[35px] text-center p-1 rounded-[5px]"
                        onClick={() => {
                          Setmodaltask(true);
                        }}
                      >
                        {tarefaNovaLista}
                      </p>
                    )}

                    {!nomelista && nenhumFiltroAtivo && (
                      <button
                        id="bnt-lista"
                        className="bg-[#251F1F] text-white text-center rounded-[5px] p-1 hover:bg-[#493f3f] w-full cursor-pointer"
                        onClick={() => Setnovalista(true)}
                      >
                        + Criar nova lista
                      </button>
                    )}

                    {nomelista && (
                      <button
                        className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
                        onClick={() => {
                          Setcriar("Criar");
                          setstatusForCreate("Nova");
                        }}
                      >
                        + Criar tarefa
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
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
            setcriar={() => Setcriar("Editar")}
          />
        )}

        {criar && (
          <Criar
            title={criar}
            onClose={() => Setcriar("")}
            closeModal={() => Setmodaltask(false)}
            Selected={select}
            refetchTasks={refetchTasks}
            statusForCreate={statusForCreate}
            id_team={id}
          />
        )}
      </div>
    </>
  );
}

export default Lista;
