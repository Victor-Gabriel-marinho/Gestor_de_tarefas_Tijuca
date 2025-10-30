import { useEffect, useState } from "react";
import { LabelService } from "../../../api/services/labelService";
import { useTagsTeam } from "../../../hooks/get_allLabels_in_team";
import { useCheckTaskLabel } from "../../../hooks/check_labeltask";

type TagCreatedProps = {
  fetchTagsTeam: () => void
  idSelected: string
  idTeam: string | undefined
  tagsteam: { id: string; Name: string; Color: string}[];
  onVoltar: () => void;
  onDefinir: () => void;
};

function TagCreated({tagsteam, onVoltar, idSelected, onDefinir, fetchTagsTeam} : TagCreatedProps){
    const[error, setError] = useState<string>("")
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const {checkIfExist} = useCheckTaskLabel()

    async function AddTag(event: React.MouseEvent<HTMLParagraphElement>, tagId:string){
      event.preventDefault()
      console.log("TagId: ", tagId)
      const label = {
          idtask: idSelected,
          idlabel: tagId
        }
      const exists = await checkIfExist(label.idtask, label.idlabel)
      if(exists === undefined ){
        try {
          const add_tag = await LabelService.Add_New_Label(label)
          console.log('tag criada')
          if(!add_tag){
            setError("Erro ao adicionar tag")
          }
        } catch (error) {
          console.log(error)
        }
      }else if (exists){
        await LabelService.Remove_LabelTask(label)
        setActiveTags((prev)=> prev.filter((id)=> id !== tagId))
        console.log("tag excluida")
      }else{
        await LabelService.Activate_LabelTask(label)
        setActiveTags((prev) => [...prev, tagId]);
        console.log("tag adicionada")
      }
      onDefinir()
      fetchTagsTeam()
    }    
    return (
        <div className="bg-[#251F1F] p-8 rounded-lg text-white text-center">
          <h2 className="text-lg font-semibold mb-3">Tags do Time</h2>
           
            <div className="flex flex-wrap items-center justify-center gap-2 w-[270px] max-w-[270px] sm:max-w-[480px] sm:w-[480px]">
            {tagsteam.map((tag)=>{
              const isActive = activeTags.includes(tag.id)
              console.log(isActive)
              return(
                <p 
                key={tag.id} 
                style={{backgroundColor: tag.Color}} 
                className={`rounded-[10px] p-1 shadow-xl shadow-black/40 cursor-pointer transition
                ${ isActive ? "opacity-50 scale-105": "opacity-100 hover:opacity-80"}`}
                onClick={(e)=> AddTag(e, tag.id)}
                >{tag.Name}</p>
              );
            })}
            
            </div>
            <div className="flex flex-row gap-3 justify-center items-center">
              <button
                onClick={onVoltar}
                className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-2 rounded mt-4"
              >
                Criar uma Tag
              </button>
              <button
              className="bg-red-800 hover:bg-red-900 text-white px-2 py-2 rounded mt-4">
                Delete Tag
              </button>
            </div>
        </div>
  );
}

export default TagCreated