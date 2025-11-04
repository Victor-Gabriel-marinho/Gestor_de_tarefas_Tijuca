import { useAuthStore } from "../../store/Auth";
import { FaCircleUser } from "react-icons/fa6";
import { useInforUsers } from "../../hooks/User_hooks/get_inforUsers";
import { useState } from "react";
import Confirm_delete from "./confirmDelete";

function Perfil() {
  const [confimModal, SetconfirmModal] = useState<boolean>(false)
  const clearToken = useAuthStore((state) => state.clearToken);

  function delete_Token() {
    clearToken();
  }

  const { user, teamCount, taskCount } = useInforUsers();

  return (
    <>
      <div className="bg-[#44383e] max-w-[300px] p-3 rounded-xl shadow-lg absolute top-10 z-10 right-0 ">
        <div className="flex items-stretch gap-2">
          <FaCircleUser
            className=" text-amber-50 w-[60px] h-[50px] top-0 left-0 
                sm:w-[72px] sm:h-[70px] "
          />
          <div className="flex flex-col text-amber-50">
            <h2 className="text-[16px] font-semibold ml-2">{user?.Name}</h2>
            <p className="text-[12px] text-gray-400 ml-2">{user?.Email}</p>
          </div>
          <div
            className="bg-red-800 rounded-xl text-center p-1 w-[70px] h-[30px] cursor-pointer text-[15px] text-white
                relative right-0 mt-1.5 sm:mt-2.5"
            onClick={()=> SetconfirmModal(true)}
          >
            Sair
          </div>
        </div>

        <div className="mt-4 text-amber-50">
          <p>Seus times:{teamCount} </p>
          <p>Suas Tarefas:{taskCount}</p>
        </div>
      </div>
      {confimModal && <Confirm_delete SetconfirmModal={SetconfirmModal} SetconfirmAction={delete_Token}/>}
    </>
  );
}
export default Perfil;
