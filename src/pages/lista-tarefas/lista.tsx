import Nav from "../../components/nav"
import Modaltaf from "../../components/Modaltaf"
import { useState } from "react";
import { useFont } from "../../components/font";

function Lista() {

    useFont(" 'Poppins', 'SansSerif' ");
   
    const [inputpen, Setinputpen] = useState<boolean>(false)
    const [tarefapen, Settarefapen] = useState<string>("")


    const [inputprog, Setinputprog] = useState<boolean>(false)
    const [tarefaprog, Settarefaprog] = useState<string>("")

 
    const [inputconc, Setinputconc] = useState<boolean>(false)
    const [tarefaconc, Settarefaconc] = useState<string>("")

    const [novaListaInput, setNovaListaInput] = useState<string>("")
    const [novalista, Setnovalista] = useState<boolean>(false)
    const [nomelista, Setnomelista] = useState<string>("")

    const [novatarefa, Setnovatarefa] = useState<boolean>(false)
    const [tarefaNovaLista, SettarefaNovaLista] = useState<string>("")


    const [modaltask, Setmodaltask] = useState<boolean>(false)

    const [select, Setselect] = useState<string>("")




    return (
        <>
            <div className="bg-[#1F2937] h-screen w-screen">

                <Nav />

                <main className=" flex  flex-col md:flex-row gap-5 md:gap-10 m-5 items-center justify-center">
                    <div className="flex items-center justify-center flex-col gap-5 w-10/12 sm:flex-row ">
                        <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
                            <p className="text-white font-semibold ">Pendente</p>
                            <p className="bg-white cursor-pointer h-[35px] p-1 text-center rounded-[5px]" onClick={() => { Setselect("Começar API"); Setmodaltask(true) }}>Começar API</p>
                            <p className={`bg-white cursor-pointer truncate text-center p-1 rounded-[5px] ${tarefapen ? 'block h-[35px]' : 'hidden'}`} onClick={() => { Setselect(tarefapen); Setmodaltask(true) }}>{tarefapen}</p>
                            {inputpen && (<textarea placeholder="nome" className="bg-white outline-none placeholder-gray-400 h-[35px] resize-none"
                                value={tarefapen}
                                onChange={(e) => Settarefapen(e.target.value)}
                                onKeyDown={(event) => {if (event.key === "Enter") { event.preventDefault(); if (tarefapen.trim() !== "") {Setinputpen(false)}}}}
                            />)
                            }
                            <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
                                onClick={() => Setinputpen(!inputpen)}
                            >+ Criar Tarefa</button>
                        </div>
                        <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
                            <p className="text-white font-semibold">Em Progresso</p>
                            <p className="bg-white cursor-pointer h-[35px] text-center p-1 rounded-[5px]" onClick={() => { Setselect("Front-end"); Setmodaltask(!modaltask) }}>Front-end</p>
                            <p className={`bg-white cursor-pointer truncate text-center p-1 rounded-[5px] ${tarefaprog ? 'block h-[35px]' : 'hidden'}`} onClick={() => { Setselect(tarefaprog); Setmodaltask(true) }}>{tarefaprog}</p>

                            {inputprog && (<textarea placeholder="nome" className="bg-white outline-none placeholder-gray-400 h-[35px] resize-none"
                                value={tarefaprog}
                                onChange={(e) => Settarefaprog(e.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {event.preventDefault(); if (tarefaprog.trim() !== "") {
                                        Setinputprog(false)
                                    }}
                                }}
                            />)
                            }
                            <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
                                onClick={() => Setinputprog(!inputprog)}
                            >+ Criar Tarefa</button>
                        </div>
                        <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
                            <p className="text-white font-semibold">Concluído</p>
                            <p className="bg-white cursor-pointer h-[35px] text-center p-1 rounded-[5px]" onClick={() => { Setselect("Fazer Design"); Setmodaltask(!modaltask) }}>Fazer Design</p>
                            <p className={`bg-white cursor-pointer truncate text-center p-1 rounded-[5px] ${tarefaconc ? 'block h-[35px]' : 'hidden'}`} onClick={() => { Setselect(tarefaconc); Setmodaltask(true) }}>{tarefaconc}</p>
                            {inputconc && (<textarea placeholder="nome" className="bg-white outline-none placeholder-gray-400 h-[35px] resize-none"
                                value={tarefaconc}
                                onChange={(e) => Settarefaconc(e.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") { event.preventDefault(); if (tarefaconc.trim() !== "") {
                                        Setinputconc(false)
                                    }}
                                }}
                            />)
                            }
                            <button className="bg-[#251F1F] text-white text-center hover:bg-[#3d3434] cursor-pointer"
                                onClick={() => Setinputconc(!inputconc)}
                            >+ Criar Tarefa</button>
                        </div>
                        <div className="bg-[#251F1F] text-center p-3 rounded-[5px] flex flex-col w-full h-full gap-y-2 max-w-60">
                            <p className="text-white font-semibold truncate">{nomelista}</p>

                            {novalista && (<textarea className="bg-white text-black outline-none placeholder-gray-400 h-[35px]  w-full truncate resize-none"
                                value={novaListaInput}
                                onChange={(e) => setNovaListaInput(e.target.value)}
                                onKeyDown={(event) => { if (event.key === "Enter" && novaListaInput.trim() !== "") { 
                                    event.preventDefault()
                                    Setnomelista(novaListaInput)
                                    setNovaListaInput("")
                                    Setnovalista(false)
                                    }}} />)}

                            {tarefaNovaLista && (
                                <p className="bg-white cursor-pointer truncate h-[35px] text-center p-1 rounded-[5px]" onClick={() => { Setselect(tarefaNovaLista); Setmodaltask(!modaltask) }}>{tarefaNovaLista}</p>
                            )}

                            {nomelista && novatarefa && (
                                <textarea placeholder="digite" className="bg-white outline-none placeholder-gray-400 h-[35px] w-full truncate resize-none"
                                    value={tarefaNovaLista}
                                    onChange={(e) => SettarefaNovaLista(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {event.preventDefault(); if (tarefaNovaLista.trim() !== "") {event.preventDefault(); Setnovatarefa(false)}}
                                    }}
                                />)}

                            {!nomelista && (
                                <button id="bnt-lista" className="bg-[#251F1F] text-white text-center p-1 rounded-[5px] hover:bg-[#493f3f]  w-full cursor-pointer " onClick={() => Setnovalista(true)} >
                                    + Criar nova lista
                                </button>
                            )}

                            {nomelista && (
                                <button className="bg-[#251F1F] text-white text-center p-1 rounded-[5px] hover:bg-[#3d3434] w-full cursor-pointer " onClick={() => Setnovatarefa(true)}>
                                    + Criar tarefa
                                </button>
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