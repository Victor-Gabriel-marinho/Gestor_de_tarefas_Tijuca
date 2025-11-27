import { useLocation } from "react-router-dom";
import { TeamService } from "../../../api/services/teamService";
import Confirm_delete from "../../../components/commons/confirmDelete";
import { useState } from "react";
import { ModalPromove } from "./ModalPromove";

type OptionsProps = {
  refetch: () => void;
  closeOptions: (id:string) => void;
  id: string;
  children?: React.ReactNode;
};

function Options({ refetch, id, children, closeOptions}: OptionsProps) {
  const location = useLocation();
  const [modalconfirm, Setmodalconfirm] = useState<boolean>(false);
  const [Modalpromove, SetModalpromove] = useState<boolean>(false)
  const team_id = location.state?.team.id;

  async function Delete_User() {
    try {
      const response = await TeamService.Remove_User_from_team(team_id, id);
      if (response) {
        refetch();
      }
    } catch (error) {
      console.log("erro ao fazer requisição", error);
    }
  }

  return (
    <div className="bg-[#251F1F] w-full h-[150px] sm:h-[173px] rounded-b-[20px] rounded-t-[10px] flex flex-col cursor-pointer" onClick={() => closeOptions(id)}>
      {children}
      <div className="w-full h-[94px] flex items-center justify-around" onClick={(e) => e.stopPropagation()}>
        <input
          type="button"
          value="Remover"
          className=" w-[80px] sm:w-[250px] h-[38px] text-sm sm:text-xl text-white bg-[#F21223] cursor-pointer rounded-[10px] hover:scale-110 transition-all"
          onClick={(e) => {
            e.preventDefault();
            Setmodalconfirm(true);
          }}
        />
        <input
          type="button"
          value="Promover"
          className="w-[80px] sm:w-[250px] h-[38px] text-sm sm:text-xl text-white bg-[#076F37] cursor-pointer rounded-[10px] hover:scale-110 transition-all"
          onClick={() => {
            console.log(Modalpromove);
            SetModalpromove(true);
          }}
        />
      </div>

      {modalconfirm && (
        <Confirm_delete
          funcao="Deletar"
          texto={`Deseja remover esse usuário`}
          SetconfirmModal={Setmodalconfirm}
          SetconfirmAction={Delete_User}
        />
      )}
      {Modalpromove && (
        <ModalPromove
          refetchusers={refetch}
          iduser={id}
          idteam={team_id}
          closemodal={() => SetModalpromove(false)}
        />
      )}
    </div>
  );
}

export default Options;
