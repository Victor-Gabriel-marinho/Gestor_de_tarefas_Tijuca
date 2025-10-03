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
           <div
             className="bg-red-800 rounded-xl p-1 px-6 cursor-pointer text-sm text-white"
             onClick={delete_Token}
           >
             logout
           </div>
         </div>
       </div>
     </nav>
   );
}

export default Nav