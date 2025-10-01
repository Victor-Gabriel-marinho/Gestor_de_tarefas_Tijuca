import { useNavigate } from "react-router-dom";
import { TeamService } from "../api/services/teamService";

 type confirmProps = {
   Setconfirm: React.Dispatch<React.SetStateAction<boolean>>;
   id: string | undefined;
 };
 
 function Confirm_delete({Setconfirm, id}: confirmProps) {
 
  const navigate = useNavigate()
     
    function handleComfirm() { 
       Setconfirm(false)
     }

    async function delete_Team() {
      try {
        if (!id) return
        await TeamService.Delete_Team(id)
        navigate(`/`)
        window.location.reload()
        handleComfirm()
      } 
      catch (error) {
        console.log("erro ao fazer requisição", error)
      }
     }
    
    return (
      <div className="w-full h-full backdrop-blur-sm z-10 absolute inset-0 flex items-center justify-center">
        <div className="bg-[#524D50] w-[400px] h-[175px] rounded-2xl p-5 shadow-2xl shadow-[#524D50]">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-xl">
              Você deseja deletar esse time?
            </h2>
            <div className="text-white font-bold" onClick={handleComfirm}>
              X
            </div>
          </div>
          <div className="h-full w-full flex flex-row gap-3 items-center justify-center">
            <div className="bg-red-700 text-white h-10 w-40 rounded-[10px] flex items-center justify-center font-semibold cursor-pointer" onClick={delete_Team}>
              Deletar
            </div>
            <div
              className="bg-[#251F1F] text-white h-10 w-40 rounded-[10px] flex justify-center items-center font-semibold cursor-pointer"
              onClick={handleComfirm}
            >
              Cancelar
            </div>
          </div>
        </div>
      </div>
    );
}

export default Confirm_delete