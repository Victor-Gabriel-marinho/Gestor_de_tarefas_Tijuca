import { FaUserCircle } from "react-icons/fa";
import Get_allPeoples_in_your_teams from "../../hooks/Team_hooks/get_allPeoples_in_your_team";
import { Loading_anim } from "../../components/commons/loading";

function People() {

  const {users, loading} = Get_allPeoples_in_your_teams()
       
  return (
    <main className="bg-[#20282F] w-full h-full min-w-[50px] flex flex-col gap-8 p-5 sm:pt-10 sm:px-15 sm:gap-15">
      <div className="flex flex-row items-center justify-start">
        <h1 className="text-white text-3xl sm:text-6xl font-semibold ">
          {" "}
          Pessoas que estão nos seus times{" "}
        </h1>
      </div>

      <div className="flex flex-col gap-5 sm:max-h-160 max-h-120 overflow-y-auto">
        {loading ? (
          <Loading_anim />
        ) : (
          users.map((user) => (
            <div
              className="flex-row flex gap-2 justify-between o items-center"
              key={user.id}
            >
              <div className="flex gap-4 items-center">
                <FaUserCircle className="text-white text-3xl sm:text-5xl" />
                <div className="flex flex-col">
                  <p className="text-white text-xl sm:text-2xl">{user.Name}</p>
                  <p className="text-[#AC8E8E] text-sm sm:text-xl">
                    {user.Role}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
        
}

export default People
