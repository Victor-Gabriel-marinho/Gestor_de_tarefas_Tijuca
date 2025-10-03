import Nav from "../../components/nav";
import Modaltaf from "../../components/Modaltaf";
import { useEffect, useState } from "react";
import { useFont } from "../../components/font";
import { FiMinimize2 } from "react-icons/fi";
import Filtrar from "../../components/filtro";
import { Get_Tasks } from "../../hooks/get_Tasks";
import { useParams } from "react-router-dom";
import type { Task } from "../../api/types/TaskTypes/TaskDTO";
import Criar from "../../components/criartarefa";

function Lista() {
  // Hook para trazer a fonte
  useFont(" 'Poppins', 'SansSerif' ");

  // Estados para tarefas
  const [inputpen, Setinputpen] = useState<boolean>(false);
  const [tarefapen, Settarefapen] = useState<string>("");
  const [tarefaprog, Settarefaprog] = useState<string>("");
  const [tarefaconc, Settarefaconc] = useState<string>("");
  const [tarefaatrasadas, Settarefasatrasadas] = useState<string>("");

  // Estados para nova lista
  const [novaListaInput, setNovaListaInput] = useState<string>("");
  const [novalista, Setnovalista] = useState<boolean>(false);
  const [novatarefa, Setnovatarefa] = useState<boolean>(false);
  const [tarefaNovaLista, SettarefaNovaLista] = useState<string>("");
  const [nomelista, Setnomelista] = useState<string>("");

  // Modal e seleção
  const [modaltask, Setmodaltask] = useState<boolean>(false);
  const [select, Setselect] = useState<string>("");

  // Criar tarefa
  const [criar, Setcriar] = useState<boolean>(false);
  const [ListaAlvo, Setlistaalvo] = useState<"pendente" | "progresso" | "concluido" | "nova" | null>(null);

  // Minimizar listas
  const [minimize, setMinimize] = useState({
    pendente: false,
    fazendo: false,
    concluido: false,
    atrasadas: false,
    nova: false,
  });

  const toggleMinimize = (key: keyof typeof minimize) => {
    setMinimize((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Buscar tasks
  const { id } = useParams();
  const { tasks } = id ? Get_Tasks(id) : { tasks: [] };

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
            <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold flex-1 text-center">Pendente</p>
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
                onClick={() => Setcriar(!criar)}
              >
                + Criar Tarefa
              </button>
            </div>

            {/* Em progresso */}
            <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold flex-1 text-center">Em progresso</p>
                <div className="flex justify-end p-1 rounded-[15px]">
                  <FiMinimize2
                    color="white"
                    className="hover:scale-125 cursor-pointer"
                    onClick={() => toggleMinimize("fazendo")}
                  />
                </div>
              </div>

              {!minimize.fazendo &&
                inProgressTasks.map((progtask) => (
                  <div key={progtask.id}>
                    <p
                      className="bg-white cursor-pointer h-[35px] text-center p-1 rounded-[5px]"
                      onClick={() => {
                        Setselect(progtask.Name);
                        Setmodaltask(true);
                      }}
                    >
                      {progtask.Name}
                    </p>
                  </div>
                ))}

              <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
               onClick={() => Setcriar(!criar)}>
                + Criar Tarefa
              </button>
            </div>

            {/* Concluídas */}
            <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold flex-1 text-center">Concluído</p>
                <div className="flex justify-end p-1 rounded-[15px]">
                  <FiMinimize2
                    color="white"
                    className="hover:scale-125 cursor-pointer"
                    onClick={() => toggleMinimize("concluido")}
                  />
                </div>
              </div>

              {!minimize.concluido &&
                doneTasks.map((taskdone) => (
                  <div key={taskdone.id}>
                    <p
                      className="bg-white cursor-pointer h-[35px] text-center p-1 rounded-[5px]"
                      onClick={() => {
                        Setselect(taskdone.Name);
                        Setmodaltask(true);
                      }}
                    >
                      {taskdone.Name}
                    </p>
                  </div>
                ))}

              <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
               onClick={() => Setcriar(!criar)}
              >
                + Criar Tarefa
              </button>
            </div>

                
            {/* Pendentes */}
            <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
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
                 onClick={() => Setcriar(!criar)}
              >
                + Criar Tarefa
              </button>
            </div>


            {/* Nova lista */}
            <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full gap-y-1 max-w-60">
              <p className="text-white font-semibold truncate resize-none p-1">{nomelista}</p>

              {!minimize.nova && (
                <>
                  {novalista && (
                    <textarea
                      className="bg-white text-black outline-none placeholder-gray-400 h-[35px] w-full truncate resize-none"
                      value={novaListaInput}
                      onChange={(e) => setNovaListaInput(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && novaListaInput.trim() !== "") {
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
                        Setselect(tarefaNovaLista);
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
                       onClick={() => Setcriar(!criar)}
                    >
                      + Criar tarefa
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </main>

        {/* Modais */}
        {modaltask && select && (
          <Modaltaf
            task={select}
            onClose={() => Setmodaltask(false)}
            onDelete={() => {
              if (select === tarefapen) Settarefapen("");
              else if (select === tarefaprog) Settarefaprog("");
              else if (select === tarefaconc) Settarefaconc("");
              else if (select === tarefaNovaLista) SettarefaNovaLista("");
              else if (select === tarefaatrasadas) Settarefasatrasadas("");
            }}
            onUpdateTask={(novoNome: string) => {
              if (select === tarefapen) Settarefapen(novoNome);
              else if (select === tarefaprog) Settarefaprog(novoNome);
              else if (select === tarefaconc) Settarefaconc(novoNome);
              else if (select === tarefaNovaLista) SettarefaNovaLista(novoNome);
              else if (select === tarefaatrasadas) Settarefasatrasadas(novoNome);
            }}
          />
        )}

        {criar && (
          <Criar
            onClose={() => Setcriar(false)}
            task={(nome: string) => {
              if (ListaAlvo === "pendente") Settarefapen(nome);
              else if (ListaAlvo === "progresso") Settarefaprog(nome);
              else if (ListaAlvo === "concluido") Settarefaconc(nome);
              else if (ListaAlvo === "nova") SettarefaNovaLista(nome);
              else if (ListaAlvo === "atrasadas") Settarefasatrasadas(nome);
            }}
          />
        )}
      </div>
    </>
  );
}

export default Lista;
