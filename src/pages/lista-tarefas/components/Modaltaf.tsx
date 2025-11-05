{
  /*ícones usados no modal*/
}
import { IoIosClose } from "react-icons/io";
import { GoPaperclip } from "react-icons/go";
import { IoMdPricetag } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useFont } from "../../../components/font";
import { useState, useRef, useEffect } from "react";
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

type ModalProps = {
  task: Task;
  userrole?: string;
  idSelected: string;
  setcriar: () => void;
  onClose: () => void;
  refetchtask: (() => Promise<void>) | undefined;
  refetchStatus?: (()=> Promise<void>) | undefined
};

function Modaltaf({
  task,
  onClose,
  setcriar,
  idSelected,
  refetchtask,
  userrole,
  refetchStatus
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
  const selectfile = () => {
    if (inputfile.current) {
      inputfile.current.click();
    }
  };
  const { id } = useParams();
  const { tags, fetchTags } = useTags(idSelected);
  const { tagsTeam, fetchTagsTeam } = useTagsTeam(id ? id : "");

  const [tag, Settag] = useState<string>("");
  const [tagvalue, Settagvalue] = useState<string>("");

  const [edittask, Setedittask] = useState<string>(task.Name);

  const [trocarModal, setTrocarModal] = useState<"first" | "second" | "users" | null>("first");
  const [viewusers, Setviewusers] = useState<boolean>(false);

  const isMobile = window.innerWidth <= 768;

  const { taskuser, refetchTaskuser } = Get_Taskuser(idSelected);
  const { refetchUsersWithNotInTask } = get_UsersWithNotInTask(
    idSelected,
    id ?? ""
  );
  const[confirmModal,setconfimModal]= useState<boolean>(false)
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
      console.log("erro ao fazer requisição", error);
    }
  };

  useEffect(() => {
    Setedittask(idSelected);
  }, [task]);

  return (
    <>
      <div className="w-screen h-screen bg-black/50 flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-center fixed inset-0 backdrop-blur-[20px]">
        {viewusers && (isMobile ? trocarModal === "users" : trocarModal === "first") &&(
          <Modal_taskUser
            id_task={task.id}
            refetch_taskuser={refetchTaskuser}
            closeModal={() => {
              Setviewusers(false)
              if(isMobile) setTrocarModal("first")
            }}
            
          />
        )}
        {/*caixa do modal*/}
       {trocarModal === "first" &&( 
        <div className="bg-[#251F1F] max-w-[90vw] max-h-[90vh] h-[250px] w-[500px] overflow-auto rounded-[10px] text-white relative p-3 flex items-center justify-center flex-col shadow-2xl shadow-[#3b3232] sm:h-[300px] sm:p-4">
          <div className="flex w-full h-full gap-2 flex-col">
            <div className="flex w-full gap-5 items-center">
              <button
                className=" cursor-pointer hover:scale-110 absolute top-3 right-3"
                onClick={onClose}
              >
                <IoIosClose size={40} />
              </button>
              <p className="max-w-[200px] text-2xl font-bold line-clamp-2">
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

                {/* bara de botões*/}
                {userrole === "3" ? (
                  <div></div>
                ) : (
                  <div className="w-full mx-5 flex justify-around gap-3">
                    <FaUserPlus
                      className="hover:scale-110 cursor-pointer"
                      onClick={() => {
                        Setviewusers(!viewusers)
                        if(isMobile)setTrocarModal("users")
                      }}
                      size={30}
                    />
                    {/*botão responsável por ativar o input type file*/}
                    <button onClick={selectfile}>
                      <GoPaperclip
                        className="hover:scale-110 cursor-pointer"
                        size={30}
                      />
                    </button>
                    <IoMdPricetag
                      className="hover:scale-110  cursor-pointer"
                      size={30}
                      onClick={() => {
                        Settag("criar");
                        if (isMobile) setTrocarModal("second");
                      }}
                    />
                    <MdEdit
                      className="cursor-pointer hover:scale-110"
                      size={30}
                      onClick={setcriar}
                    />
                    <FaTrashCan
                      className="hover:scale-110 cursor-pointer"
                      color="red"
                      size={30}
                      onClick={() => {
                        setconfimModal(true);
                      }}
                    />
                  </div>
                )}

                <Tags
                  tagclassName="rounded-[10px] p-1 shadow-xl shadow-black/40 cursor-pointer"
                  idSelected={idSelected}
                  fetchTagsTask={fetchTags}
                  tags={tags}
                  onDefinir={() => {
                    Settag("criar");
                    fetchTags();
                  }}
                />
                {taskuser &&(
                  <div>
                    <p className="text-xl font-semibold">
                      Usuários responsáveis
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
                <div className="flex items-start justify-center flex-col gap-3 w-full">
                  <p className="text-sm">
                    <span className="font-semibold text-xl ">Descrição: </span>
                    <span className=" max-w-[350px]">{task.Content}</span>
                  </p>
                  <p className="flex text-lg gap-2">
                    <span className="font-semibold text-xl">
                      Data de entrega:
                    </span>
                    {task.EndDate.toString().split("T")[0].replaceAll("-", "/")}
                  </p>
                  <p className="flex text-lg gap-2">
                    <span className="font-semibold text-xl">Prioridade:</span>
                    {task.Priority}
                  </p>
                </div>

                {confirmModal && 
                (<Confirm_delete 
                  SetconfirmModal={setconfimModal} 
                  SetconfirmAction={Delete_task}
                />
                )}

                {/* Usuários relacionados a task */}
                {taskuser && (
                  <div>
                    <p className="text-xl font-semibold">
                      Usuários responsáveis
                    </p>
                    <TaskUser
                      taskusers={taskuser}
                      id_task={idSelected}
                      refetchs={() => {
                        refetchTaskuser();
                        refetchUsersWithNotInTask();
                      }}
                    />
                  </div>
                )}

                {tagvalue && (
                  <div className="m-1 ">
                    <span className="text-white bg-blue-500 p-1 rounded-[5px]">
                      {tagvalue}
                    </span>
                  </div>
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
            fetchTagsTeam={fetchTags}
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
