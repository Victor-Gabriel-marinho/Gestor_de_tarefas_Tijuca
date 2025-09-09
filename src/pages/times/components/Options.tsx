type OptionsProps = {
    children?: React.ReactNode;
}

function Options({children}: OptionsProps) {

    
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2645210 (terminando funcionalidades)
  return (
    <div className="bg-[#251F1F] w-full h-[150px] sm:h-[173px] rounded-b-[20px] rounded-t-[10px] flex flex-col">
      {children}
      <div className="w-full h-[94px] flex items-center justify-around">
        <input type="button" value="Remover" className=" w-[80px] sm:w-[250px] h-[38px] text-sm sm:text-xl text-white bg-[#F21223] cursor-pointer rounded-[10px]" />
        <input type="button" value="Promover" className="w-[80px] sm:w-[250px] h-[38px] text-sm sm:text-xl text-white bg-[#076F37] cursor-pointer rounded-[10px]" />
      </div>
    </div>
  );
<<<<<<< HEAD
}

export default Options;
=======
    return (
        <div className="bg-[#251F1F] w-full h-[150px] sm:h-[173px] rounded-b-[20px] rounded-t-[10px] flex flex-col">
            {children}
            <div className="w-full h-[94px] flex items-center justify-around">
                <input type="button" value="Remover" className=" w-[80px] sm:w-[250px] h-[38px] text-sm sm:text-xl text-white bg-[#F21223] cursor-pointer rounded-[10px]" />
                <input type="button" value="Promover" className="w-[80px] sm:w-[250px] h-[38px] text-sm sm:text-xl text-white bg-[#076F37] cursor-pointer rounded-[10px]" />
            </div>
        </div>
    )
}

export default Options
>>>>>>> 53acb9c (ajustando funcionalidades do frontend)
=======
}

export default Options;
>>>>>>> 2645210 (terminando funcionalidades)
