import { MdSupervisedUserCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Team } from "../../../../api/types/TeamTypes/Team";
import Get_teams from "../../../../hooks/get_teams";
import { Loading_anim } from "../../../../components/commons/loading";

function Side_bar() {
  const [hiddenteams, Sethiddenteams] = useState<boolean>(false);
  const { id } = useParams();

  const { Teams, loading, first_team } = Get_teams();

  function handlehiddenteams(): void {
    Sethiddenteams(!hiddenteams);
  }

  return (
    <div className="h-13 sm:h-full w-full sm:w-60 bg-[#251F1F] justify-center sm:justify-start items-center fixed sm:static bottom-0 z-10 flex flex-row sm:flex-col gap-10 sm:gap-3 sm:pt-10">
      <div
        className={`${
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
          <div className="flex max-h-80 sm:h-10/12 overflow-y-auto w-55 sm:w-full absolute sm:static bg-zinc-900 sm:bg-[#251F1F] rounded-xl sm:rounded-none left-5 bottom-full sm:bottom-0 z-50 sm:z-0 flex-col gap-4 sm:gap-7 ">
            {loading ? (
              <Loading_anim />
            ) : (
              Teams.map((team: Team) => (
                <Link
                  to={`/times/${team.id}`}
                  state={{ team }}
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      handlehiddenteams();
                    }
                  }}
                  key={team.id}
                  className={`items-center sm:pl-3 p-2 gap-4 h-13 w-full rounded-xl sm:rounded-none justify-start flex flex-row ${
                    team.id === id ? "bg-[#7E7878]" : ""
                  }`}
                >
                  <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
                  <p className="text-white block sm:text-xl ">
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
