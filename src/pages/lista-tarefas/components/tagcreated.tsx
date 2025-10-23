
type TagCreatedProps = {
  idSelected: string;
  tags: { id: string; Name: string; Color: string }[];
  onVoltar: () => void;
  onDefinir: () => void;
};

function TagCreated({tags, onVoltar} : TagCreatedProps){
    
    return (
        <div className="bg-[#251F1F] p-8 rounded-lg text-white text-center">
          <h2 className="text-lg font-semibold mb-3">Tags Criadas</h2>
           
            <button
              onClick={onVoltar}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mt-4"
            >
              Voltar
            </button>

        
      

        </div>
  );
}

export default TagCreated