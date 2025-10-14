import { useState } from "react"

function Tag({onDefinir} : {onDefinir: (tag:string) => void}) {
        const[input, Setinput] = useState("")
    
    return (
        <div className="flex flex-col text-center items-center justify-center bg-[#251F1F] p-10 rounded-[10px]">
            <form action="" 
            onSubmit={(e) => {
                e.preventDefault()
                onDefinir(input)
            }}
            className="flex flex-col gap-3 space-y-1">
                <input type="text" name="" id="" className="bg-white outline-none rounded-[5px] w-50 p-1 truncate "
                value={input}
                onChange={(e) => Setinput(e.target.value)}
                placeholder="Nome da tag"
                />
                 <span className="w-50 h-10 truncate text-white bg-blue-500">{input}</span>
                
                <input type="submit" value="Definir tag" className="bg-green-500 text-white rounded-[5px] cursor-pointer"/>

            </form>
                    
        </div>
    )
}

export default Tag