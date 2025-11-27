import { useState } from "react";
import type { FiltroDashboard } from "../../../api/types/DashboardTypes/filtro";

type Filtro_ModalProps = {
  setFiltro: (newFiltro: FiltroDashboard) => void;
};

export const Filtro_Modal = ({ setFiltro }: Filtro_ModalProps) => {

  const [values, setvalues] = useState<FiltroDashboard>({
    prioridade: "todas",
    prazo: "todas",
    status: "todas",
  });
  const [changefilter, Setchangefilter] = useState<boolean>(false)

  const setfilter = (
    filtro: string,
    key: "prazo" | "prioridade" | "status"
  ) => {
    
    setvalues((prevValue) => ({
      ...prevValue,
      [key]: filtro === "" ? "todas" : filtro,
    }))
    
    setFiltro({
      ...values, 
      [key]: filtro === "" ? 'todas' : filtro 
    })
    
    Setchangefilter(true)
  };

  const clearfilters = () => {
    const clearedfilter: FiltroDashboard = {
      prazo: "todas",
      prioridade: "todas",
      status: "todas"
    }
    setvalues(clearedfilter)
    setFiltro(clearedfilter)
    Setchangefilter(false)
  }

  return (
    <div className="bg-[#251F1F] absolute top-16 h-[20h] flex flex-col items-center text-white p-3 rounded-[10px] cursor-pointer">
      <p className="font-semibold">Selecione os filtros</p>
      <form
        action=""
        className="w-full flex flex-col items-center justify-center p-1 gap-3"
      >
        <select
          name="Status"
          className="w-3/4 p-1 rounded-[10px] text-black cursor-pointer bg-white hover:scale-105 transition-all"
          value={values.status === "todas" ? "" : values.status}
          onChange={(e) => setfilter(e.target.value, "status")}
        >
          <option value="" disabled>
            Status
          </option>
          <option value="Pendente">Pendente</option>
          <option value="Progresso">Progresso</option>
          <option value="Concluido">Concluido</option>
          <option value="Cancelada">Cancelada</option>
          <option value="Atrasada">Atrasada</option>
          <option value="Revisão">Revisão</option>
        </select>

        <select
          name="Prazo"
          className="w-3/4 p-1 rounded-[10px] text-black cursor-pointer bg-white hover:scale-105 transition-all"
          value={values.prazo === "todas" ? '' : values.prazo}
          onChange={(e) => setfilter(e.target.value, "prazo")}
        >
          <option value="" disabled>
            Data
          </option>
          <option value="Mês">Este mês</option>
          <option value="Semana">Esta semana</option>
          <option value="Dia">Hoje</option>
          <option value="Atrasadas">Atrasadas</option>
        </select>

        <select
          name="Prioridade"
          id=""
          className="w-3/4 p-1 rounded-[10px] text-black cursor-pointer bg-white hover:scale-105 transition-all"
          value={values.prioridade === "todas" ? "" : values.prioridade}
          onChange={(e) => setfilter(e.target.value, "prioridade")}
        >
          <option value="" disabled>
            Prioridade
          </option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="alta">Alta</option>
        </select>
      </form>
      { changefilter &&
      <div className="bg-red-500 p-1 rounded-[5px] mt-2"
      onClick={clearfilters}
      >
      Limpar filtros
      </div>
      }
    </div>
  );
};
