import { IoIosClose } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import { IoMdPricetag } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { GoPaperAirplane } from "react-icons/go";
import { useFont } from "./font";

function Modaltaf({ task, onClose }: { task: string; onClose: () => void }) {
  useFont(" 'Poppins', 'SansSerif' ");

  return (
    <>
      <div className="w-screen h-screen bg-black/50 flex items-center justify-center  fixed top-0 left-0 right-0 backdrop-blur-[20px]">
        <div className="bg-[#251F1F] h-50 w-80 rounded-[10px] shadow-2xl text-white relative p-10">
          <button
            className="absolute top-2 right-2 cursor-pointer"
            onClick={onClose}
          >
            <IoIosClose size={40} />
          </button>
          <div className="flex gap-1 flex-col h-20">
            <div className="flex flex-row gap-2">
              <input type="checkbox" name="" className="accent-[#22C55E]" />
              <p className="truncate">{task}</p>
            </div>

            <div>
              <div className="absolute top-[70px] flex gap-3 p-1">
                <FaClock className="hover:scale-110" size={30} />
                <GoPaperclip className="hover:scale-110" size={30} />
                <IoMdPricetag className="hover:scale-110" size={30} />
                <FaTrashCan className="hover:scale-110" color="red" size={30} />
              </div>
              <div className="flex items-center gap-2 mt-15">
                <input
                  type="text"
                  placeholder="Adicionar comentário"
                  className="absolute w-50 left-10 bg-white outline-none placeholder-gray-400 text-black rounded-[5px]  ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 truncate"
                />

                <button className="absolute w-[30px] h-[30px] p-1 left-[245px] bg-[#4b3f3f] hover:bg-[#574848] rounded-[10px] flex items-center justify-center">
                  <GoPaperAirplane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modaltaf;
