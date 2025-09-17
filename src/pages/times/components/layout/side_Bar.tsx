import { MdSupervisedUserCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Team } from "../../../../api/types/Team";
import Get_teams from "../../../../hooks/get_teams";



function Side_bar () {
<<<<<<< HEAD
<<<<<<< HEAD
  const [hiddenteams, Sethiddenteams] = useState<boolean>(false);
  const [Peoples, SetPeoples] = useState<boolean>(true);

  const { Teams, loading, first_team } =  Get_teams();

  function HandlePeoples() {
    SetPeoples(!Peoples);

  }

  function falsePeoples() {
    SetPeoples(false);
  }
    
  function handlehiddenteams(): void {
    Sethiddenteams(!hiddenteams);
  }

  return(
    <div className="h-full w-30 sm:w-60 bg-[#251F1F] flex flex-col gap-3 pt-4 sm:pt-10">
      <div className=" flex flex-col gap-2">
          <span className={`flex flex-row items-center justify-center gap-2 h-10 sm:h-20 ${!Peoples ? "bg-[#7E7878]" : ""}`} onClick={falsePeoples}>
        <Link to={`times/${first_team?.Name}`}>
            <h2 className=" text-white font-semibold text-xl sm:text-4xl cursor-pointer"> Times </h2>
        </Link>
            <IoIosArrowDown className={`text-white w-6 h-6 sm:w-9 sm:h-9 cursor-pointer rotate-180 ${hiddenteams ? "rotate-none" : ""}`} onClick={handlehiddenteams} />
          </span>

        {!hiddenteams && (
          <div className='flex justify-start items-center flex-col gap-4 sm:gap-7 '>

            {loading ? (<div>Carregando...</div>) 
            : 
            Teams.map((team:Team) => (

              <Link to={`/times/${team.id}`} state={{team}} key={team.id} className="flex items-center gap-4 justify-center" onClick={falsePeoples}>

              <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
              <p className="text-white hidden sm:block sm:text-xl">{team.Name}</p>

            </Link>

            ))}
          </div>
        )}

      </div>

      <Link to={"/"} onClick={HandlePeoples}>
        <div className={`flex justify-center items-center ${Peoples ? "bg-[#7E7878] h-10 sm:h-20" : ""}`}>
          <h2 className=" text-white font-semibold text-xl sm:text-4xl cursor-pointer" > Pessoas </h2>
        </div>
      </Link>

    </div>
  );
}

export default Side_bar;
=======
    const [hiddenteams, Sethiddenteams] = useState<boolean>(false);
    const  [Activepeople, SetActivePeople] = useState<boolean>(false);
=======
  const [hiddenteams, Sethiddenteams] = useState<boolean>(false);
  const [Peoples, SetPeoples] = useState<boolean>(false);
>>>>>>> 2645210 (terminando funcionalidades)

  function HandlePeoples() {
    SetPeoples(!Peoples);

  }

  function falsePeoples() {
    SetPeoples(false);
  }
    
  function handlehiddenteams(): void {
    Sethiddenteams(!hiddenteams);
  }

  return(
    <div className="h-full w-30 sm:w-60 bg-[#251F1F] flex flex-col gap-3 pt-4 sm:pt-10">
      <div className=" flex flex-col gap-2">
        <Link to={"/times/1"}>
          <span className={`flex flex-row items-center justify-center gap-2 h-10 sm:h-20 ${!Peoples ? "bg-[#7E7878]" : ""}`} onClick={falsePeoples}>
            <h2 className=" text-white font-semibold text-xl sm:text-4xl cursor-pointer"> Times </h2>
            <IoIosArrowDown className={`text-white w-6 h-6 sm:w-9 sm:h-9 cursor-pointer rotate-180 ${hiddenteams ? "rotate-none" : ""}`} onClick={handlehiddenteams} />
          </span>
        </Link>

        {!hiddenteams && (
          <div className='flex justify-start items-center flex-col gap-4 sm:gap-7 '>

            <Link to={"/times/1"} className="flex items-center gap-4 justify-center" onClick={falsePeoples}>
              <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
              <p className="text-white hidden sm:block sm:text-xl">time 1</p>
            </Link>

            <Link to={"/times/2"} onClick={falsePeoples}>
              <div className='flex flex-row items-center gap-4 cursor-pointer '>
                <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
                <p className="text-white hidden sm:block sm:text-xl">time 2</p>
              </div>
            </Link>

            <Link to={"/times/3"} onClick={falsePeoples}>
              <div className='flex flex-row items-center gap-4 cursor-pointer'>
                <MdSupervisedUserCircle className="text-white  w-7 h-7 sm:w-9 sm:h-9" />
                <p className="text-white hidden sm:block sm:text-xl">time 3</p>
              </div>
            </Link>
          </div>
        )}

      </div>

      <Link to={"/"} onClick={HandlePeoples}>
        <div className={`flex justify-center items-center ${Peoples ? "bg-[#7E7878] h-10 sm:h-20" : ""}`}>
          <h2 className=" text-white font-semibold text-xl sm:text-4xl cursor-pointer" > Pessoas </h2>
        </div>
      </Link>

    </div>
  );
}

<<<<<<< HEAD
export default Side_bar
>>>>>>> 53acb9c (ajustando funcionalidades do frontend)
=======
export default Side_bar;
>>>>>>> 2645210 (terminando funcionalidades)
