import { BiSolidDownArrow } from "react-icons/bi";


type PopUpProps = {
  popUp: string;
  setpopUp: React.Dispatch<React.SetStateAction<string>>;
  ClassName?: string;
  SetRoleName: (role: string) => void;
};

function PopUp ({setpopUp, ClassName="", SetRoleName}: PopUpProps) {

  function alterarRole (role: string){
    SetRoleName(role);
    setpopUp("");
  }


  return (
    <div className="absolute top-0 right-0 z-50 rounded-[10px] bg-black">
      <div className={`w-[100px] h-[110px] sm:w-[122px] sm:h-[133px] flex items-center justify-center rounded-[15px] ${ClassName}` }>
        <BiSolidDownArrow className={"text-sm sm:text-xl rotate-180 justify-end cursor-pointer m-1 absolute top-0 right-0"} onClick={() => {setpopUp("");}}/>
        <div className="flex flex-col gap-3 sm:gap-4 items-center">
          <p className=" font-semibold cursor-pointer text-sm" onClick={() => alterarRole("Gestor")}>Gestor</p>
          <div className="w-full h-0.5 bg-white "></div>
          <p className=" font-semibold cursor-pointer text-sm" onClick={() => alterarRole("Colaborador")} >Colaborador</p>
        </div>
      </div>
    </div>
  );

}

export default PopUp;