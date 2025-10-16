import { useAuthStore } from "../../store/Auth";
import { FaCircleUser } from "react-icons/fa6";
import { useInforUsers } from "../../hooks/get_inforUsers";
function Perfil() {
    const clearToken = useAuthStore((state) => state.clearToken);
    function delete_Token () {
        clearToken()
    }
    const {user, teamCount, taskCount} = useInforUsers()

    
  return (
    <>
        <div className="bg-white p-4 rounded-xl shadow-lg absolute top-10 z-10 right-0 ">
            <div className="flex items-stretch gap-2">
                <FaCircleUser className=" w-[52px] h-[50px] top-0 left-0 
                sm:w-[72px] sm:h-[70px] "/>
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold ml-2">{user?.Name}</h2>
                    <p className="text-sm text-gray-600 ml-2">{user?.Email}</p>
                </div>
                <div
                className="bg-red-800 rounded-xl text-center p-1 w-[70px] h-[30px] cursor-pointer text-sm text-white
                relative right-0 mt-1.5 sm:mt-2.5"
                onClick={delete_Token}
                >
                logout
                </div>
            </div>
          

           <div className="mt-4">
            <p>Seus times:{teamCount} </p>
            <p>Suas Tarefas:{taskCount}</p>
           </div>
        </div>
    </>
  )
}
export default Perfil;