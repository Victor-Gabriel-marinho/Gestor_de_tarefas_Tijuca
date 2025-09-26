{/*ícones usados no modal*/ }
import { IoIosClose } from "react-icons/io"
import { FaClock } from "react-icons/fa"
import { GoPaperclip } from "react-icons/go"
import { IoMdPricetag } from "react-icons/io"
import { FaTrashCan } from "react-icons/fa6"
import { GoPaperAirplane } from "react-icons/go"
import { MdEdit } from "react-icons/md";
import { useFont } from "./font"
import { useState, useRef, useEffect} from "react"
import Tag from "./tags" 

{/*recebe uma tarefa e uma função para fechar o modal*/ }
function Modaltaf({ task, onClose, onDelete, onUpdateTask }: { task: string, onClose: () => void; onDelete: () => void, onUpdateTask: (novoNome: string) => void }) {

    useFont(" 'Poppins', 'SansSerif' ");

    {/*controle do input type date*/ }

    {/*upload de arquivos*/ }
    const [file, Setfile] = useState<File | null>(null) //arquivo que foi selecionado
    const [filename, Setfilename] = useState<string | null>(null) //nome do arquivo
    {/*mostra o preview de .img na tela*/ }
    const [preview, Setpreview] = useState<string | null>(null)
    const [zoomimg, Setzoomimg] = useState<string | null>(null)
    const inputfile = useRef<HTMLInputElement | null>(null) //referencia para o input type file

    {/*abre o seletor de arquivos ao clicar no botão com o clip*/ }
    const selectfile = () => {
        if (inputfile.current) {
            inputfile.current.click()
        }
    }

    const [tag, Settag] = useState<boolean>(false)
    const [tagvalue, Settagvalue] = useState<string>("")

    const [edit, Setedit] = useState<boolean>(false)
    const [edittask, Setedittask] = useState<string>(task)
    useEffect(() =>{
        Setedittask(task);
    }, [task])


    return (
        <>

            <div className="w-screen h-screen bg-black/50 flex items-center justify-center  fixed top-0 left-0 right-0 backdrop-blur-[20px]">
                {/*caixa do modal*/}
                <div className="bg-[#251F1F] max-w-[90vw] max-h-[90vh] overflow-auto rounded-[10px] shadow-2xl text-white relative p-10 flex flex-col">
                    <div className="flex justify-end">
                        {/*botão para fechar o modal*/}
                        <button className="absolute top-4 right-4 cursor-pointer " onClick={onClose}>
                            <IoIosClose size={40} />
                        </button>
                    </div>
                    <div className="flex gap-2 flex-col">

                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="" className="accent-[#22C55E]" />
                            <p className="truncate max-w-60">{edit ? edittask : task}</p>
                            <MdEdit className="m-1" onClick={() => Setedit(!edit)}/>
                        </div>

                        <div className="space-y-2">


                            {/*input escondido que é aberto pelo botão com clip*/}
                            <input type="file" name="" id="" className="absolute z-50 mt-50 outline-none hidden"
                                ref={inputfile} //referência ao input type file
                                accept="image/*,.pdf,.doc,.docx" //tipos de arquivos que são aceitos 
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const f = e.target.files[0]
                                        Setfile(f)
                                        Setfilename(f.name)

                                        //se for imagem, cria o preview
                                        if (f.type.startsWith("image/")) {
                                            Setpreview(URL.createObjectURL(f))
                                        } else {
                                            Setpreview(null)
                                        }
                                    }
                                }}
                            />

                            {/* bara de botões*/}
                            <div className=" top-[70px] flex gap-3 p-1">
                                <FaClock className="hover:scale-110" size={30} />
                                {/*botão responsável por ativar o input type file*/}
                                <button onClick={selectfile}>
                                    <GoPaperclip className="hover:scale-110" size={30} />
                                </button>
                                <IoMdPricetag className="hover:scale-110" size={30} onClick={() => Settag(!tag)} />
                                <FaTrashCan className="hover:scale-110" color="red" size={30} onClick={() => {
                                    onDelete();
                                    onClose();
                                }
                                } />

                            </div>

                            {tagvalue && (
                                <div className="m-1 ">
                                    <span className="text-white bg-blue-500 p-1 rounded-[5px]">
                                        {tagvalue}
                                    </span>
                                </div>
                            )}


                            <div className="flex items-center gap-2 mt-5">
                                <form action="" className="flex gap-2">
                                    <input type="text" placeholder="Adicionar comentário" className=" w-50 left-10 bg-white outline-none placeholder-gray-400 text-black rounded-[5px]  ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 truncate" />
                                    <button className=" w-[30px] h-[30px] p-1 left-[245px] bg-[#4b3f3f] hover:bg-[#574848] rounded-[10px] flex items-center justify-center"><GoPaperAirplane /></button>
                                </form>

                            </div>

                            {edit &&(
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={edittask} 
                                    onChange={(e) => Setedittask(e.target.value)}
                                    className="bg-white text-black p-1 rounded outline-none w-50 left-10 truncate"
                                />
                                <button className="bg-[#4b3f3f]  px-2 rounded" onClick={() => 
                                {
                                    if (edittask.trim() === "") {
                                        Setedittask(task)
                                    } else {
                                        onUpdateTask(edittask)
                                    } 
                                    Setedit(false)
                                    onClose()
                                   
                                }}
                                        
                                >Editar</button>
                            </div>
                            )}
                            {/*imprimi o nome do arquivo na tela*/}
                            {filename && (
                                <div className="flex flex-col items-start gap-2">
                                    <p className="text-sm truncate">{filename}</p>
                                    {preview && (
                                        <img src={preview} alt="" className="w-20 cursor-pointer"
                                            onClick={() => Setzoomimg(preview)}
                                        />
                                    )}
                                </div>
                            )}

                            {zoomimg && (
                                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                                    onClick={() => Setzoomimg(null)}
                                >
                                    <img src={zoomimg} alt="" className="max-w-[90%] max-h-[90%] rounded-lg" />
                                </div>
                            )}

                            {/*mostra o nome do arquivo pdf como link*/}
                            {file?.type === "application/pdf" && (
                                <a href={URL.createObjectURL(file)}
                                    target="_blank"
                                    rel="noopener noreferrer" //por segurança
                                    type="application/pdf"
                                    className="text-blue-400 underline"
                                >{filename}</a>
                            )}

                        </div>

                    </div>

                </div>

                {tag && (
                    <Tag
                        onDefinir={(tag) => {
                            Settagvalue(tag)
                            Settag(false)
                        }}
                    />
                )}

            </div>

        </>
    )
}

export default Modaltaf