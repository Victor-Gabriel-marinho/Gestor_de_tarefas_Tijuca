import { MdSupervisedUserCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Team } from "../../../../api/types/TeamTypes/Team";
import Get_teams from "../../../../hooks/Team_hooks/get_teams";
import { Loading_anim } from "../../../../components/commons/loading";

function Side_bar() {
  const [hiddenteams, Sethiddenteams] = useState<boolean>(false);
  const { id } = useParams();

  const { Teams, loading, first_team } = Get_teams();

  function handlehiddenteams(): void {
    Sethiddenteams(!hiddenteams);
  }

  return (
    <div className="h-13 sm:h-full w-full sm:w-60 bg-[#251F1F] justify-start items-center sm:items-start fixed sm:static bottom-0 z-10 flex flex-row sm:flex-col gap-0 sm:gap-3 sm:pt-10">
      <div
        className={`
          flex items-center justify-center sm:items-start sm:justify-start
          ${
            hiddenteams
              ? "h-full sm:h-20  gap-2 w-1/2 sm:w-full"
              : "gap-2 relative z-10 sm:z-0 flex-col-reverse sm:flex-col w-1/2 sm:w-full"
          }`}
      >
        <span
          className={`flex flex-row items-center justify-center gap-2 h-full sm:h-20 w-full hover:bg-[#494545] transition-all`}
        >
          <Link to={`times/${first_team?.id}`}>
            <h2 className=" text-white font-semibold text-xl sm:text-4xl cursor-pointer">
              Times
            </h2>
          </Link>
          <IoIosArrowDown
            className={`text-white w-6 h-6 sm:w-9 sm:h-9 cursor-pointer rotate-180 transition-all ${
              hiddenteams ? "rotate-none" : ""
            }`}
            onClick={handlehiddenteams}
          />
        </span>

        {!hiddenteams && (
          <div className="flex max-h-80 sm:h-10/12 overflow-y-auto w-55 sm:w-full absolute sm:static bg-zinc-900 sm:bg-[#251F1F] rounded-[10px] sm:rounded-none p-2 sm:bottom-0 gap-2 gap-0 z-50 sm:z-0 flex-col left-10 bottom-10 sm:pl-5">
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
                  className={`items-center sm:my-4 p-2 gap-4 w-full justify-start flex flex-row rounded-[10px] hover:bg-[#494545] transition-all ${
                    team.id === id ? "bg-[#7E7878]" : ""
                  }`}
                >
                  <MdSupervisedUserCircle className="text-white text-xl sm:text-3xl w-1/3" />
                  <p className="text-white block sm:text-xl line-clamp-2 break-words w-2/3 max-w-[150px] max-h-[50px] overflow-hidden">
                    {team.Name}
                  </p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      <Link
        to={"/membros"}
        className={`w-1/2 sm:w-full h-full sm:h-20 flex items-center justify-center  hover:bg-[#494545] transition-all ${
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
