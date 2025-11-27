import { IoIosClose } from "react-icons/io";


function SucessInvite() {
    console.log('Modal abriu')

    return (
        <div className="h-screen w-screen flex items-center justify-center z-50 bg-black/50 fixed inset-0">
            <div className="bg-[#524D50] w-[250px] h-[175px] sm:w-[400px] sm:h-[175px] rounded-2xl p-5 shadow-2xl  flex items-center justify-center flex-col ">
                <button className=" cursor-pointer hover:scale-110 absolute top-3 right-3">
                    <IoIosClose size={40} />
                </button>
                <div>
                    <h1 className="text-cyan-50 font-bold text-[20px]">Convite enviado com sucesso!</h1>
                </div>
            </div>
        </div>
    )
}

export default SucessInvite;