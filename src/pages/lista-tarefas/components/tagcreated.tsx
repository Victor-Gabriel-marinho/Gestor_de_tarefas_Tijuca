import { useState } from "react";
import { LabelService } from "../../../api/services/labelService";
import { useTagsTeam } from "../../../hooks/get_allLabels_in_team";
import { useCheckTaskLabel } from "../../../hooks/check_labeltask";

type TagCreatedProps = {
  fetchTagsTeam: () => void
  idSelected: string
  idTeam: string | undefined
  tagsteam: { id: string; Name: string; Color: string }[];
  onVoltar: () => void;
  onDefinir: () => void;
};

function TagCreated({tagsteam, onVoltar, idTeam, idSelected, onDefinir, fetchTagsTeam} : TagCreatedProps){
    const[error, setError] = useState<string>("")
    const[selectedTags, setSelectedTags] = useState<string[]>([])
    const {checkIfExist} = useCheckTaskLabel()
    async function AddTag(event: React.MouseEvent<HTMLParagraphElement>, tagId:string){
      event.preventDefault()
      console.log("TagId: ", tagId)
      const label = {
          idtask: idSelected,
          idlabel: tagId
        }
      const exists = await checkIfExist(label.idtask, label.idlabel)
      if(exists === null ){
        try {
          const add_tag = await LabelService.Add_New_Label(label)
          onDefinir()
          fetchTagsTeam()
          if(!add_tag){
            setError("Erro ao adicionar tag")
          }
        } catch (error) {
                console.log(error)
              }
      }else if (exists){
        await LabelService.Remove_LabelTask(label)
      }else{
        await LabelService.Activate_LabelTask(label)
      }
    }    
    return (
        <div className="bg-[#251F1F] p-8 rounded-lg text-white text-center">

         
          <h2 className="text-lg font-semibold mb-3">Tags do Time</h2>
           
            <div className="flex flex-wrap items-center justify-center gap-2 w-[270px] max-w-[270px] sm:max-w-[480px] sm:w-[480px]">
            {tagsteam.map((tag)=>{
              console.log("tag: ",tag.id)
              return(
                <p 
                key={tag.id} 
                style={{backgroundColor: tag.Color}} 
                className="
                rounded-[10px] p-1 shadow-xl shadow-black/40 cursor-pointer"
                onClick={(e)=> AddTag(e, tag.id)}
                >{tag.Name}</p>
              );
            })}
            
            </div>
            <button
              onClick={onVoltar}
              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-2 rounded mt-4"
            >
              Criar uma Tag
            </button>


        
      

        </div>
  );
}

export default TagCreated