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

type ModalProps = {
  task: Task;
  userrole?: string;
  idSelected: string;
  setcriar: () => void;
  onClose: () => void;
  refetchtask: (() => Promise<void>) | undefined;
};

function Modaltaf({
  task,
  onClose,
  setcriar,
  idSelected,
  refetchtask,
  userrole
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

  const [tag, Settag] = useState<boolean>(false);
  const [tagvalue, Settagvalue] = useState<string>("");

  const [edit, Setedit] = useState<boolean>(false);
  const [edittask, Setedittask] = useState<string>(task.Name);

  const [viewusers, Setviewusers] = useState<boolean>(false);

  const Delete_task = async (id: string) => {
    try {
      const response = await TaskService.DeleteTask(id);
      if (response) {
        console.log(response);
        if (refetchtask) {
          refetchtask();
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
      <div className="w-screen h-screen bg-black/50 flex items-center justify-center  fixed inset-0 backdrop-blur-[20px]">
        {viewusers && <Modal_taskUser id_task={task.id} />}
        {/*caixa do modal*/}
        <div className="bg-[#251F1F] max-w-[90vw] max-h-[90vh] h-[300px] w-[500px] overflow-auto rounded-[10px] text-white relative p-6 flex items-center justify-center flex-col shadow-2xl shadow-[#3b3232]">
          <div className="flex w-full h-full gap-2 flex-col">
            <div className="flex w-full gap-5 items-center">
              <button
                className=" cursor-pointer hover:scale-110 absolute top-3 right-3"
                onClick={onClose}
              >
                <IoIosClose size={40} />
              </button>
              <p className="max-w-[240px] text-2xl font-bold line-clamp-2">
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
              {userrole === "3" ? <div></div> : <div className="w-full mx-5 flex justify-around gap-3">
                <FaUserPlus
                  className="hover:scale-110 cursor-pointer"
                  onClick={() => Setviewusers(!viewusers)}
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
                  onClick={() => Settag(!tag)}
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
                    Delete_task(task.id);
                  }}
                />
              </div>}

              {/* Descrição e Data */}
              <div className="flex items-start justify-center flex-col gap-3 max-w-[400px]">
                <p className="text-lg">
                  <span className="font-semibold text-xl flex">Descrição: </span>
                  <span className="flex truncate max-w-[350px]">{task.Content}</span>
                </p>
                <p className="flex text-lg gap-2">
                  <span className="font-semibold text-xl">
                    Data de entrega: 
                  </span>
                  {task.EndDate.toString().split("T")[0].replaceAll("-", "/")}
                </p>
                <p className="flex text-lg gap-2">
                  <span className="font-semibold text-xl">
                    Prioridade:
                  </span>
                  {task.Priority}
                </p>
              </div>

              {tagvalue && (
                <div className="m-1 ">
                  <span className="text-white bg-blue-500 p-1 rounded-[5px]">
                    {tagvalue}
                  </span>
                </div>
              )}

              {edit && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={edittask}
                    onChange={(e) => Setedittask(e.target.value)}
                    className="bg-white text-black p-1 rounded outline-none w-50 left-10 truncate"
                  />
                  <button className="bg-[#4b3f3f]  px-2 rounded">Editar</button>
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

        {tag && (
          <Tag
              onDefinir={(tag) => {
              Settagvalue(tag);
              Settag(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default Modaltaf;
