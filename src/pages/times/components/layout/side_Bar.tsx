import { MdSupervisedUserCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";



function Side_bar () {
    const [hiddenteams, Sethiddenteams] = useState<boolean>(false);
    const  [Activepeople, SetActivePeople] = useState<boolean>(false);

    function ActivePeople() {
      SetActivePeople(!ActivePeople)
    }
    
    function handlehiddenteams() {
        Sethiddenteams(!hiddenteams)
    }

    return(
        <div className="h-full w-30 sm:w-60 bg-[#251F1F] flex flex-col gap-3 pt-4 sm:pt-10">
    <div className=" flex flex-col gap-2">
      <span className={`flex flex-row items-center justify-center gap-2 h-10 sm:h-20 ${hiddenteams ? 'bg-[#7E7878]' : ''}`}>
        <h2 className=" text-white font-semibold text-xl sm:text-4xl cursor-pointer"> Times </h2>
        <IoIosArrowDown className={`text-white w-6 h-6 sm:w-9 sm:h-9 cursor-pointer rotate-180 ${hiddenteams ? 'rotate-none' : ''}`} onClick={handlehiddenteams} />
      </span>

      {!hiddenteams && (
      <div className='flex justify-start items-center flex-col gap-4 sm:gap-7 '>

          <div className='flex flex-row items-center  bg-[#7E7878] w-full p-3 sm:p-5 justify-center'>
            <Link to='/times/1' className="flex items-center gap-4 justify-center">
                <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
                <p className="text-white hidden sm:block sm:text-xl">time 1</p>
            </Link>
          </div>

        <Link to={'/times/2'}>
            <div className='flex flex-row items-center gap-4 cursor-pointer '>
              <MdSupervisedUserCircle className="text-white w-7 h-7 sm:w-9 sm:h-9" />
              <p className="text-white hidden sm:block sm:text-xl">time 2</p>
            </div>
        </Link>

        <Link to={'/times/3'}>
            <div className='flex flex-row items-center gap-4 cursor-pointer'>
              <MdSupervisedUserCircle className="text-white  w-7 h-7 sm:w-9 sm:h-9" />
              <p className="text-white hidden sm:block sm:text-xl">time 3</p>
            </div>
        </Link>
      </div>
    )}

    </div>

    <Link to={'/'} onClick={ActivePeople}>
      <div className={`flex justify-center`}>
        <h2 className=" text-white font-semibold text-xl sm:text-4xl cursor-pointer" > Pessoas </h2>
      </div>
    </Link>

    </div>
    )
}

export default Side_bar