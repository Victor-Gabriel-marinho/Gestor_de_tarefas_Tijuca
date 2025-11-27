import { Link, useNavigate } from "react-router-dom";
import { useFont } from "../../components/font";
import card from "../../assets/card.png";
import { AuthService } from "../../api/services/authService";
import { UseinviteStore, useAuthStore } from "../../store/Auth";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

function Login() {
  useFont("'Inter', sans-serif ");

  const setToken = useAuthStore((state) => state.setToken);
  const InviteURL = UseinviteStore((state) => state.token);
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [error, seterror] = useState<string>("");
  const navigate = useNavigate();

  async function CreatAuth() {
    try {

      if( !Email || Email.trim() === ''){
        seterror('o Campo Email é obrigatório')
        return
      }
      
      if (!Password || Password.trim() === "") {
        seterror("o Campo Password é obrigatório");
        return
      }

      const new_auth = await AuthService.SingIn({ Email, Password });
      

      if (new_auth) {setToken(new_auth.Token);}

      if (InviteURL) {
        navigate(InviteURL);
      }
      
    } catch (err) {
      seterror("Email ou senha incorreta");
    }
  }

  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

  const ToggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="bg-[#111827] flex-1 flex items-center justify-center w-full md:w-1/2 lg:w-2/5 px-6 sm:px-12 md:px-16">
          <form className=" w-full space-y-5 max-w-sm sm:max-w-md">
            <div className="flex-col flex gap-5">
              <h2 className="text-[#E5E7EB] text-5xl font-semibold">Entrar</h2>
              <input
                type="email"
                name="Email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 border-gray-300 rounded-md   placeholder-gray-500 bg-gray-50 w-full max-w-sm focus:outline-none"
              />
              <div className="relative w-full max-w-sm">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="Password"
                  placeholder="Senha"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 border-gray-300 rounded-md placeholder-gray-500 bg-gray-50 w-full max-w-sm  focus:outline-none"
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center p-3 cursor-pointer"
                  onClick={ToggleMostrarSenha}
                >
                  {mostrarSenha ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>

              <input
                type="button"
                value="Entrar"
                onClick={(event) => {
                  event.preventDefault();
                  CreatAuth();
                }}
                className="bg-[#22C55E] cursor-pointer p-3 text-white rounded-2xl w-full max-w-sm "
              />
            </div>

            {error && (
              <div className="bg-[#F21223] p-2 rounded-xl">
                <div className="flex items-center text-white justify-between text-xl font-semibold">
                  <p>{error}</p>
                  <IoCloseOutline
                    className="text-xl cursor-pointer"
                    onClick={() => seterror("")}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 w-3xl">
              <a href="#" className="text-white">
                Não tem uma conta?
              </a>
              <Link to="/cadastro" className="text-blue-600">
                Cadastre-se
              </Link>
            </div>
            
          </form>
        </div>

        <div className="bg-[#1F2937] w-1/2 mr-auto z-10 hidden md:flex justify-center items-center flex-1">
          <img src={card} alt="" className="max-w-md w-full" />
        </div>
      </div>
    </>
  );
}

export default Login;
