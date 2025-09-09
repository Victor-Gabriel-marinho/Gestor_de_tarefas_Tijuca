import { FaUserCircle } from "react-icons/fa";

function People() {
       
  return(

    <main className="bg-[#20282F] w-full h-full min-w-[50px] pt-2 px-3 sm:pt-10 sm:px-15 flex flex-col gap-8 sm:gap-15">
      <div className="flex flex-row items-center justify-start">
        <h1 className="text-white text-3xl sm:text-6xl font-semibold"> Pessoas que estão nos seus times </h1>
      </div>
      <div className="flex-row flex gap-2 justify-between items-center ">
        <div className="flex gap-4 items-center">
          <FaUserCircle className="text-white text-3xl sm:text-5xl" />
          <div className="flex flex-col">
            <p className="text-white text-xl sm:text-2xl">Nome</p>
            <p className="text-[#AC8E8E] text-sm sm:text-xl">Cargo</p>
          </div>
        </div>
      </div>

      <div className="flex-row flex gap-2 justify-between items-center ">
        <div className="flex gap-4 items-center">
          <FaUserCircle className="text-white text-3xl sm:text-5xl" />
          <div className="flex flex-col">
            <p className="text-white text-xl sm:text-2xl">Nome</p>
            <p className="text-[#AC8E8E] text-sm sm:text-xl">Cargo</p>
          </div>
        </div>
      </div>

      <div className="flex-row flex gap-2 justify-between items-center ">
        <div className="flex gap-4 items-center">
          <FaUserCircle className="text-white text-3xl sm:text-5xl" />
          <div className="flex flex-col">
            <p className="text-white text-xl sm:text-2xl">Nome</p>
            <p className="text-[#AC8E8E] text-sm sm:text-xl">Cargo</p>
          </div>
        </div>
      </div>
    </main>);
        
}

export default People;