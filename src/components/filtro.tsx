function Filtrar() {
    return (

        <div className="flex flex-col  bg-[#251F1F] text-white w-[300px] rounded-[10px] absolute right-[-50px] sm:right-0 z-50 ">
            <p className="p-1">Filtro</p>
            <h3 className="p-2">Estatus da tarefa</h3>
            <ul className="p-3 space-y-2 flex flex-col gap-2">
                <form action="" className="flex  flex-col gap-4">
                    <li className="flex flex-row items-center">
                        <input type="checkbox" name="" id="concluidos" className="appearance-none  rounded-full w-4 h-4 border border-white checked:bg-green-500 " />
                        <p className="pl-2">Concluidos</p></li>
                    <li className="flex flex-row items-center">
                        <input type="checkbox" name="" id="nao concluidas" className="appearance-none rounded-full w-4 h-4 border border-white checked:bg-green-500 " />
                        <p className="pl-2">Não Concluidas</p></li>
                    <li className="flex flex-row items-center">
                        <input type="checkbox" name="" id="pendente" className="appearance-none rounded-full w-4 h-4 border border-white checked:bg-green-500 " />
                        <p className="pl-2">Pendente</p></li>
                </form>
            </ul>
            <p className="p-2">Prazo</p>
            <ul className="p-3 space-y-2">
                <label htmlFor="atraso" className="flex items-center gap-2 cursor-pointer">
                    <li className="flex flex-row items-center">
                        <input type="checkbox" name="" id="atraso" className="appearance-none rounded-full w-4 h-4 border border-white checked:bg-green-500" />
                        <p className="pl-2">Em atraso</p></li>
                </label>
                <label htmlFor="dia" className="flex items-center gap-2 cursor-pointer">
                    <li className="flex flex-row items-center">
                        <input type="checkbox" name="" id="dia" className="appearance-none rounded-full w-4 h-4 border border-white checked:bg-green-500" />
                        <p className="pl-2">Em um dia</p></li>
                </label>
                <label htmlFor="semana" className="flex items-center gap-2 cursor-pointer">
                    <li className="flex flex-row items-center">
                        <input type="checkbox" name="" id="semana" className="appearance-none rounded-full w-4 h-4 border border-white checked:bg-green-500" />
                        <p className="pl-2">Entregar em uma semana</p></li>
                </label>
                <label htmlFor="mes" className="flex items-center gap-2 cursor-pointer">
                    <li className="flex flex-row items-center">
                        <input type="checkbox" name="" id="mes" className="appearance-none rounded-full w-4 h-4 border border-white checked:bg-green-500" />
                        <p className="pl-2">Entregar em um mês</p></li>
                </label>
            </ul>

        </div>

    )
}

export default Filtrar