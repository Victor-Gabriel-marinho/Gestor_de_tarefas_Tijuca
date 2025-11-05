import { useEffect } from "react";


type tagProps = {
    fetchTagsTask: () => void
    idSelected: string;
    tags: { id: string; Name: string; Color: string }[];
    onDefinir?:() => void
    tagclassName?: string;
    containerClassName? : string
}

function Tags({ tags, tagclassName, containerClassName}: tagProps){  
    return (
        <div className={!containerClassName ? "rounded-2xl flex flex-wrap justify-center gap-2 w-[270px] max-w-[270px] sm:max-w-[480px] sm:w-[480px] " : containerClassName}>
            {tags.map((tag)=>(
                <p key={tag.id} style={{background: tag.Color}} className={tagclassName}>{tag.Name}</p>
            ))}
        </div>
    );
}
export default Tags;