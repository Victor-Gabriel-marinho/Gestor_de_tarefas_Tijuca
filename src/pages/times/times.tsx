import { FaUserCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../components/commons/Modal.js";
import Options from "./components/Options.js";
import { useState, type MouseEvent } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Get_usersInTeams } from "../../hooks/User_hooks/get_usersInTeams.js";
import { decodeJWT } from "../../utils/decodeJWT.js";
import { useAuthStore } from "../../store/Auth.js";
import { Get_userRole } from "../../hooks/User_hooks/get_userRole.js";
import { FaTrashCan } from "react-icons/fa6";
import Get_teams from "../../hooks/Team_hooks/get_teams.js";
import Confirm_delete from "../../components/commons/confirmDelete.js";
import { Loading_anim } from "../../components/commons/loading.js";
import { TeamService } from "../../api/services/teamService.js";

function Times() {
  const [openModal, SetopenModal] = useState<boolean>(false);
  const [options, Setoptions] = useState<string | null>(null);
  const [modalconfirm, Setmodalconfirm] = useState<boolean>(false);

  const Navigate = useNavigate();

  const { id } = useParams();
  const location = useLocation();
  const team = location.state?.team;

  const token = useAuthStore((state) => state.token);
  const payload = decodeJWT(token);

  const { users, loading, refetch } = Get_usersInTeams(id ?? "");
  const { userRole, loadingRole } = Get_userRole(id ?? "");

  const { first_team } = Get_teams();

  function Handlemodal() {
    SetopenModal((prev) => !prev);
  }

  function handleComfirm() {
    Setmodalconfirm(!modalconfirm);
  }

  function handleOptions(event: MouseEvent<SVGElement, globalThis.MouseEvent>) {
    const id = event.currentTarget.id;
    Setoptions((prev) => (prev === id ? null : id));
  }

  async function confirm_delete() {
    try{
      const response = await TeamService.Delete_Team(id ?? '')
      if (response){
        refetch();
        Navigate('/')
      }      
    }
    catch (error){
      console.error("erro ao deletar time",error)
    }
  }

  return (
    <div className={`relative flex h-full w-full min-w-[50px]`}>
      {loadingRole ? (
        <Loading_anim />
      ) : (
        <main className="bg-[#20282F] h-full w-full flex flex-col p-4 sm:p-10 gap-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-white text-2xl sm:text-6xl font-semibold">
              Membros do time{" "}
              {first_team?.id === id ? first_team?.Name : team?.Name}
            </h1>

            {userRole?.id === "1" && (
              <div className="flex flex-row gap-2 sm:gap-3 items-center">
                <div
                  onClick={Handlemodal}
                  className="h-7 w-7 sm:w-9 sm:h-9 bg-[#3E5C76] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 hover:scale-110"
                >
                  <span className="text-white text-lg sm:text-2xl font-semibold">
                    +
                  </span>
                </div>
                <div className="" onClick={handleComfirm}>
                  <FaTrashCan className="hover:scale-110 cursor-pointer text-red-600 text-xl sm:text-2xl" />
                </div>
              </div>
            )}
          </div>

          <div className="w-full sm:max-h-90 lg:max-h-160 max-h-120 min-h-55 overflow-y-auto">
            <div className="flex flex-col gap-4 sm:gap-8">
              {loading ? (
                <Loading_anim />
              ) : (
                users.map((user) =>
                  options === user.id ? (
                    <Options id={user.id} refetch={refetch} key={user.id}>
                      <div className="flex flex-row gap-2 m-2 justify-between items-center">
                        <div className="flex gap-4">
                          <FaUserCircle className="text-white text-3xl sm:text-5xl" />
                          <div className="flex flex-col">
                            <p className="text-white text-xl sm:text-2xl">
                              {user.Name}
                            </p>
                            <p className="text-[#AC8E8E] text-sm sm:text-xl">
                              {user.Role}
                            </p>
                          </div>
                        </div>
                        <BsThreeDotsVertical
                          className="text-white text-xl sm:text-3xl cursor-pointer rotate-90"
                          id={user.id}
                          onClick={handleOptions}
                        />
                      </div>
                    </Options>
                  ) : (
                    <div
                      className={`flex flex-row gap-2 justify-between items-center hover:bg-[#303d47] rounded-2xl p-2 ${
                        payload?.sub === user.id
                          ? "bg-zinc-900 h-20 pl-2 rounded-xl"
                          : ""
                      }`}
                      key={user.id}
                    >
                      <div className="flex gap-4 items-center">
                        <FaUserCircle className="text-white text-3xl sm:text-5xl" />
                        <div className="flex flex-col">
                          <p className="text-white text-xl sm:text-2xl">
                            {user.Name}
                          </p>
                          <p className="text-[#AC8E8E] text-sm sm:text-xl">
                            {user.Role}
                          </p>
                        </div>
                      </div>

                      {payload?.sub !== user.id && userRole?.id === "1" && (
                        <BsThreeDotsVertical
                          className="text-white text-xl sm:text-3xl cursor-pointer hover:opacity-70"
                          id={user.id}
                          onClick={handleOptions}
                        />
                      )}
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </main>
      )}

      {openModal && (
        <Modal
          setopenmodal={SetopenModal}
          openModal={openModal}
          refetch={refetch}
        />
      )}

      {modalconfirm && <Confirm_delete texto="Deseja excluir esse time?" SetconfirmModal={Setmodalconfirm} SetconfirmAction={confirm_delete} />}
    </div>
  );
}

export default Times;
