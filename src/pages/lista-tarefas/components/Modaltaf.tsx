{
  /*ícones usados no modal*/
}
import { IoIosClose } from "react-icons/io";
import { useFont } from "../../../components/font";
import { useState, useRef, useEffect} from "react";
import Tag from "./tags";
import type { Task } from "../../../api/types/TaskTypes/TaskDTO";
import { TaskService } from "../../../api/services/TaskService";
import { Modal_taskUser } from "./AddTaskUser";
import Tags from "./tagstaf";
import { useTags } from "../../../hooks/Label_hooks/get_alllabels_in_tasks";
import TagCreated from "./tagcreated";
import { useTagsTeam } from "../../../hooks/Label_hooks/get_allLabels_in_team";
import { useParams } from "react-router-dom";
import { Get_Taskuser } from "../../../hooks/Tasks_hooks/Get_TaskUser";
import { get_UsersWithNotInTask } from "../../../hooks/User_hooks/get_UsersWithNotInTask";
import { TaskUser } from "./TaskUser";
import Confirm_delete from "../../../components/commons/confirmDelete";
import { Buttons_Bar } from "./ButtonBar";
import { DescriptionTask } from "./DescriptionTask";

type ModalProps = {
  task: Task;
  userrole?: string;
  idSelected: string;
  setcriar: () => void;
  onClose: () => void;
  refetchtask: (() => Promise<void>) | undefined;
  refetchStatus?: (() => Promise<void>) | undefined
  texto: string
  isOpen: boolean
};

function Modaltaf({
  task,
  onClose,
  setcriar,
  idSelected,
  refetchtask,
  userrole,
  refetchStatus,
  isOpen,
}: ModalProps) {
  useFont(" 'Poppins', 'SansSerif' ");

  {
    /*upload de arquivos*/
  }
  const [file, Setfile] = useState<File | null>(null); //arquivo que foi selecionado
  const [filename, Setfilename] = useState<string | null>(null); //nome do arquivo
  {
    /*mostra o preview de .img na tela*/
  }
  const [preview, Setpreview] = useState<string | null>(null);
  const [zoomimg, Setzoomimg] = useState<string | null>(null);
  const inputfile = useRef<HTMLInputElement | null>(null);

  {
    /*abre o seletor de arquivos ao clicar no botão com o clip*/
  }

  const { id } = useParams();
  const { tags, fetchTags } = useTags(idSelected);
  const { tagsTeam, fetchTagsTeam } = useTagsTeam(id ? id : "");

  const [tag, Settag] = useState<string>("");

  const [trocarModal, setTrocarModal] = useState<"first" | "second" | "users" | null>("first");
  const [viewusers, Setviewusers] = useState<boolean>(false);

  const isMobile = window.innerWidth <= 768;

  const { taskuser, refetchTaskuser } = Get_Taskuser(idSelected);
  const { refetchUsersWithNotInTask } = get_UsersWithNotInTask(
    idSelected,
    id ?? ""
  );
  const [confirmModal, setconfimModal] = useState<boolean>(false)
  const Delete_task = async () => {
    try {

      const response = await TaskService.DeleteTask(idSelected ?? "");
      if (response) {
        if (refetchtask) {
          refetchtask();
          refetchStatus?.()
        }
        onClose();
      }
    } catch (error) {
      console.error("erro ao fazer requisição", error);
    }
  };

useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }

  return () => {
    document.body.style.overflow = ""
  }
}, [isOpen])

