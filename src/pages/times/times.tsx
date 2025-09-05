import { MdSupervisedUserCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../components/Modal.jsx";
import Options from "../../components/Options.js";
import { useFont } from "../font";
import { useState } from "react";

function Times() {
  const [openModal, SetopenModal] = useState<boolean>(false);
  const [hiddenteams, Sethiddenteams] = useState<boolean>(false);
  const [options, Setoptions] = useState<boolean>(false)

  function Handlemodal() {
    SetopenModal(!openModal);
  }

  function handleOptions () {
    Setoptions(!options)
  }

  function hiddenTeams () {
    Sethiddenteams(!hiddenteams)
  }

  useFont(" 'Poppins', 'SansSerif' ");

  return (
    <div className="relative z-0">
      <div className="w-screen h-screen flex flex-col">
        <nav className="w-full h-10 sm:h-17 bg-[#524D50]"></nav>
        <div className="flex-1 flex flex-row">

          <div className="h-full w-30 sm:w-60 bg-[#251F1F] flex flex-col gap-3 pt-4 sm:pt-10">
            <div className=" flex flex-col gap-2">
              <span className={`flex flex-row items-center justify-center gap-2 h-10 sm:h-20 ${hiddenteams ? 'bg-[#7E7878]' : ''}`}>
                <h2 className=" text-white font-semibold text-xl sm:text-4xl"> Times </h2>
                <IoIosArrowDown className={`text-white w-6 h-6 sm:w-9 sm:h-9 rotate-180 ${hiddenteams ? 'rotate-none' : ''}`} onClick={hiddenTeams} />
              </span>

              {!hiddenteams && (
              <div className='flex justify-start items-center flex-col gap-4 sm:gap-7 '>

                <div className='bg-[#7E7878] w-full h-10 flex justify-center '>
                  <div className='flex flex-row items-center gap-4'>
                    <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
                    <p className="text-white hidden sm:block sm:text-xl">time 1</p>
                  </div>
                </div>

                <div className='flex flex-row items-center gap-4 '>
                  <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
                  <p className="text-white hidden sm:block sm:text-xl">time 2</p>
                </div>

                <div className='flex flex-row items-center gap-4'>
                  <MdSupervisedUserCircle className="text-white  w-7 h-7 sm:w-9 sm:h-9" />
                  <p className="text-white hidden sm:block sm:text-xl">time 3</p>
                </div>
              </div>
            )}

            </div>

            <div className="flex justify-center">
              <h2 className=" text-white font-semibold text-xl sm:text-4xl"> Pessoas </h2>
            </div>
          </div>

          <main className="bg-[#20282F] w-full h-full min-w-[50px] pt-2 px-3 sm:pt-10 sm:px-15 flex flex-col gap-8 sm:gap-15">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-white text-3xl sm:text-6xl font-semibold"> Membros </h1>
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
        </div>
      </div>

      {openModal && <Modal setopenmodal={SetopenModal} openModal={openModal} />}
    </div>
  );
}

export default Times;
