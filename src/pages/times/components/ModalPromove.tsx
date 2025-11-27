import { IoCloseOutline } from "react-icons/io5";
import { TeamService } from "../../../api/services/teamService";

type ModalPromoveProps = {
  closemodal: () => void;
  refetchusers: () => void;
  iduser: string;
  idteam: string;
};

export const ModalPromove = ({
  closemodal,
  refetchusers,
  idteam,
  iduser,
}: ModalPromoveProps) => {


  function handleclick() {
    closemodal();
  }

  async function PromoveUser(idRole: string) {
    try {
      const response = await TeamService.PromoverUser(idteam, iduser, idRole);
      if (response) {
        refetchusers()
        closemodal();
      }
    } catch (error) {
      console.error("Erro ao promover usuário", error);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm fixed inset-0">
      <div className="bg-[#524D50] w-[250px] h-[175px] sm:w-[400px] sm:h-[175px] rounded-2xl p-5 shadow-2xl shadow-[#524D50] flex items-center justify-center flex-col ">
        <div className="flex flex-row w-full gap-5 items-center justify-between">
          <h2 className="text-white font-semibold text-sm sm:text-xl">
            Selecione um cargo
          </h2>
          <IoCloseOutline
            className="text-2xl text-white font-semibold sm:text-2xl cursor-pointer hover:scale-110 hover:text-gray transition-all"
            onClick={handleclick}
          />
        </div>
        <div className="h-full w-full flex flex-row gap-3 items-center justify-center">
          <div
            className="bg-[#251F1F] text-white text-sm sm:text-lg h-10 w-40 rounded-[10px] flex items-center justify-center font-semibold cursor-pointer hover:scale-105 hover:bg-[#332929] transition-all"
            onClick={() => PromoveUser("3")}
          >
            Colaborador
          </div>
          <div
            className="bg-[#251F1F] text-white text-sm sm:text-lg h-10 w-40 rounded-[10px] flex justify-center items-center font-semibold cursor-pointer hover:scale-105 hover:bg-[#332929] transition-all"
            onClick={() => PromoveUser("2")}
          >
            Gestor
          </div>
        </div>
      </div>
    </div>
  );
};
