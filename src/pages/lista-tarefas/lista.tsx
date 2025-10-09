import Nav from "../../components/nav";
import Modaltaf from "../../components/Modaltaf";
import { useEffect, useState } from "react";
import { useFont } from "../../components/font";
import Filtrar from "../../components/filtro";
import { Get_Tasks } from "../../hooks/get_Tasks";
import { useParams } from "react-router-dom";
import type { Task } from "../../api/types/TaskTypes/TaskDTO";
import Criar from "../../components/criartarefa";
import ListTar from "../../components/ListTar";

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

  return (
    <>
      <div className="bg-[#1F2937] h-screen w-screen">
        {/* Navbar */}
        <Nav>
          <Filtrar />
        </Nav>

        <main className="flex flex-col md:flex-row gap-5 md:gap-10 m-5 items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-5 w-10/12 sm:flex-row">
            {/* Pendentes */}
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
              {pendingTasks.map((pentask) => (
                <div key={pentask.id}>
                  <p
                    className="bg-white cursor-pointer h-[35px] p-1 text-center rounded-[5px]"
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

            {/* Em progresso */}
            <ListTar
              title="Progresso"
              minimizeKey="progresso"
              minimized={minimize.pendente}
              onToggleMinimize={toggleMinimize}
              onCreateClick={() => {
                Setcriar("Criar");
                setstatusForCreate("Progresso");
              }}
            >
              {inProgressTasks.map((progtask) => (
                <div key={progtask.id}>
                  <p
                    className="bg-white cursor-pointer h-[35px] text-center p-1 rounded-[5px]"
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

            {/* Concluídas */}
            <ListTar
              title="Concluidas"
              minimizeKey="concluido"
              minimized={minimize.pendente}
              onToggleMinimize={toggleMinimize}
              onCreateClick={() => {
                Setcriar("Criar");
                setstatusForCreate("Concluido");
              }}
            >
              {doneTasks.map((taskdone) => (
                <div key={taskdone.id}>
                  <p
                    className="bg-white cursor-pointer h-[35px] text-center p-1 rounded-[5px]"
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

                  {!nomelista && (
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
          </div>
        </main>

        {/* Modals */}
        {modaltask && select && (
          <Modaltaf
            task={select}
            onClose={() => Setmodaltask(false)}
            idSelected={select.id}
            setcriar={() => Setcriar("Editar")}
          />
        )}

        {criar && (
          <Criar
            title={criar}
            onClose={() => Setcriar("")}
            idSelected= {select?.id}
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
