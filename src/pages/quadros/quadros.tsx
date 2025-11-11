import Nav from "../../components/layouts/nav.tsx";
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useFont } from "../../components/font.tsx";
import Get_teams from "../../hooks/Team_hooks/get_teams";
import { TeamService } from "../../api/services/teamService.ts";
import { Loading_anim } from "../../components/commons/loading.tsx";

function Quadros() {
  useFont(" 'Poppins', 'SansSerif' ");

  const [criar, Setcriar] = useState(false);
  const { Teams, loading, refetch_teams } = Get_teams();

  const create_team = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    const Team_Name = formdata.get("Nome_do_time") as string;

    try {
      if (!Team_Name) return;
      const response = await TeamService.Create_Team(Team_Name);
      if (response) {
        refetch_teams();
        Setcriar(false)
      }
    } catch (error) {
      console.log("erro ao fazer requisição", error);
    }
  };

  return (
    <>
      <div className="bg-[#1F2937] w-screen h-screen flex flex-col overflow-x-hidden">
        <Nav />
       <div className="flex flex-col justify-center items-center p-1 font-semibold">
         <h2 className="text-2xl text-white">Quadros dos Times 🗃</h2> 
         <p className="text-white">Selecione o time que deseja entrar</p>
       </div>
        <main className="flex flex-1 justify-center">
             
          <div className="w-full max-h-110 lg:h-50 overflow-y-auto relative grid items grid-cols-2 sm:flex m-5 sm:flex-row sm:gap-6">
             
            <div
              onClick={() => Setcriar(!criar)}
              className="w-30 h-30 sm:w-40 sm:h-40 bg-[#131733] rounded-2xl flex items-center justify-center hover:bg-[#2d304b] hover:scale-100 transition-all cursor-pointer"
            >
              <p className="text-white">Criar quadro</p>
            </div>

            {loading ? (
              <Loading_anim />
            ) : (
              Teams.map((team) => (
                <Link
                  to={`/lista/${team.id}`}
                  className="w-30 h-30 sm:w-40 sm:h-40 bg-white rounded-2xl hover:scale-105 transition-all flex items-end"
                  key={team.id}
                >
                  <div className="">
                    <div
                      className="w-30 h-30 sm:w-40 sm:h-40 bg-cover bg-center rounded-2xl flex items-end"
                    >
                      <div className="bg-[#251F1F] w-50 rounded-[5px] p-1 flex-wrap sm:p-3">
                        <p className="text-white font-semibold">{team.Name}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div
            id="criar"
            className={`absolute top-13 right-4 sm:left-50  ${
              criar ? "block" : "hidden"
            }`}
          >

            <div className="bg-[#111827] text-white flex flex-col justify-evenly w-60 h-70 p-4 rounded-2xl ">
              <p className="text-xl font-bold">Criar Quadro</p>
              <form
                action=""
                className="flex flex-col gap-3"
                onSubmit={(event) => create_team(event)}
              >
                <input
                  name="Nome_do_time"
                  type="text"
                  className="bg-white outline-none text-black p-1 rounded-md"
                  placeholder="Nome do time"
                  required
                />

                <button
                  className="bg-[#22C55E] p-1 rounded-md cursor-pointer"
                  type="submit"
                >
                  Criar
                </button>
                <button
                  type="button"
                  onClick={() => Setcriar(false)}
                  className="bg-[#251F1F] p-1 rounded-md cursor-pointer"
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </main>

      
      </div>
      
    </>
  );
}

export default Quadros;
