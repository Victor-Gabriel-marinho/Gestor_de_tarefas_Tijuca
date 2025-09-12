import { Link } from "react-router-dom"
import { useFont } from "../../components/font";
import card from "../../assets/card.png";

function Login() {

    useFont("'Inter', sans-serif ");

    return (
        <>
            <div className="flex h-screen overflow-hidden">

                <div className="bg-[#111827] flex-1 flex items-center justify-center w-full md:w-1/2 lg:w-2/5 px-6 sm:px-12 md:px-16">
                    <form action="" className=" w-full space-y-5 max-w-sm sm:max-w-md">

                        <div className="flex-col flex gap-5">
                            <h2 className="text-[#E5E7EB] text-3xl font-medium">Entrar</h2>
                            <input type="email" placeholder="Email" required className="border border-gray-300 rounded-md   placeholder-gray-500 bg-gray-50 w-full max-w-sm focus:outline-none" />
                            <input type="password" name="" id="" placeholder="Senha" required className="border border-gray-300 rounded-md placeholder-gray-500 bg-gray-50 w-full max-w-sm  focus:outline-none" />
                            <button type="submit" className="bg-[#22C55E] text-white rounded-2xl w-full max-w-sm ">Entre</button>
                        </div>
                        <div className="flex gap-5 w-3xl">
                            <a href="#" className="text-white">Não tem uma conta?</a>
                            <Link to="/" className="text-blue-600">Cadastre-se</Link>
                        </div>


                    </form>
                </div>

                <div className="bg-[#1F2937] w-1/2 mr-auto z-10  hidden md:flex justify-center items-center flex-1">
                    <img src={card} alt="max-w-md w-full" />
                </div>

            </div>




        </>
    )
}

export default Login;