import { IoIosClose } from "react-icons/io"
import React, { useState } from "react"

function Criar({onClose, task} : {onClose: () => void, task: (nome: string) => void}) {
   const [tarefa, Settarefa] = useState<string>("")
    function atualizar(e: React.FormEvent) {
        e.preventDefault()
        if (tarefa.trim() !== "") {
            task(tarefa)
            Settarefa("")
            onClose()
        }
    }

    const [data, Setdata] = useState("")

    console.log(data)
    return (
        <div className="flex items-center justify-center bg-black/50 w-screen h-screen fixed top-0 left-0 right-0 backdrop-blur-[20px]">
            <div className="bg-[#251F1F] max-w-[90vw] max-h-[90vh] overflow-auto text-white relative p-10 gap-5 flex flex-col rounded-[5px]">
                <button className="absolute top-0 right-0 cursor-pointer" onClick={onClose}> 
                    <IoIosClose size={40} />
                </button>
                <form action="" onSubmit={atualizar} className="flex flex-col gap-5">
                    <input type="text" 
                    placeholder="Nome da tarefa" 
                    className="bg-white text-black rounded-[5px] outline-none"
                    value={tarefa}
                    onChange={(e) => Settarefa(e.target.value)}
                    />
                    
                    <textarea name="" id="" placeholder="Adicione uma descrição" className="bg-white text-black resize-none h-7 rounded-[5px] outline-none"></textarea>
                    <select name="" id="" className="bg-white text-black rounded-[5px]">
                        <option value="" disabled>Prioridade</option>
                        <option value="">Baixa</option>
                        <option value="">Média</option>
                        <option value="">Alta</option>
                    </select>
                    <input type="datetime-local" name="" id="" 
                    className="bg-white text-black rounded-[5px] outline-none"
                    value={data}
                    onChange={(e) => Setdata(e.target.value)}
                    />
                    <button type="submit" className="bg-green-500 rounded-[5px] cursor-pointer">Criar Tarefa</button>
                </form>
            </div>
        </div>
    )
}

export default Criar