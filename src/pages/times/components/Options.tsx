import { useLocation } from "react-router-dom";
import { TeamService } from "../../../api/services/teamService";
import type { MouseEvent } from "react";
import { useAuthStore } from "../../../store/Auth";

type OptionsProps = {
  refetch: () => void;
  id: string;
  children?: React.ReactNode;
};

function Options({refetch, id, children }: OptionsProps) {

  const location = useLocation();
  const team_id = location.state?.team.id
  const token = useAuthStore((state)=> state.token)

  async function Delete_User(event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) {
    event.preventDefault()
    try {
      if (!token) return
      const response = await TeamService.Remove_User_from_team(team_id, id,token)
      if (response) {
        refetch()
        console.log(response)
      }
    } 
    catch (error){
      console.log('erro ao fazer requisição', error)
    }
  } 
  return (
    <div className="bg-[#251F1F] w-full h-[150px] sm:h-[173px] rounded-b-[20px] rounded-t-[10px] flex flex-col">
      {children}
      <div className="w-full h-[94px] flex items-center justify-around">
        <input
          type="button"
          value="Remover"
          className=" w-[80px] sm:w-[250px] h-[38px] text-sm sm:text-xl text-white bg-[#F21223] cursor-pointer rounded-[10px]"
          onClick={(event) => Delete_User(event)}
        />
        <input
          type="button"
          value="Promover"
          className="w-[80px] sm:w-[250px] h-[38px] text-sm sm:text-xl text-white bg-[#076F37] cursor-pointer rounded-[10px]"
        />
      </div>
    </div>
  );
}

export default Options

