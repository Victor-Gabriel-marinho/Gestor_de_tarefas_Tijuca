import { GoPaperclip } from "react-icons/go";
import { IoMdPricetag } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

type ButtonBarProps = {
  setcriar: () => void;
  Settag: (value: string) => void;
  setconfimModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  setTrocarModal: React.Dispatch<
    React.SetStateAction<"first" | "second" | "users" | null>
  >;
  inputfile?: React.RefObject<HTMLInputElement | null>;
  viewusers: boolean;
  Setviewusers: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Buttons_Bar({isMobile,setconfimModal,setcriar,Settag,Setviewusers,inputfile,setTrocarModal,viewusers}: ButtonBarProps) {
  /* Estilo do hover */
  const hoverOptions ="absolute top-full mt-1 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black p-1 rounded-[5px] text-center";

      const selectfile = () => {
        if (inputfile?.current) {
          inputfile.current.click();
        }
      };

  return (
    <div className="w-full mx-5 flex justify-around gap-3">
      <div className="relative group flex flex-col items-center ">
        <FaUserPlus
          className="hover:scale-110 cursor-pointer size-8"
          onClick={() => {
            Setviewusers(!viewusers);
            if (isMobile) setTrocarModal("users");
          }}
        />
        <span className={hoverOptions}>Atribuita usuários</span>
      </div>
      {/*botão responsável por ativar o input type file*/}
      <button
        onClick={selectfile}
        className="relative group flex flex-col items-center"
      >
        <GoPaperclip
          className="hover:scale-110 cursor-pointer transition-transform size-8"
          
        />
        <span className={hoverOptions}>Coloque um arquivo</span>
      </button>
      <div className="relative group flex flex-col items-center">
        <IoMdPricetag
          className="hover:scale-110  cursor-pointer transition-transform size-8"
          size={25}
          onClick={() => {
            Settag("criar");
            if (isMobile) setTrocarModal("second");
          }}
        />
        <span className={hoverOptions}>Adicone uma Tag</span>
      </div>
      <div className="relative group flex flex-col items-center">
        <MdEdit
          className="cursor-pointer hover:scale-110 transition-transform size-8"
          size={25}
          onClick={setcriar}
        />
        <span className={hoverOptions}>Edite sua tarefa</span>
      </div>
      <div className="relative group flex flex-col items-center">
        <FaTrashCan
          className="hover:scale-110 cursor-pointer transition-transform size-8"
          color="red"
          size={25}
          onClick={() => {
            setconfimModal(true);
          }}
        />
        <span className={hoverOptions}>Apague sua Tarefa</span>
      </div>
    </div>
  );
}
