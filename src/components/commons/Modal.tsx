import { FaUserCircle } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidDownArrow } from "react-icons/bi";
import PopUp from "../../pages/times/components/PopUp.js";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import type { user_for_invite } from "../../api/types/UserTypes/User";
import { UserService } from "../../api/services/userService";
import { inviteService } from "../../api/services/inviteService.js";

type ModalProps = {
  refetch: () => void;
  openModal: boolean;
  setopenmodal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ refetch, openModal, setopenmodal }: ModalProps) {
  const [popUp, setpopUp] = useState<string | null>(null);  
  const [loading, Setloading] = useState<boolean>(false);
  const [userroles, SetUserroles] = useState<Record<string, string>>({});
  const [Email, setEmail] = useState<string>("");
  const [selectUsers_id, SetselectUsers_id] = useState<user_for_invite[]>([]);
  const [users_to_invite, Setusers_to_invite] = useState<user_for_invite[]>([]);
  const RoleMap: Record<string, string> = {
    Gestor: "2",
    Colaborador: "3",
  };
  const [error, seterror] = useState<string>("");
  const {id} = useParams();
  const team_id = id ?? ""  

  function HandlePopUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const id = event.currentTarget.id;
    setpopUp((prev) => (prev === id ? null : id));
  }

  function alterarRole(userid: string, role: string) {
    SetUserroles((prev) => ({
      ...prev,
      [userid]: role,
    }));
  }
  

  function handleModal() {
    setopenmodal(!openModal);
  }

  async function send_invitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

        try {
      Setloading(true);

    const recipientsArray = selectUsers_id.map((user) => ({
      email: user.Email,
      role: RoleMap[userroles[user.id]] ?? RoleMap["Colaborador"],
    }));

    const CreateInvite = {
      id_team: team_id,
      recipients: recipientsArray,
    };    

     const response = await inviteService.SendInvite(CreateInvite);
      if (response) {
        Setloading(false);
        handleModal();
        refetch();
        search_users();
       }
       
    } catch (error) {
      Setloading(false);
      console.error("erro ao fazer requisição", error);
      seterror("este usuário já está no time");
    } 
  }  

  function selectuser(user: user_for_invite) {
    SetselectUsers_id((prev) => {
      if (prev.some((u) => u.id === user.id)) {
        return prev.filter((u) => u.id !== user.id);
      }
      return [...prev, user];
    });
  }

  const search_users = useCallback(async () => {
    try {
      const response = await UserService.search_user(team_id);
      if (response) {
        Setusers_to_invite(response);
      }
    } catch (error) {
      console.error("erro ao fazer a requisição", error);
    }
  }, []);

  const filter_users = (email: string, users: user_for_invite[]) => {
    if (!email) return users;
    return users.filter((user) =>
      user.Email.toLocaleLowerCase().includes(email.toLocaleLowerCase())
    );
  };

  useEffect(() => {
    search_users();
  }, [team_id, search_users]);  

  return (
    <div
      className="w-screen h-screen flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm fixed inset-0"
      onClick={handleModal}
    >
      <div
        className="bg-[#524D50] w-[300px] h-[400px] sm:w-[652px] sm:h-[674px] rounded-[20px] sm:rounded-[50px] flex flex-col items-center justify-center shadow-2xl shadow-[#524D50]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header do modal */}
        <div className="flex flex-col text-white p-4 w-full h-full sm:p-9 gap-7 items-center">
          <div className="flex flex-row items-center w-full justify-between">
            <h2 className="text-xl sm:text-2xl">Adicionar membros</h2>
            <IoCloseOutline
              className="text-2xl sm:text-4xl cursor-pointer"
              onClick={handleModal}
            />
          </div>

          {/* Buscar usuário por Email */}

          <form
            className="w-full flex flex-row justify-between gap-4 items-center"
            action=""
            onSubmit={(event) => send_invitation(event)}
          >
            <input
              type="text"
              name="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="border w-10/12 outline-0 border-[#746E72] p-1 sm:p-2 font-semibold truncate text-xl rounded-[10px]"
            />
            <input
              type="submit"
              value={`${loading ? "Carregando..." : "Convidar"}`}
              className="bg-[#251F1F] cursor-pointer text-sm p-2 sm:p-3.5 text-center w-4/12 sm:w-2/12 font-semibold rounded-[10px]"
            />
          </form>
          {error ? (
            <div className="bg-[#F21223] flex flex-row justify-between p-3 w-10/12 rounded-xl">
              {error}
              <div onClick={() => seterror("")} className="cursor-pointer">
                X
              </div>
            </div>
          ) : (
            ""
          )}

          <h3 className="font-semibold text-lg">Clique nos usuários para selecionar</h3>
          <div className="h-0.5 w-full bg-[#A7A0A5]"></div>
          
          {/* Usuário que são possíveis de convidar */}
          <div className="w-full flex flex-col gap-7 h-full sm:px-5 overflow-y-auto overflow-x-hidden">
            {filter_users(Email, users_to_invite).map((user) => {
              const isSelected = selectUsers_id.some((u) => u.id === user.id);

              return (
                <div
                  className={`flex items-center justify-between w-full cursor-pointer p-2 rounded-xl ${
                    isSelected ? "bg-zinc-800" : ""
                  } `}
                  key={user.id}
                  onClick={() => selectuser(user)}
                >
                  {/* Nome e perfil do usuário */}
                  <div className="items-center flex flex-row gap-1 sm:gap2">
                    <FaUserCircle className="text-white text-2xl sm:text-5xl" />
                    <p className="text-lg sm:text-xl max-w-[100px]">
                      {user.Name}
                    </p>
                  </div>

                  {/* Alterar Role */}
                  <div
                    className="flex flex-row gap-2 items-center"
                    onClick={(e) => { HandlePopUp(e); e.stopPropagation()}}
                    id={user.id}
                    >
                    <p className="text-sm sm:text-lg font-semibold  ">
                      {userroles[user.id] ?? "Colaborador"}
                    </p>
                    <div className="relative">
                      <BiSolidDownArrow
                        className={`text-sm sm:text-xl ${
                          popUp === user.id ? "rotate-180" : ""
                        } cursor-pointer`}
                      />
                      {/* PopUp para selecionar cargo */}
                      {popUp === user.id && (
                        <PopUp
                          setpopUp={() => setpopUp('')}
                          SetRoleName={(role) => alterarRole(user.id, role)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
