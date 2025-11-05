import { MdPeople } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { ReactNode } from "react";
import Perfil from "../commons/Perfil";
import { FaCircleUser } from "react-icons/fa6";


type Navprops = {
  children?: ReactNode
  SetAll?: () => void
}

function Nav({ children, SetAll }: Navprops) {

  const [filtrartask, Setfiltrartask] = useState<boolean>(false)
  const [aberto, setAberto] = useState(false);

  const AbrirPerfil = () => {
    setAberto(!aberto)
  };



  return (
    <nav className="bg-[#44383e] w-screen h-10 sm:h-15 p-1 sm:p-3">


      <div className="flex gap-4 p-1 justify-between items-center relative">
        <Link
          to="/quadros"
          className="relative group flex flex-col items-center justify-center">

          <div className="relative flex flex-col items-center justify-center ml-8">

            <BsFillHouseFill className="cursor-pointer text-white text-xl sm:text-3xl "/>

            <span className=" w-[110px] absolute top-full mt-1
            text-[15px] text-gray-400
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            pointer-events-none bg-[#1f1a1a] p-1 rounded-[5px] text-center z-50"
            >Página Inicial</span>
          </div>
        </Link>
        <div className="flex gap-8 items-center mr-7">
          <div className="relative">
            <IoFilter
              className="cursor-pointer text-xl sm:text-3xl"
              color="white"
              onClick={() => Setfiltrartask(!filtrartask)}
            />

            {filtrartask && <div className="relative">{children}</div>}
          </div>
          <Link to="/" className="relative group flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
              <MdPeople className="cursor-pointer text-white text-2xl sm:text-3xl" />
              <span className=" w-[90px] absolute top-full mt-1
              text-[15px] text-gray-400
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              pointer-events-none bg-[#1f1a1a] p-0.5 rounded-[5px] text-center z-50"
              >Membros</span>
            </div>
          </Link>
          <div className="relative">
            <button
              onClick={AbrirPerfil}
              className=" text-white  text-xl cursor-pointer relative group flex flex-col items-center justify-center"
            >
              {aberto ? <FaCircleUser className="w-6 h-6" /> : <FaCircleUser className="w-6 h-6" />}
              <span className=" w-[60px] absolute top-full mt-1
              text-[15px] text-gray-400
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              pointer-events-none bg-[#1f1a1a] p-0.5 rounded-[5px] text-center z-50"
              >Perfil</span>
            </button>
            {aberto && <Perfil />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav