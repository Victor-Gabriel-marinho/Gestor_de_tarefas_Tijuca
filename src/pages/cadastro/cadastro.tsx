
import { Link, useNavigate } from "react-router-dom";
/* import card from "../../assets/card.png";
 */import { useState, type FormEvent } from "react";
import { UserService } from "../../api/services/userService";
import { IoCloseOutline } from "react-icons/io5";
import { validateEmail } from "../../utils/isEmail";
import { useAuthStore } from "../../store/Auth";
import { useFont } from "../../components/font"

function Cadastro() {
  useFont("'Poppins', sans-serif ");

  const [erro, seterro] = useState<boolean>(false);
  const [menssage, setmenssage] = useState<string>("");
  const setToken = useAuthStore((state) => state.setToken);

  const navigate = useNavigate();

  async function CreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    const Email = formdata.get("Email") as string;
    const Name = formdata.get("Name") as string;
    const Password = formdata.get("Password") as string;
    const Confirm_Password = formdata.get("Confirm_Password");

    if (Password != Confirm_Password) {
      seterro(true);
      setmenssage("Senhas diferentes");
    }

    if (!validateEmail(Email)) {
      seterro(true);
      setmenssage("Certifique que o Email está correto");
      return;
    }

    try {
      const new_user = await UserService.CreateUser({ Name, Email, Password });
      
      if (new_user) {
        setToken(new_user.token.Token);
        navigate("/");
    }
    } catch (err) {
      seterro(true);
      setmenssage("Ja existe um usuário com este Email");
    }
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="bg-[#111827] flex-1 flex items-center justify-center">
          <form
            action=""
            className=" w-full max-w-sm sm:max-w-md "
            onSubmit={(event) => CreateUser(event)}
          >
            <div className="flex m-4 flex-col gap-5 ">
              <h2 className="text-[#E5E7EB] text-5xl font-semibold  ">
                Cadastro
              </h2>

              <input
                type="Name"
                name="Name"
                placeholder="Nome"
                required
                className="border p-2 border-gray-300 rounded-md   placeholder-gray-500 bg-gray-50 w-full max-w-sm  focus:outline-none"
              />

              <input
                name="Email"
                placeholder="Email"
                required
                className="border p-2 border-gray-300 rounded-md  placeholder-gray-500  bg-gray-50 w-full max-w-sm  focus:outline-none"
              />

              <input
                type="password"
                name="Password"
                placeholder="Senha"
                required
                className="border p-2 border-gray-300 rounded-md   placeholder-gray-500 bg-gray-50 w-full max-w-sm  focus:outline-none"
              />

              <input
                type="password"
                name="Confirm_Password"
                placeholder="Confirme a senha"
                required
                className=" border p-2 border-gray-300  rounded-md  placeholder-gray-500 bg-gray-50 w-full max-w-sm  focus:outline-none"
              />

              <input
                type="submit"
                value="Cadastrar"
                className="bg-[#22C55E] cursor-pointer text-white p-3 rounded-2xl w-full max-w-sm "
              />

              {erro && (
                <div className="bg-[#F21223] w-full h-10 p-1 rounded-xl">
                  <div className="flex items-center text-white justify-between m-1">
                    <p>{menssage}</p>
                    <IoCloseOutline
                      className="text-xl cursor-pointer"
                      onClick={() => seterro(false)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-2 w-3xl ml-4">
              <a href="#" className="text-white">
                Já tem uma conta?
              </a>
              <Link to="/entrar" className="text-blue-600">
                Entrar
              </Link>
            </div>
          </form>
        </div>

        <div className="bg-[#1F2937] w-1/2 mr-auto z-10 hidden md:flex justify-center items-center flex-1 ">
{/*           <img src={card} alt="" className="max-w-md w-full" />
 */}        </div>
      </div>
    </>
  );
}

export default Cadastro;
