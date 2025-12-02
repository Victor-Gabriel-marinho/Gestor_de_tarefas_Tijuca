import { useEffect, useState } from "react";
import { LabelService } from "../../../api/services/labelService";
import { useCheckTaskLabel } from "../../../hooks//Label_hooks/check_labeltask";
import { IoIosClose } from "react-icons/io";

type TagCreatedProps = {
  fetchTags: () => void;
  idSelected: string;
  idTeam: string | undefined;
  tagsteam: { id: string; Name: string; Color: string; isActive: boolean }[];
  onVoltar: () => void;
  onDefinir: () => void;
  onFechar: () => void;
};

function TagCreated({
  tagsteam,
  onVoltar,
  idSelected,
  onDefinir,
  fetchTags,
  onFechar,
}: TagCreatedProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const { checkIfExist } = useCheckTaskLabel();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    async function loadActiveTags() {
      if (!idSelected || !tagsteam.length) return;

      const results = await Promise.all(
        tagsteam.map(async (tag) => {
          const exists = await checkIfExist(idSelected, tag.id);
          return exists ? tag.id : null;
        })
      );

      setActiveTags(results.filter((id): id is string => id !== null));
    }

    loadActiveTags();
  }, [idSelected, tagsteam]);
  async function handleTagClick(
    event: React.MouseEvent<HTMLParagraphElement>,
    tagId: string
  ) {
    if (isDeleteMode) {
      await DeleteTag(tagId);
    } else {
      await AddTag(event, tagId);
    }
  }
  async function AddTag(
    event: React.MouseEvent<HTMLParagraphElement>,
    tagId: string
  ) {
    event.preventDefault();

    const label = {
      idtask: idSelected,
      idlabel: tagId,
    };

    const exists = await checkIfExist(label.idtask, label.idlabel);

    if (exists === null) {
      try {
        const add_tag = await LabelService.Add_New_Label(label);
        setActiveTags((prev) => [...prev, tagId]);
        if (!add_tag) {
          console.error("Erro ao adicionar tag");
        }
      } catch (error) {
        console.error(error);
      }
    } else if (exists) {
      await LabelService.Remove_LabelTask(label);
      setActiveTags((prev) => prev.filter((id) => id !== tagId));
    } else {
      await LabelService.Activate_LabelTask(label);
      setActiveTags((prev) => [...prev, tagId]);
    }
    onDefinir();
    fetchTags();
  }

  async function DeleteTag(tagId: string) {
    try {
      // Chama o backend para desativar a tag
      await LabelService.Desactivate_Label(tagId);

      // Atualiza estado local removendo a tag deletada
      setActiveTags((prev) => prev.filter((id) => id !== tagId));

      // Atualiza lista de tags do backend, se necessário
      onDefinir();
      fetchTags();
    } catch (error) {
      console.error("Erro ao deletar tag:", error);
    }
  }
  return (
    <div className="bg-[#251F1F] p-2 rounded-lg  text-white text-center sm:ml-6 sm:p-4">
      <div className=" flex flex-row justify-between p-2">
        <h2 className="text-[22px] font-semibold pt-1 ">Tags do Time</h2>
        <button className=" cursor-pointer hover:scale-110" onClick={onFechar}>
          <IoIosClose size={40} />
        </button>
      </div>
      <h3
        className={`text-[15px] font-semibold pb-4 ${
          isDeleteMode ? "text-red-700" : "text-gray-400"
        }`}
      >
        {isDeleteMode
          ? "Selecione uma tag para deletar"
          : "Selecione uma tag para adicionar"}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-2 w-[270px] max-w-[270px] sm:max-w-[300px] sm:w-[480px]">
        {tagsteam
          .filter((tag) => tag.isActive)
          .map((tag) => {
            const isActive = activeTags.includes(tag.id);
            return (
              <p
                key={tag.id}
                style={{ backgroundColor: tag.Color }}
                className={`rounded-[10px] p-1 shadow-xl shadow-black/40 cursor-pointer transition
                ${isActive ? "opacity-50 scale-105" : "opacity-100"}`}
                onClick={(e) => handleTagClick(e, tag.id)}
              >
                {tag.Name}
              </p>
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
          className="bg-red-800 hover:bg-red-900 text-white px-2 py-2 rounded mt-4"
          onClick={() => setIsDeleteMode((prev) => !prev)}
        >
          {isDeleteMode ? "Cancelar Delete" : "Delete Tag"}
        </button>
      </div>
    </div>
  );
}

export default TagCreated;
