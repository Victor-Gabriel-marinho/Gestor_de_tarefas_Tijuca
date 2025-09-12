import { MdPeople } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";

function Nav() {
   return (
   <nav className="bg-[#524D50] w-screen h-10 ">

        <div className="flex gap-4 p-1 justify-between">
            <BsFillHouseFill className="cursor-pointer" color="white" size={30}/>
            <div className="flex gap-4">
                <IoFilter className="cursor-pointer" color="white" size={30}/>
                <MdPeople className="cursor-pointer" color="white" size={30}/>
            </div>
        </div>

    </nav>
   )
}

export default Nav