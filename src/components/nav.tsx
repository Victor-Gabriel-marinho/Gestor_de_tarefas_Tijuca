import { MdPeople } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { Link } from "react-router-dom";
import {useState } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/Auth";

type Navprops = {
    children?: ReactNode
}

function Nav({children}: Navprops) {

    const [filtrartask, Setfiltrartask] = useState<boolean>(false)
    const clearToken = useAuthStore((state) => state.clearToken);

    function delete_Token () {
        clearToken()
    }

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
                        {children}                 
                    </div>
                )}   
                </div>
                <div className="bg-red-800 rounded-xl p-1 px-6 cursor-pointer text-white" onClick={delete_Token}>logout</div>
                <Link to="/">
                    <MdPeople className="cursor-pointer" color="white" size={30}/>
                </Link>
            </div>
        </div >
    </nav>    
   )
}

export default Nav