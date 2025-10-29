
type tagProps = {
    idSelected: string;
    tags: { id: string; Name: string; Color: string }[];
    onDefinir:() => void
}

function Tags({tags}: tagProps){

    console.log(tags, "tags");
    
  
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 w-[270px] max-w-[270px] sm:max-w-[480px] sm:w-[480px]">
            {tags.map((tag)=>(
                <p key={tag.id} style={{background: tag.Color}} className="
                rounded-[10px] p-1 shadow-xl shadow-black/40
                ">{tag.Name}</p>
            ))}
        </div>
    );
}
export default Tags;