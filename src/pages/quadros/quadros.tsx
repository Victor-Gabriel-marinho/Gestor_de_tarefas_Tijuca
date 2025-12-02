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
  const [Name, SetName] = useState<string>("");
  const { Teams, loading, refetch_teams } = Get_teams();
  const [error, seterror] = useState<string>("");

  const create_team = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!Name || Name.trim() === "") {
        seterror("Digite um nome para o time.");
        return;
      }

      const response = await TeamService.Create_Team(Name);
      if (response) {
        refetch_teams();
        SetName("");
        Setcriar(false);
      }
    } catch (error) {
      console.error("erro ao fazer requisição", error);
    }
  };

  return (
    <>
      <div className="bg-[#1F2937] w-screen h-screen flex flex-col overflow-x-hidden">
        <Nav />
        <main className="flex flex-1 flex-col h-full relative">
          <div className="flex flex-col justify-center items-center mt-5 p-1 font-semibold">
            <h2 className="text-2xl text-white">Quadros dos Times 📋</h2>
            <p className="text-white">Selecione o time que deseja entrar</p>
          </div>
          <div className="w-full overflow-visible flex flex-wrap justify-center items-center sm:justify-start sm:items-start sm:m-10 gap-5 gap-y-1'">
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
                    <div className="w-30 h-30 sm:w-40 sm:h-40 bg-cover rounded-2xl flex items-end">
                      <div className="bg-[#251F1F] w-50 rounded-[5px] p-1 flex flex-wrap sm:p-3">
                        <p className="text-white font-semibold line-clamp-2 break-words whitespace-normal max-w-[120px]">
                          {team.Name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
            <div
              id="criar"
              className={`absolute sm:left-10 ${
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
                    onChange={(e) => SetName(e.target.value)}
                    value={Name}
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
                {error && (
                  <div
                    className="p-2 bg-red-500 text-white rounded-[10px] cursor-pointer"
                    onClick={() => seterror("")}
                  >
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Quadros;
