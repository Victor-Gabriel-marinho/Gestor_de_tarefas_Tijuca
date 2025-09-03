import Nav from "../nav.tsx"
import { useState } from "react"

function Quadros () {

      const [criar, Setcriar] = useState(false)

    return (
        <>
            <div className="bg-[#1F2937] w-screen h-screen overflow-hidden">
                <Nav />
               <main >
                     
                    <div className="w-full h-50 relative flex flex-row m-5">
                   
                      <div onClick={() => Setcriar(true)} className="w-40 h-40 bg-[#131733] rounded-2xl flex items-center justify-center scale-110 hover:bg-[#2d304b] hover:scale-115"> 
                        <p className="text-white">Criar quadro</p>
                      </div>
                    
                    </div>

                  <div id="criar" className={`absolute top-15 left-50 ${criar ? "block" : "hidden"}`}>
                    <div className="bg-[#111827] text-white flex flex-col w-40 h-60 p-5 gap-5 rounded-2xl">
                      <p>Criar Quadro</p>
                      <label htmlFor="">Time</label>
                      <input type="text"  className="bg-white outline-none text-black" required/>
                      <button className="bg-[#22C55E] p-1">Criar</button>
                      <button onClick={() => Setcriar(false)} className="bg-[#251F1F] p-1">Cancelar</button>
                    </div>
                  </div>

                  
               </main>
            </div>

        </>
    )
}

export default Quadros