if (!isOpen) return null

  return (
    <>
      <div className="w-screen h-screen bg-black/50 flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-center fixed inset-0 backdrop-blur-[20px]">
        {viewusers && (isMobile ? trocarModal === "users" : trocarModal === "first") && (
          <Modal_taskUser
            id_task={task.id}
            refetch_taskuser={refetchTaskuser}
            closeModal={() => {
              Setviewusers(false)
              if (isMobile) setTrocarModal("first")
            }}

          />
        )}
        {/*caixa do modal*/}
        {trocarModal === "first" && (
          <div className="bg-[#251F1F] max-w-[90vw] max-h-[90vh] w-[500px] overflow-auto rounded-[10px] text-white relative p-3 flex items-center justify-center flex-col shadow-2xl shadow-[#3b3232] sm:w-[600px] sm:p-4">
            <div className="flex w-full h-full gap-2 flex-col">
              <div className="flex w-full gap-5 items-center">
                <button
                  className=" cursor-pointer hover:scale-110 absolute top-3 right-3"
                  onClick={onClose}
                >
                  <IoIosClose size={40} />
                </button>
                  <p className="break-words whitespace-normal  max-w-[300px] truncate text-2xl font-bold line-clamp-2 ">
                    {task.Name}
                  </p>
              </div>

              <div className="w-full h-full flex items-center flex-col gap-6 p-5 justify-start">
                {/*input escondido que é aberto pelo botão com clip*/}
                <input
                  type="file"
                  name=""
                  id=""
                  className="absolute z-50 mt-50 outline-none hidden"
                  ref={inputfile} //referência ao input type file
                  accept="image/*,.pdf,.doc,.docx" //tipos de arquivos que são aceitos
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const f = e.target.files[0];
                      Setfile(f);
                      Setfilename(f.name);

                      //se for imagem, cria o preview
                      if (f.type.startsWith("image/")) {
                        Setpreview(URL.createObjectURL(f));
                      } else {
                        Setpreview(null);
                      }
                    }
                  }}
                />

                {/* barra de botões*/}
                {userrole === "3" ? (
                  <div></div>
                ) : (
                  <Buttons_Bar 
                  setcriar={setcriar}
                  Settag={Settag}
                  isMobile={isMobile}
                  setTrocarModal={setTrocarModal}
                  viewusers={viewusers}
                  Setviewusers={Setviewusers}
                  inputfile={inputfile}
                  setconfimModal={setconfimModal}
                  />
                )}

                {tags.length>0 &&
                <div className="text-center flex flex-col gap-2">
                  <p className="text-lg font-semibold">
                    Tags associadas:
                  </p>
                  <Tags
                    tagclassName="rounded-[10px] p-1 shadow-xl shadow-black/40 cursor-pointer trasition-all hover:opacity-80 hover:scale-105"
                    idSelected={idSelected}
                    fetchTagsTask={fetchTags}
                    tags={tags}
                    onDefinir={() => {
                      Settag("criar");
                      fetchTags();
                    }}
                  />
                </div>}

                {taskuser.length > 0 &&(
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">
                      Usuários responsáveis:
                    </p>
                    <TaskUser
                      taskusers={taskuser}
                      id_task={idSelected}
                      refetchs={() => {
                        refetchTaskuser();
                        refetchUsersWithNotInTask();
                      }} />
                  </div>
                )}
                
                {/* Descrição e Data */}
                  <DescriptionTask 
                  task={task}/>

                {confirmModal &&
                  (<Confirm_delete 
                    funcao="Excluir"
                    texto="Deseja excluir essa tarefa?"
                    SetconfirmModal={setconfimModal}
                    SetconfirmAction={Delete_task}
                  />
                  )}

                {/*imprimi o nome do arquivo na tela*/}
                {filename && (
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-sm truncate">{filename}</p>
                    {preview && (
                      <img
                        src={preview}
                        alt=""
                        className="w-20 cursor-pointer"
                        onClick={() => Setzoomimg(preview)}
                      />
                    )}
                  </div>
                )}

                {zoomimg && (
                  <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => Setzoomimg(null)}
                  >
                    <img
                      src={zoomimg}
                      alt=""
                      className="max-w-[90%] max-h-[90%] rounded-lg"
                    />
                  </div>
                )}

                {/*mostra o nome do arquivo pdf como link*/}
                {file?.type === "application/pdf" && (
                  <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    type="application/pdf"
                    className="text-blue-400 underline"
                  >
                    {filename}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        {tag === "criar" &&
          (isMobile ? trocarModal === "second" : trocarModal === "first") && (
            <Tag
              idSelected={idSelected}
              onFechar={() => {
                Settag("");
                if (isMobile) setTrocarModal("first");
              }}
              onDefinir={() => {
                Settag("criar");
                fetchTags();
                if (isMobile) setTrocarModal("first");
              }}
              onVerCriadas={() => Settag("lista")}
            />
          )}
        {tag === "lista" && (
          <TagCreated
            fetchTags={fetchTags}
            idSelected={idSelected}
            idTeam={id}
            tagsteam={tagsTeam}
            onFechar={() => {
              Settag("");
              if (isMobile) setTrocarModal("first");
            }}
            onVoltar={() => Settag("criar")}
            onDefinir={() => {
              fetchTagsTeam();
              Settag("lista");
            }}
          />
        )}
      </div>
    </>
  );
}

export default Modaltaf;
