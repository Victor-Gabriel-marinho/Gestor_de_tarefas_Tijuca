import { Link, useNavigate } from "react-router-dom";
import { useFont } from "../../components/font";
import card from "../../assets/card.png";
import { AuthService } from "../../api/services/authService";
import { type FormEvent } from "react";
import { useAuthStore } from "../../store/Auth";

function Login() {
  useFont("'Inter', sans-serif ");

  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  async function CreatAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    const Email = formdata.get("Email") as string;
    const Password = formdata.get("Password") as string;

    try {
      const new_auth = await AuthService.SingIn({ Email, Password });

      navigate("/")
      setToken(new_auth.Token)
      navigate('/quadros')

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="bg-[#111827] flex-1 flex items-center justify-center w-full md:w-1/2 lg:w-2/5 px-6 sm:px-12 md:px-16">
          <form
            action=""
            className=" w-full space-y-5 max-w-sm sm:max-w-md"
            onSubmit={(event) => CreatAuth(event)}
          >
            <div className="flex-col flex gap-5">
              <h2 className="text-[#E5E7EB] text-5xl font-semibold">Entrar</h2>
              <input
                type="email"
                name="Email"
                placeholder="Email"
                required
                className="border p-2 border-gray-300 rounded-md   placeholder-gray-500 bg-gray-50 w-full max-w-sm focus:outline-none"
              />
              <input
                type="password"
                name="Password"
                id=""
                placeholder="Senha"
                required
                className="border p-2 border-gray-300 rounded-md placeholder-gray-500 bg-gray-50 w-full max-w-sm  focus:outline-none"
              />
              <input
                type="submit"
                value="Entrar"
                className="bg-[#22C55E] cursor-pointer p-3 text-white rounded-2xl w-full max-w-sm "
              />
            </div>
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
          <img src={card} alt="" className="w-[448px] h-[448px]" />
        </div>
      </div>
    </>
  );
}

export default Login;
