import { MdSupervisedUserCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../components/Modal.jsx";
import { useFont } from "../../components/font.js";
import { useState } from "react";

function Times() {
  const [openModal, SetopenModal] = useState(false);

  function Openmodal() {
    SetopenModal(true);
  }

  useFont(" 'Poppins', 'SansSerif' ");

  return (
    <div className="relative">
      <div className="w-screen h-screen flex flex-col">
        <nav className="w-full h-17 bg-[#524D50]"></nav>
        <div className="flex-1 flex flex-row">
          <div className="h-full w-60 bg-[#251F1F] flex flex-col gap-7 pt-10">
            <div className=" flex flex-col gap-8">
              <span className="flex flex-row items-center justify-center gap-2">
                <h2 className=" text-white font-semibold text-4xl"> Times </h2>
                <IoIosArrowDown className="text-white w-9 h-9" />
              </span>
              <div className=" flex justify-start items-center flex-col gap-7 font-semibold">
                <div className="bg-[#7E7878] w-full h-15 flex justify-center">
                  <div className="flex flex-row items-center gap-4">
                    <MdSupervisedUserCircle className="text-white w-9 h-9" />
                    <p className="text-white text-xl">time 1</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <MdSupervisedUserCircle className="text-white w-9 h-9" />
                  <p className="text-white text-xl">time 2</p>
                </div>

                <div className="flex flex-row items-center gap-4">
                  <MdSupervisedUserCircle className="text-white w-9 h-9" />
                  <p className="text-white text-xl">time 3</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <h2 className=" text-white font-semibold text-4xl"> Pessoas </h2>
            </div>
          </div>
          <div className="bg-[#20282F] flex-1 pt-10 px-15 flex flex-col gap-15">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-white text-6xl font-semibold"> Membros </h1>
              <div
                onClick={Openmodal}
                className="h-10 w-10 bg-[#3E5C76] flex items-center justify-center rounded-full cursor-pointer"
              >
                <span className="text-white text-3xl font-semibold"> + </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-8">
                <div className="flex-row flex gap-2 justify-between items-center">
                  <div className="flex gap-4">
                    <FaUserCircle className="text-white text-5xl" />
                    <div className="flex flex-col">
                      <p className="text-white text-2xl">Nome</p>
                      <p className="text-[#AC8E8E] text-xl">Cargo</p>
                    </div>
                  </div>
                  <BsThreeDotsVertical className="text-white text-3xl" />
                </div>
                <div className="flex-row flex gap-2 justify-between items-center">
                  <div className="flex gap-4">
                    <FaUserCircle className="text-white text-5xl" />
                    <div className="flex flex-col">
                      <p className="text-white text-2xl">Nome</p>
                      <p className="text-[#AC8E8E] text-xl">Cargo</p>
                    </div>
                  </div>
                  <BsThreeDotsVertical className="text-white text-3xl" />
                </div>
                <div className="flex-row flex gap-2 justify-between items-center">
                  <div className="flex gap-4">
                    <FaUserCircle className="text-white text-5xl" />
                    <div className="flex flex-col">
                      <p className="text-white text-2xl">Nome</p>
                      <p className="text-[#AC8E8E] text-xl">Cargo</p>
                    </div>
                  </div>
                  <BsThreeDotsVertical className="text-white text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModal && <Modal />}
    </div>
  );
}

export default Times;
