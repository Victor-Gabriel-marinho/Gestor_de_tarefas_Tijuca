import Nav from "../../components/nav.tsx"
import { Link} from "react-router-dom";
import { useState } from "react"
import { useFont } from "../../components/font.tsx"

function Quadros() {

  useFont(" 'Poppins', 'SansSerif' ");

  const [criar, Setcriar] = useState(false);

  return (
    <>
      <div className="bg-[#1F2937] w-screen h-screen overflow-hidden">
        <Nav />
        <main >

          <div className="w-full h-50 relative flex flex-row m-5 gap-5">

            <div onClick={() => Setcriar(true)} className="w-40 h-40 bg-[#131733] rounded-2xl flex items-center justify-center  hover:bg-[#2d304b] hover:scale-110 cursor-pointer">
              <p className="text-white">Criar quadro</p>
            </div>

            <Link to="/lista" className="w-40 h-40 bg-white rounded-2xl hover:scale-110 flex items-baseline-last">
           
              
             
              <div className="w-40 h-40 bg-blue-700 rounded-2xl hover:scale-110 flex items-baseline-last">
              
                     

                <div className="bg-[#251F1F] w-50 rounded-[5px] p-3">
                  <p className="text-white font-semibold">Time 1</p>
                </div>
              </div>             
            </Link>
          </div>

          <div id="criar" className={`absolute top-15 left-50 ${criar ? "block" : "hidden"}`}>
            <div className="bg-[#111827] text-white flex flex-col w-40 h-60 p-5 gap-5 rounded-2xl ">
              <p>Criar Quadro</p>
              <label htmlFor="">Time</label>
              <input type="text" className="bg-white outline-none text-black" required />
              <button className="bg-[#22C55E] p-1">Criar</button>
              <button onClick={() => Setcriar(false)} className="bg-[#251F1F] p-1">Cancelar</button>
            </div>
          </div>


        </main >
      </div >

    </>
  );
}

export default Quadros;