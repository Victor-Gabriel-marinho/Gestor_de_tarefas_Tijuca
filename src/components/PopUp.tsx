import { BiSolidDownArrow } from "react-icons/bi";


type PopUpProps = {
  popUp: boolean;
  setpopUp: React.Dispatch<React.SetStateAction<boolean>>;
  ClassName?: string;
  SetRole: React.Dispatch<React.SetStateAction<string>>;
  SetRole_id: React.Dispatch<React.SetStateAction<string>>;
};

function PopUp ({popUp, setpopUp, ClassName="", SetRole,SetRole_id, ...Props}: PopUpProps) {

  function alterarRole (role: string){
    if (role === "Gestor") {
      SetRole_id("2")
    } else {
      SetRole_id("3")
    }
      SetRole(role);
    setpopUp(!popUp);
  }


  return (
    <div {...Props} className={` w-[122px] h-[133px] flex flex-col items-center justify-center rounded-[15px] ${ClassName} top-0 right-1/12 absolute` }>
      <BiSolidDownArrow className={"text-xl rotate-180 justify-end cursor-pointer m-1 absolute top-0 right-0"} onClick={() => {setpopUp(!popUp);}}/>
      <div className="flex flex-col gap-4 items-center">
        <p className=" font-semibold cursor-pointer" onClick={() => alterarRole("Gestor")}>Gestor</p>
        <div className="w-full h-0.5 bg-white"></div>
        <p className=" font-semibold cursor-pointer" onClick={() => alterarRole("Colaborador")} >Colaborador</p>
      </div>
    </div>
  );



  return (
    <div {...Props} className={` w-[122px] h-[133px] flex flex-col items-center justify-center rounded-[15px] ${ClassName} top-0 right-1/12 absolute` }>
      <BiSolidDownArrow className={"text-xl rotate-180 justify-end cursor-pointer m-1 absolute top-0 right-0"} onClick={() => {setpopUp(!popUp);}}/>
      <div className="flex flex-col gap-4 items-center">
        <p className=" font-semibold cursor-pointer" onClick={() => alterarRole("Gestor")}>Gestor</p>
        <div className="w-full h-0.5 bg-white"></div>
        <p className=" font-semibold cursor-pointer" onClick={() => alterarRole("Colaborador")} >Colaborador</p>
      </div>
    </div>
  );

}

export default PopUp;