import { IoIosClose } from "react-icons/io";

type SucessInviteProps = {
    onClose : ()=> void
}
function SucessInvite({onClose}:SucessInviteProps) {
    console.log('Modal abriu')

    
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center z-50 bg-black/50 fixed inset-0">
            <div className="bg-[#524D50] w-[250px] h-[175px] sm:w-[400px] sm:h-[175px] rounded-2xl p-5 shadow-2xl  flex items-center justify-center flex-col relative">
                <IoIosClose size={40} className=" text-amber-50 flex cursor-pointer absolute top-1 right-1" 
                onClick={onClose}/>
                <div>
                    <h1 className="text-green-500 font-bold text-[20px]">Convite enviado com sucesso!</h1>
                </div>
            </div>
        </div>
    )
}

export default SucessInvite;