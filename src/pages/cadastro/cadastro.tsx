import { Link } from "react-router-dom"
import { useFont } from "../font"
import card from "../../assets/card.png"

function Cadastro() {
    
    useFont("'Inter', sans-serif ");

    return (
        <>
            <div className="flex h-screen overflow-hidden">

                <div className="bg-[#111827] flex-1 flex items-center justify-center">
                    <form action="" className=" w-full max-w-sm sm:max-w-md ">
                        <div className="flex flex-col gap-5 ">
    
                            <h2 className="text-[#E5E7EB] text-3xl font-medium  ">Cadastro</h2>
                            <input type="email" placeholder="Email" required className="border border-gray-300 rounded-md  placeholder-gray-500  bg-gray-50 w-full max-w-sm  focus:outline-none" />
                            <input type="password" name="" id="" placeholder="Senha" required className="border border-gray-300 rounded-md   placeholder-gray-500 bg-gray-50 w-full max-w-sm  focus:outline-none" />
                            <input type="password" name="" id="" placeholder="Confirme a senha" required className=" border border-gray-300  rounded-md  placeholder-gray-500 bg-gray-50 w-full max-w-sm  focus:outline-none" />
                            <button type="submit" className="bg-[#22C55E] text-white p-1 rounded-2xl w-full max-w-sm ">Enviar</button>
                        </div>
                        <div className="flex gap-5 w-3xl">
                            <a href="#" className="text-white">Já tem uma conta?</a>
                            <Link to="/entrar" className="text-blue-600">Entrar</Link>
                        </div>


                    </form>
                </div>

                <div className="bg-[#1F2937] w-1/2 mr-auto z-10 hidden md:flex justify-center items-center flex-1 ">
                        <img src={card} alt="" className="max-w-md w-full"/>
                </div>

            </div>




        </>
    )
}

export default Cadastro;