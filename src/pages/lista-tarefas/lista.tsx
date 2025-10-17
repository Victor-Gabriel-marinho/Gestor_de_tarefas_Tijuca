import Nav from "../../components/layouts/nav";
import Modaltaf from "./components/Modaltaf";
import { useEffect, useState } from "react";
import { useFont } from "../../components/font";
import Filtrar from "./components/filtertask";
import { Get_Tasks } from "../../hooks/get_Tasks";
import { useParams } from "react-router-dom";
import type { Task } from "../../api/types/TaskTypes/TaskDTO";
import Criar from "./components/criartarefa";
import ListTar from "./components/ListTar";
import { Get_userRole } from "../../hooks/get_userRole";

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
const [filtro, setFiltro] = useState<{status?:string; prazo?:string}>({})

  // Buscar tasks
  const { id } = useParams();
  const { tasks, refetchTasks } = id ? Get_Tasks(id) : { tasks: [] };

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
}

//função que auxilia a filtrar por prazo
const filtrarprazo = (t: Task, prazo?:string) => {
  if (!prazo) return true 
  const hoje = new Date()
  const prazoData = new Date(t.EndDate)

  switch (prazo) {
    case "atrasadas":
      return prazoData < hoje 
    case "dia":
      return prazoData <= new Date(hoje.getTime() + 24 * 60 * 60 * 1000) //24h * 60min * 60s * 1000ms
      
    case "semana":
      return prazoData <= new Date(hoje.getTime() + 7 * 60 * 60 * 1000)
    case "mes":
      return prazoData <= new Date(hoje.getTime() + 30 * 60 * 60 * 1000)
    default:
      return true
  }
}

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
  (filtro.status === 'todas' || filtro.status === undefined) &&
  (filtro.prazo === 'todas' || filtro.prazo === undefined)

const verificaLista = 
  !!nomelista || 
  // 2. Mostrar se está no modo de criação (o textarea está ativo)
  novalista || 
  // 3. Mostrar se tem uma tarefa para exibir
  !!tarefaNovaLista || 
  // 4. Mostrar se os filtros não estão ativos (para exibir o botão '+ Criar nova lista')
  (nenhumFiltroAtivo && !nomelista); 


   useEffect(() => {
    if (!nenhumFiltroAtivo) {
        Setnovalista(false); // Força o fechamento do textarea/input de criar lista
    }
}, [nenhumFiltroAtivo]);

  const setall = () => {
    setFiltro(prevfiltro => ({
      ...prevfiltro,
      status:'todas',
      prazo:""
    }))
  }


 

  return (
    <>
      <div className="bg-[#1F2937] h-screen w-screen" >
        {/* Navbar */}
        <Nav SetAll={setall}>
          {/*o filtro envia suas mudanças de status /prazo via prop*/}
          <Filtrar onFiltroChange={(f) => setFiltro(f)} />
        </Nav>

        <main className="flex flex-col md:flex-row gap-5 md:gap-10 m-5 items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-5 w-10/12 h-100 sm:flex-row">
            {/* Pendentes */}
            {pendingTasksFiltradas.length >= 0 && (
              <ListTar
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
                  <div key={pentask.id}>
                    <p
                      className="bg-white cursor-pointer p-1 flex justify-center items-center hover:scale-110  flex-wrap truncate  text-center rounded-[5px]"
                      onClick={() => {
                        Setselect(pentask);
                        Setmodaltask(true);
                      }}
                    >
                      {pentask.Name}
                    </p>
                  </div>
                ))}
              </ListTar>
            )}
            {/* Em progresso */}
            {inProgressTasksFiltradas.length >= 0 && (
              <ListTar
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
                  <div key={progtask.id}>
                    <p
                      className="bg-white cursor-pointer text-center flex justify-center items-center hover:scale-110 flex-wrap max-w-[216px] p-1 rounded-[5px]"
                      onClick={() => {
                        Setselect(progtask);
                        Setmodaltask(true);
                      }}
                    >
                      {progtask.Name}
                    </p>
                  </div>
                ))}
              </ListTar>
            )}

            {/* Concluídas */}
            {doneTasksFiltradas.length >= 0 && (
              <ListTar
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
                  <div key={taskdone.id}>
                    <p
                      className="bg-white cursor-pointer flex flex-wrap truncate hover:scale-110  text-center p-1 justify-center rounded-[5px]"
                      onClick={() => {
                        Setselect(taskdone);
                        Setmodaltask(true);
                      }}
                    >
                      {taskdone.Name}
                    </p>
                  </div>
                ))}
              </ListTar>
            )}

            {/* Tarefas atrasadas */}
            {/* <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold flex-1 text-center">Atrasadas</p>
                <div className="flex justify-end p-1 rounded-[15px]">
                  <FiMinimize2
                    color="white"
                    className="hover:scale-125 cursor-pointer"
                    onClick={() => toggleMinimize("pendente")}
                  />
                </div>
              </div>

              {!minimize.pendente &&
                pendingTasks.map((pentask) => (
                  <div key={pentask.id}>
                    <p
                      className="bg-white cursor-pointer h-[35px] p-1 text-center rounded-[5px]"
                      onClick={() => {
                        Setselect(pentask.Name);
                        Setmodaltask(true);
                      }}
                    >
                      {pentask.Name}
                    </p>

                    {inputpen && (
                      <textarea
                        placeholder="nome"
                        className="bg-white outline-none placeholder-gray-400 h-[35px] resize-none"
                        value={tarefapen}
                        onChange={(e) => Settarefapen(e.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && tarefapen.trim() !== "") {
                            event.preventDefault();
                            Setinputpen(false);
                          }
                        }}
                      />
                    )}
                  </div>
                ))}

              <button
                className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
                 onClick={() => {Setcriar(!criar); setstatusForCreate("Pendente")}}
              >
                + Criar Tarefa
              </button>
            </div> */}

            {/* Nova lista */}
            {verificaLista && (
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
