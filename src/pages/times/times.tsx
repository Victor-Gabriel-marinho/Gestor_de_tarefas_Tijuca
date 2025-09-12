import { FaUserCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../components/Modal.jsx";
<<<<<<< HEAD
import Options from "./components/Options.js";
=======
import { useFont } from "../../components/font.js";
>>>>>>> feature/lista-de-tarefas
import { useState } from "react";
import { useParams } from "react-router-dom";


function Times() {
  const [openModal, SetopenModal] = useState<boolean>(false);
  const [options, Setoptions] = useState<boolean>(false);
  const {id} = useParams();

  function Handlemodal() {
    SetopenModal(!openModal);
  }

  function handleOptions () {
    Setoptions(!options);
  }


  return (
    <div className="relative w-full h-full">


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

              <Options>

                <div className="flex-row flex gap-2 m-2 justify-between items-center">
                  <div className="flex gap-4">
                    <FaUserCircle className="text-white text-3xl sm:text-5xl" />
                    <div className="flex flex-col">
                      <p className="text-white text-xl sm:text-2xl">Nome</p>
                      <p className="text-[#AC8E8E] text-sm sm:text-xl">Cargo</p>
                    </div>
                  </div>
                  <BsThreeDotsVertical className="text-white text-xl sm:text-3xl cursor-pointer rotate-90" onClick={handleOptions} />
                </div>

              </Options> 
            )
              :  
              (
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
              )}
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

      {openModal && <Modal setopenmodal={SetopenModal} openModal={openModal} />}
    </div>
  );
}

export default Times;
