import { useState, type FormEvent } from "react"
import { LabelService } from "../../../api/services/labelService";
import { useTags } from "../../../hooks/get_alllabels_in_tasks";
import { IoIosClose } from "react-icons/io";
type tagProps = {
  onDefinir: () => void,
  idSelected: string,
  onVerCriadas: () => void;
  onFechar: ()=> void;
}

function Tag({onDefinir,idSelected, onVerCriadas, onFechar} : tagProps) {
    const[input, Setinput] = useState("")
    const[error, setError] = useState<string>("")

    
    async function Create_tag(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formdata = new FormData(event.currentTarget)

        const Name = formdata.get("Name") as string
        const Color = formdata.get("Color") as string

        const label =  {
          Name: Name,
          Color: Color,
          idtask: idSelected,
          isActive: true
        }
        try{
          const new_tag = await LabelService.Create_Label(label)
          onDefinir();
          useTags(idSelected);
          if (!new_tag){
            setError("Não foi possível criar a tag")
          }
        }catch(err){
          console.log(err)
        }
    }

    return (
      <div className="flex flex-col text-center items-center justify-center bg-[#251F1F] p-3 w-[250px] h-[260px] rounded-[10px] shadow-2xl shadow-[#3b3232]">
        <div className=" w-[240px] flex flex-row justify-between p-2">
          <h2 className="text-white text-lg mb-2 font-semibold pt-1">Criar Tag</h2>
          <button
            className=" text-amber-50 cursor-pointer hover:scale-110"
            onClick={onFechar}
          >
            <IoIosClose size={40} />
          </button>
        </div>
        <form
          action=""
          onSubmit={(event)=> Create_tag(event)}
          className="flex flex-col gap-3 space-y-1"
        >
          <input
            type="text"
            name="Name"
            id=""
            className="bg-white outline-none rounded-[5px] w-50 p-1 truncate "
            value={input}
            onChange={(e) => Setinput(e.target.value)}
            placeholder="Nome da tag"
          />
          <input type="color" name="Color" className="w-50 h-10 truncate text-white bg-blue-500"  />
          <input
            type="submit"
            value="Definir tag"
            className="bg-green-500 text-white rounded-[5px] cursor-pointer"
          />
          <input 
            type="button"
            value="Use Tags existentes"
            className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-2 rounded mt-4"
            onClick={onVerCriadas}
           />
        </form>
        
      </div>
    );
}

export default Tag