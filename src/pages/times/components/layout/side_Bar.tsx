import { MdSupervisedUserCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Team } from "../../../../api/types/Team";
import Get_teams from "../../../../hooks/get_teams";

function Side_bar() {

  const [hiddenteams, Sethiddenteams] = useState<boolean>(false);
  const { id } = useParams(); 

  const { Teams, loading, first_team } = Get_teams();

  function handlehiddenteams(): void {
    Sethiddenteams(!hiddenteams);
  }

  return (
    <div className="h-15 sm:h-full w-full sm:w-60 bg-[#251F1F] justify-center sm:justify-start items-center static flex flex-row sm:flex-col gap-10 sm:gap-3 sm:pt-10">
      <div
        className={` ${
          hiddenteams
            ? "flex items-center justify-center h-full sm:h-20 gap-2 w-1/2 sm:w-full"
            : "flex items-center gap-2 relative z-10 sm:z-0 flex-col-reverse sm:flex-col w-1/2 sm:w-full"
        }`}
      >
        <span
          className={`flex flex-row items-center justify-center gap-2 h-10 sm:h-20`}
        >
          <Link to={`times/${first_team?.id}`}>
            <h2 className=" text-white font-semibold text-xl sm:text-4xl cursor-pointer">
              Times
            </h2>
          </Link>
          <IoIosArrowDown
            className={`text-white w-6 h-6 sm:w-9 sm:h-9 cursor-pointer rotate-180 ${
              hiddenteams ? "rotate-none" : ""
            }`}
            onClick={handlehiddenteams}
          />
        </span>

        {!hiddenteams && (
          <div className="flex h-80 w-50 sm:w-full absolute sm:static bg-zinc-900 sm:bg-[#251F1F] rounded-xl pt-3 left-5 bottom-full sm:bottom-0 z-50 sm:z-0 flex-col gap-4 sm:gap-7 ">
            {loading ? (
              <div>Carregando...</div>
            ) : (
              Teams.map((team: Team) => (
                <Link
                  to={`/times/${team.id}`}
                  state={{ team }}
                  onClick={() => {
                  if (window.innerWidth < 640){
                    handlehiddenteams()}}}
                  key={team.id}
                  className={`items-center gap-4 h-15 w-full justify-center flex ${
                    team.id === id ? "bg-[#7E7878]" : ""
                  }`}
                >
                  <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
                  <p className="text-white block sm:text-xl truncate">
                    {team.Name}
                  </p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      <Link
        to={"/"}
        className={`w-1/2 sm:w-full h-full sm:h-15 flex items-center  justify-center ${
          !id ? "bg-[#7E7878] " : ""
        }`}
      >
        <h2 className="text-white font-semibold text-xl sm:text-4xl cursor-pointer">
          Pessoas
        </h2>
      </Link>
    </div>
  );
}

export default Side_bar;