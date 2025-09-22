import Nav from "../../components/nav"
import Modaltaf from "../../components/Modaltaf"
import { useState } from "react";
import { useFont } from "../../components/font";
import { FiMinimize2 } from "react-icons/fi";
import Filtrar from "../../components/filtro";



function Lista() {

    
   


  




    {/*hook para trazer a fonte*/}
    useFont(" 'Poppins', 'SansSerif' ");

    {/*constantes para o input e a tarefa da lista pendente*/}
    const [inputpen, Setinputpen] = useState<boolean>(false)
    const [tarefapen, Settarefapen] = useState<string>("")

    {/*constantes para o input e a tarefa da lista em progresso*/}
    const [inputprog, Setinputprog] = useState<boolean>(false)
    const [tarefaprog, Settarefaprog] = useState<string>("")

    {/*constantes para o input e a tarefa da lista concluídas*/}
    const [inputconc, Setinputconc] = useState<boolean>(false)
    const [tarefaconc, Settarefaconc] = useState<string>("")

    {/*constantes para criar nova lista e guardar o seu nome*/}
    const [novaListaInput, setNovaListaInput] = useState<string>("")
    const [novalista, Setnovalista] = useState<boolean>(false)
    const [nomelista, Setnomelista] = useState<string>("")

    {/*constantes para criar uma nova tarefa para ela*/}
    const [novatarefa, Setnovatarefa] = useState<boolean>(false)
    const [tarefaNovaLista, SettarefaNovaLista] = useState<string>("")

    {/*constantes para para chamar o componente modal_taf para a tarefa selecionada*/}
    const [modaltask, Setmodaltask] = useState<boolean>(false)
    const [select, Setselect] = useState<string>("")
    
    

    {/*objeto para minimizar as listas*/}
    const [minimize, setMinimize] = useState({
        pendente: false,
        fazendo: false,
        concluido: false,
        nova: false,
    });

    {/*constante que necessita do objeto para minimizar a tarefa*/}
    const toggleMinimize = (key: keyof typeof minimize) => {
        setMinimize(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <>
            <div className="bg-[#1F2937] h-screen w-screen">
                {/*navbar da página*/}
                <Nav>
                    <Filtrar />
                    
                </Nav>

                <main className=" flex  flex-col md:flex-row gap-5 md:gap-10 m-5 items-center justify-center">
                    <div className="flex items-center justify-center flex-col gap-5 w-10/12 sm:flex-row ">
                        <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
                            {/*lista de tarefas pendente*/}
                            <div className="flex items-center justify-center">
                                <p className="text-white font-semibold fixed">Pendente</p>

                                <div className="flex justify-end p-1 rounded-[15px]">
                                    {/*icone para minimizar tarefa*/}
                                    <FiMinimize2 color="white" className="hover:scale-125 ml-[170px]"
                                        onClick={() => toggleMinimize("pendente")}
                                    />
                                </div>
                            </div>


  
   
  
                            {/*função minimizar do pendente*/}                           
                            {!minimize.pendente && (
                                <>
                                
                                    <p className="bg-white cursor-pointer h-[35px] p-1 text-center rounded-[5px]" onClick={() => { Setselect("Começar API"); Setmodaltask(true) }}>Começar API</p>
                                    <p className={`bg-white cursor-pointer truncate text-center p-1 rounded-[5px] ${tarefapen ? 'block h-[35px]' : 'hidden'}`} onClick={() => { Setselect(tarefapen); Setmodaltask(true) }}>{tarefapen}</p>
                                    {inputpen && (<textarea placeholder="nome" className="bg-white outline-none placeholder-gray-400 h-[35px] resize-none"
                                        value={tarefapen}
                                        onChange={(e) => Settarefapen(e.target.value)}
                                        onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); if (tarefapen.trim() !== "") { Setinputpen(false) } } }}
                                    />)
                                    }
                                    <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
                                        onClick={() => Setinputpen(!inputpen)}
                                    >+ Criar Tarefa</button>

                                </>
                            )}
                        </div>
                        <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
                            {/*lista de terfas em progresso*/}
                            <div className="flex items-center justify-center">
                                <p className="text-white font-semibold fixed">Fazendo</p>

                                <div className="flex justify-end p-1 rounded-[15px]">
                                    {/*icone para minimizar tarefa*/}
                                    <FiMinimize2 color="white" className="hover:scale-125 ml-[170px]"
                                        onClick={() => toggleMinimize("fazendo")}
                                    />
                                </div>

                            </div>

                            {/*minimizar das tarefas em progresso*/}
                            {!minimize.fazendo && (
                                <>
                                    <p className="bg-white cursor-pointer h-[35px] text-center p-1 rounded-[5px]" onClick={() => { Setselect("Front-end"); Setmodaltask(!modaltask) }}>Front-end</p>
                                    <p className={`bg-white cursor-pointer truncate text-center p-1 rounded-[5px] ${tarefaprog ? 'block h-[35px]' : 'hidden'}`} onClick={() => { Setselect(tarefaprog); Setmodaltask(true) }}>{tarefaprog}</p>
                                    {/*input para escrever a tarefas em porgresso*/}
                                    {inputprog && (<textarea placeholder="nome" className="bg-white outline-none placeholder-gray-400 h-[35px] resize-none"
                                        value={tarefaprog}
                                        onChange={(e) => Settarefaprog(e.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault(); if (tarefaprog.trim() !== "") {
                                                    Setinputprog(false)
                                                }
                                            }
                                        }}
                                    />)
                                    }
                                    {/*botão para criar tarefa para lista de em progresso*/}
                                    <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
                                        onClick={() => Setinputprog(!inputprog)}
                                    >+ Criar Tarefa</button>
                                </>
                            )}
                        </div>
                        <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
                            {/*lista de tarefas concluídas*/}
                            <div className="flex items-center justify-center">
                                <p className="text-white font-semibold fixed">Concluído</p>
                                <div className="flex justify-end p-1 rounded-[15px]">
                                    {/*icone para minimizar tarefa*/}
                                    <FiMinimize2 color="white" className="hover:scale-125 ml-[170px]"
                                        onClick={() => toggleMinimize("concluido")}
                                    />
                                </div>
                            </div>
                            {/*função de minimizar concluídas*/}
                            {!minimize.concluido && (
                                <>
                                    <p className="bg-white cursor-pointer h-[35px] text-center p-1 rounded-[5px]" onClick={() => { Setselect("Fazer Design"); Setmodaltask(!modaltask) }}>Fazer Design</p>
                                    <p className={`bg-white cursor-pointer truncate text-center p-1 rounded-[5px] ${tarefaconc ? 'block h-[35px]' : 'hidden'}`} onClick={() => { Setselect(tarefaconc); Setmodaltask(true) }}>{tarefaconc}</p>
                                    {inputconc && (<textarea placeholder="nome" className="bg-white outline-none placeholder-gray-400 h-[35px] resize-none"
                                        value={tarefaconc}
                                        onChange={(e) => Settarefaconc(e.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault(); if (tarefaconc.trim() !== "") {
                                                    Setinputconc(false)
                                                }
                                            }
                                        }}
                                    />)
                                    }
                                    {/*botão para criar tarefa da lista de concluídas*/}
                                    <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
                                        onClick={() => Setinputconc(!inputconc)}
                                    >+ Criar Tarefa</button>
                                </>
                            )}
                        </div>
                        <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full  gap-y-1 max-w-60">
                            {/*botão para criar nova lista*/}
                            <div className="flex items-center justify-center" >
                                <p className="text-white font-semibold truncate resize-none p-1">{nomelista}</p>

                                    {nomelista && tarefaNovaLista && (
                                         <div className="flex justify-end p-1 rounded-[15px]">
                                            {/*icone para minimizar tarefa*/}
                                            <FiMinimize2 color="white" className="hover:scale-125 ml-[170px]" onClick={() => toggleMinimize("nova")} />
                                        </div>
                                    )}
                                

                            </div>
                            {/*função para minimizar nova lista*/}
                            {!minimize.nova && (
                                <>
                                    {novalista && (<textarea className="bg-white text-black outline-none placeholder-gray-400 h-[35px]  w-full truncate resize-none"
                                        value={novaListaInput}
                                        onChange={(e) => setNovaListaInput(e.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" && novaListaInput.trim() !== "") {
                                                event.preventDefault()
                                                Setnomelista(novaListaInput)
                                                setNovaListaInput("")
                                                Setnovalista(false)
                                            }
                                        }} />)}


                                    {tarefaNovaLista && (
                                        <p className="bg-white cursor-pointer truncate h-[35px] text-center p-1 rounded-[5px]" onClick={() => { Setselect(tarefaNovaLista); Setmodaltask(!modaltask) }}>{tarefaNovaLista}</p>
                                    )}

                                    {nomelista && novatarefa && (
                                        <textarea placeholder="digite" className="bg-white outline-none placeholder-gray-400 h-[35px] w-full truncate resize-none"
                                            value={tarefaNovaLista}
                                            onChange={(e) => SettarefaNovaLista(e.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" && tarefaNovaLista.trim() !== "") {
                                                    event.preventDefault();
                                                    if (tarefaNovaLista.trim() !== "") { event.preventDefault(); Setnovatarefa(false) }
                                                }
                                            }}
                                        />)}

                                    {/*botão para criar nova lista*/}    
                                    {!nomelista && (
                                        <button id="bnt-lista" className="bg-[#251F1F] text-white text-center  rounded-[5px] p-1  hover:bg-[#493f3f]  w-full cursor-pointer " onClick={() => Setnovalista(true)} >
                                            + Criar nova lista
                                        </button>
                                    )}
                                    {/*botão para criar tarefa para nova lista*/}
                                    {nomelista && (
                                        <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434]  cursor-pointer " onClick={() => Setnovatarefa(true)}>
                                            + Criar tarefa
                                        </button>

                                    )}
                                </>
                            )}



                        </div>
                    </div>
                </main>
            </div>

            {modaltask && select && (<Modaltaf task={select} onClose={() => Setmodaltask(false)} />)}
            
                
        </>
    )
}

export default Lista;