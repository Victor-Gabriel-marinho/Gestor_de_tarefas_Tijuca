import { FaUserCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../components/Modal.jsx";
import Options from "./components/Options.js";
import { useState, type MouseEvent } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Get_usersInTeams } from "../../hooks/get_usersInTeams.js";
import { decodeJWT } from "../../utils/decodeJWT.js";
import { useAuthStore } from "../../store/Auth.js";
import { Get_userRole } from "../../hooks/get_userRole.js";

function Times() {
  const [openModal, SetopenModal] = useState<boolean>(false);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [options, Setoptions] = useState<boolean>(false);
  const {id} = useParams();
=======
  const [options, Setoptions] = useState<boolean>(false)
  const {id} = useParams()
>>>>>>> 53acb9c (ajustando funcionalidades do frontend)
=======
  const [options, Setoptions] = useState<boolean>(false);
  const {id} = useParams();
>>>>>>> 2645210 (terminando funcionalidades)
=======
  const [options, Setoptions] = useState<string | null>(null);
  const { id } = useParams();
  const location = useLocation();
  const team = location.state?.team;
  const token = useAuthStore((state) => state.token) 
  const payload = decodeJWT(token)

  const { users, loading } = Get_usersInTeams(id ?? "");
  const {userRole, loadingRole} = Get_userRole(team)
>>>>>>> feature/integrando_com_temaService_da_API

  function Handlemodal() {
    SetopenModal(!openModal);
  }

  function handleOptions(event: MouseEvent<SVGElement, globalThis.MouseEvent>) {
    const id = event.currentTarget.id;
    Setoptions((prev) => (prev === id ? null : id));
  }

  return (
    <div className="relative w-full h-full">
<<<<<<< HEAD


<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2645210 (terminando funcionalidades)
      <main className="bg-[#20282F] w-full h-full min-w-[50px] pt-2 px-3 sm:pt-10 sm:px-15 flex flex-col gap-8 sm:gap-15">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-white text-3xl sm:text-6xl font-semibold"> Membros do time {id} </h1>
          <div
            onClick={Handlemodal}
            className="h-7 w-7 sm:w-9 sm:h-9 bg-[#3E5C76] flex items-center justify-center rounded-full cursor-pointer"
          >
            <span className="text-white text-xl sm:text-2xl font-semibold"> + </span>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="flex flex-col gap-4 sm:gap-8">
            {options ? (
<<<<<<< HEAD
=======
          <main className="bg-[#20282F] w-full h-full min-w-[50px] pt-2 px-3 sm:pt-10 sm:px-15 flex flex-col gap-8 sm:gap-15">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-white text-3xl sm:text-6xl font-semibold"> Membros do time {id} </h1>
              <div
                onClick={Handlemodal}
                className="h-7 w-7 sm:w-9 sm:h-9 bg-[#3E5C76] flex items-center justify-center rounded-full cursor-pointer"
              >
                <span className="text-white text-xl sm:text-2xl font-semibold"> + </span>
              </div>
            </div>
            <div className="w-full h-full">
              <div className="flex flex-col gap-4 sm:gap-8">
              {options ? (
>>>>>>> 53acb9c (ajustando funcionalidades do frontend)
=======
>>>>>>> 2645210 (terminando funcionalidades)
=======
      {loadingRole ? (
        <div className="bg-[#20282F] w-full h-full text-white">Carregando...</div>
      ) : (
        <main className="bg-[#20282F] w-full h-full min-w-[50px] pt-2 px-3 sm:pt-10 sm:px-15 flex flex-col gap-8 sm:gap-15">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-white text-3xl sm:text-6xl font-semibold">
              {" "}
              Membros do time {team.Name}{" "}
            </h1>
            {userRole?.id === "1" ? (
              <div
                onClick={Handlemodal}
                className="h-7 w-7 sm:w-9 sm:h-9 bg-[#3E5C76] flex items-center justify-center rounded-full cursor-pointer"
              >
                <span className="text-white text-xl sm:text-2xl font-semibold">
                  {" "}
                  +{" "}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-full h-full">
            <div className="flex flex-col gap-4 sm:gap-8">
              {loading ? (
                <div> Carregando...</div>
              ) : (
                users.map((user) =>
                  options === user.id ? (
                    <Options id={user.id} key={user.id}>
                      <div className="flex-row flex gap-2 m-2 justify-between items-center">
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
                          onClick={(event) => handleOptions(event)}
                        />
                      </div>
                    </Options>
                  ) : (
                    <div
                      className={`flex-row flex gap-2 justify-between items-center ${
                        payload?.sub === user.id
                          ? "bg-zinc-900 h-20 pl-2 rounded-xl"
                          : ""
                      } `}
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
>>>>>>> feature/integrando_com_temaService_da_API

                      {payload?.sub === user.id ? (
                        ""
                      ) : userRole?.id != "1" ? (
                        ""
                      ) : (
                        <BsThreeDotsVertical
                          className="text-white text-xl sm:text-3xl cursor-pointer"
                          id={user.id}
                          onClick={handleOptions}
                        />
                      )}
                    </div>
                  )
                )
              )}
<<<<<<< HEAD
            <div className="flex-row flex gap-2 justify-between items-center ">
              <div className="flex gap-4 items-center">
                <FaUserCircle className="text-white text-3xl sm:text-5xl" />
                <div className="flex flex-col">
                  <p className="text-white text-xl sm:text-2xl">Nome</p>
                  <p className="text-[#AC8E8E] text-sm sm:text-xl">Cargo</p>
                </div>
              </div>
              <BsThreeDotsVertical className="text-white text-xl sm:text-3xl cursor-pointer" onClick={handleOptions} />
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2645210 (terminando funcionalidades)
            <div className="flex-row flex gap-2 justify-between items-center ">
              <div className="flex gap-4 items-center">
                <FaUserCircle className="text-white text-3xl sm:text-5xl" />
                <div className="flex flex-col">
                  <p className="text-white text-xl sm:text-2xl">Nome</p>
                  <p className="text-[#AC8E8E] text-sm sm:text-xl">Cargo</p>
                </div>
              </div>
              <BsThreeDotsVertical className="text-white text-xl sm:text-3xl cursor-pointer" onClick={handleOptions} />
            </div>
          </div>
        </div>
      </main>
<<<<<<< HEAD
=======
          </main>
>>>>>>> 53acb9c (ajustando funcionalidades do frontend)
=======
>>>>>>> 2645210 (terminando funcionalidades)
=======
            </div>
          </div>
        </main>
      )}
>>>>>>> feature/integrando_com_temaService_da_API

      {openModal && <Modal setopenmodal={SetopenModal} openModal={openModal} />}
    </div>
  );
}

export default Times;
