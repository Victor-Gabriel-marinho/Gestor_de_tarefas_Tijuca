import { FaUserCircle } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidDownArrow } from "react-icons/bi";
import PopUp from "./PopUp";
import { useState } from "react";

type ModalProps = {
    openModal: boolean,
    setopenmodal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal ({openModal, setopenmodal} : ModalProps) {

<<<<<<< HEAD
  const [popUp, setpopUp] = useState<boolean>(false);
  const [role, SetRole] = useState<string>("Colaborador");
=======
    const [popUp, setpopUp] = useState<boolean>(false)
    const [role, SetRole] = useState<string>('Colaborador')
>>>>>>> 53acb9c (ajustando funcionalidades do frontend)

  function HandlePopUp () {
    setpopUp(!popUp);
  }

  function handleModal () {
    setopenmodal(!openModal);
  }


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-balck/50 backdrop-blur-sm fixed inset-0" onClick={handleModal}>
      <div className="bg-[#524D50] w-[300px] h-[400px] sm:w-[652px] sm:h-[674px] rounded-[20px] sm:rounded-[50px] shadow-2xl shadow-[#524D50]" onClick={(event) => event.stopPropagation()}>
        <div className="flex flex-col text-white m-4 sm:m-9 gap-7 items-center">

          <div className="flex flex-row items-center w-full justify-between">
            <h2 className="text-2xl">Adicionar membros</h2>
            <IoCloseOutline className="text-4xl cursor-pointer" onClick={handleModal} />
          </div>

          <div className="w-full flex flex-row justify-between gap-4 items-center">
            <input type="email" placeholder="Email" className="border w-10/12 outline-0 border-[#746E72] p-2 font-semibold text-xl rounded-[10px]" />
            <input type="button" value="Convidar" className="bg-[#251F1F] cursor-pointer text-sm sm:text-base p-3.5 w-4/12 sm:w-2/12 font-semibold rounded-2xl"/>                    
          </div>

          <div className="h-0.5 w-full bg-[#A7A0A5]"></div>
                    
          <div className="flex items-center justify-between w-full">

                            <div className="items-center flex flex-row gap-2">
                                <FaUserCircle className="text-white text-5xl" />
                                <p className="text-xl">Nome</p>
                            </div>
                            
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-xl " onClick={HandlePopUp}>{role}</p>
                                <div className="relative">
                                    <BiSolidDownArrow className={`text-xl hidden ${popUp ? 'rotate-180' : ''} cursor-pointer`} onClick={HandlePopUp} />
                                    {popUp &&  <PopUp ClassName="bg-[#251F1F]" popUp = {popUp} setpopUp = {setpopUp} SetRole= {SetRole} />}
                                </div>
                            </div>
                    </div>  
                              
                </div>
               
            </div>
                            
            <div className="flex flex-row gap-2 items-center">
              <p className="text-xl " onClick={HandlePopUp}>{role}</p>
              <div className="relative">
                <BiSolidDownArrow className={`text-xl hidden sm:block ${popUp ? "rotate-180" : ""} cursor-pointer`} onClick={HandlePopUp} />
                {popUp &&  <PopUp ClassName="bg-[#251F1F]" popUp = {popUp} setpopUp = {setpopUp} SetRole= {SetRole} />}
              </div>
            </div>
          </div>  
                              
        </div>
               
      </div>
    </div>
  );
}

export default Modal;
