import { MdPeople } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import Perfil from "../commons/Perfil";
import { FaCircleUser } from "react-icons/fa6";




function Nav() {

    const [aberto, setAberto] = useState(false);

  const AbrirPerfil = () => {
    setAberto(!aberto)
  };



  return (
    <nav className="bg-[#44383e] w-screen h-10 sm:h-15 p-1 sm:p-3">


      <div className="flex w-full gap-4 p-1 justify-between items-center relative">
        <Link
          to="/"
          className="relative group flex flex-col items-center justify-center">

          <div className="relative flex flex-col items-center justify-center">

            <BsFillHouseFill className="cursor-pointer text-white text-xl sm:text-3xl "/>

            <span className=" w-[110px] absolute top-full mt-1
            text-[15px] text-gray-400
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            pointer-events-none bg-[#1f1a1a] p-1 rounded-[5px] text-center z-50"
            >Página Inicial</span>
          </div>
        </Link>
        <div className="flex gap-8 items-center">
          <div className="relative">
        
          </div>
          <Link to="/membros" className="relative group flex flex-col items-center justify-center">
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
              className=" text-white text-xl cursor-pointer relative group flex items-center justify-center"
            >
              <FaCircleUser className="w-6 h-6" />
        {/*       <span className=" w-[60px] absolute top-7
              text-[15px] text-gray-400
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              pointer-events-none bg-[#1f1a1a] p-0.5 rounded-[5px] text-center z-50"
              >Perfil</span> */}
            </button>
            {aberto && <Perfil />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav