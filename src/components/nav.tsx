import { MdPeople } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { Link } from "react-router-dom";
import Filtrar from "./filtro";
import { useState } from "react";

function Nav() {

    const [filtrartask, Setfiltrartask] = useState<boolean>(false)

   return (
   <nav className="bg-[#524D50] w-screen h-10 ">

        <div className="flex gap-4 p-1 justify-between">
            <Link to="/quadros">
                <BsFillHouseFill className="cursor-pointer" color="white" size={30}/>
            </Link>
            <div className="flex gap-4">
                <div className="relative">
                    <IoFilter className="cursor-pointer" color="white" size={30} onClick={() => Setfiltrartask(!filtrartask)}/>
                    
                    {filtrartask && (
                     <div className="relative">
                            
                        <Filtrar/>
                        
                    </div>
                )}
                        
                        
                </div>
                <Link to="/">
                    <MdPeople className="cursor-pointer" color="white" size={30}/>
                </Link>

                 
            </div>


        </div >
           
    </nav>

    
    
   )
}

export default Nav