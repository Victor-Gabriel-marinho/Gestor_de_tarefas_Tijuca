type OptionsProps = {
    children?: React.ReactNode;
}

function Options({children}: OptionsProps) {
    return (
        <div className="bg-[#251F1F] w-full h-[173px] rounded-b-[20px] rounded-t-[10px] flex flex-col">
            {children}
            <div className="w-full h-[94px] flex items-center justify-around">
                <input type="button" value="Remover" className="w-[250px]  h-[38px] text-white bg-[#F21223] rounded-[10px]" />
                <input type="button" value="Promover" className="w-[250px] h-[38px] text-white bg-[#076F37] rounded-[10px]" />
            </div>
        </div>
    )
}

export default Options