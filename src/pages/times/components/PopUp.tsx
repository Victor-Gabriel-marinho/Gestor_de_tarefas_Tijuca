
type PopUpProps = {
  setpopUp: React.Dispatch<React.SetStateAction<string>>;
  ClassName?: string;
  SetRoleName: (role: string) => void;
};

function PopUp ({setpopUp, SetRoleName}: PopUpProps) {  

  function alterarRole (role: string){
    setpopUp
    SetRoleName(role);    
  }  

  return (
    <div className="absolute top-0 right-0 z-50 rounded-[10px] bg-black">
      <div
        className={`w-[100px] h-[110px] sm:w-[150px] sm:h-[133px] flex items-center justify-center rounded-[15px]`}
      >
        <div className="flex flex-col w-full h-full items-center justify-center p-2">
          <div
            className="flex items-center justify-center h-1/2 w-full font-semibold cursor-pointer text-sm sm:hover:text-[16px] sm:transition-all"
            onClick={() => alterarRole("Gestor")}
          >
            Gestor
          </div>

          <div className="w-full h-0.5 bg-white "></div>

          <div
            className="flex items-center justify-center h-1/2 w-full font-semibold cursor-pointer text-sm sm:hover:text-[16px] sm:transition-all"
            onClick={() => alterarRole("Colaborador")}
          >
            Colaborador
          </div>
        </div>
      </div>
    </div>
  );

}

export default PopUp;