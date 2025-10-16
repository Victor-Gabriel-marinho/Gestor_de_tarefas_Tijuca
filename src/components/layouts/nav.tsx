import { MdPeople } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { Link } from "react-router-dom";
import {useState } from "react";
import type { ReactNode } from "react";
import Perfil  from "../commons/Perfil";
import { FaCircleUser } from "react-icons/fa6";


type Navprops = {
    children?: ReactNode
    SetAll?: () => void
}

function Nav({children, SetAll}: Navprops) {

    const [filtrartask, Setfiltrartask] = useState<boolean>(false)
    const [aberto, setAberto] = useState(false);

    const AbrirPerfil =() => {
        setAberto(!aberto)
    };

    

   return (
     <nav className="bg-[#44383e] w-screen h-10 sm:h-15 p-1 sm:p-3">


       
       <div className="flex gap-4 p-1 justify-between items-center relative">
         <Link to="/quadros">
           <BsFillHouseFill className="cursor-pointer text-white text-xl sm:text-3xl" />
         </Link>
         <div className="flex gap-6 items-center">
           <div className="relative">
             <IoFilter
               className="cursor-pointer text-xl sm:text-3xl"
               color="white"
               onClick={() => Setfiltrartask(!filtrartask)}
             />

             {filtrartask && <div className="relative">{children}</div>}
           </div>
           <Link to="/">
             <MdPeople className="cursor-pointer text-white text-2xl sm:text-3xl" />
           </Link>
            <div className="relative">
            <button 
            onClick={AbrirPerfil}
            className=" text-white  text-xl cursor-pointer"
            >
            {aberto ? <FaCircleUser className="w-6 h-6"/> : <FaCircleUser className="w-6 h-6"/>}
            </button>
            {aberto && <Perfil />}
        </div>
         </div>
       </div>
     </nav>
   );
}

export default Nav