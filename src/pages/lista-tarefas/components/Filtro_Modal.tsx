import { useEffect, useState } from "react";
import type { FiltroDashboard } from "../../../api/types/DashboardTypes/filtro";

type Filtro_ModalProps = {
  setFiltro: React.Dispatch<React.SetStateAction<FiltroDashboard>>;
  Filtro: FiltroDashboard;
};

export const Filtro_Modal = ({ setFiltro, Filtro }: Filtro_ModalProps) => {
  const [values, setvalues] = useState<FiltroDashboard>({
    prazo: "",
    prioridade: "",
    status: "",
  });

  const SetStatus = (Status: string) => {
    setFiltro({ ...Filtro, status: Status });
    setvalues({ ...values, status: Status });
    if (Status === "todas") setvalues({ ...values, status: "" });
  };

  const SetData = (prazo: string) => {
    setFiltro({ ...Filtro, prazo: prazo });
    setvalues({ ...values, prazo: prazo });
    if (prazo === "todas") setvalues({ ...values, prazo: "" });
  };

  const SetPrioridade = (Prioridade: string) => {
    setFiltro({ ...Filtro, prioridade: Prioridade });
    setvalues({ ...values, prioridade: Prioridade });
    if (Prioridade === "todas") setvalues({ ...values, prioridade: "" });
  };

  useEffect(() => {}, [Filtro]);

  return (
    <div className="bg-[#251F1F] absolute top-16 h-[20h] flex flex-col items-center text-white p-3 rounded-[10px] cursor-pointer">
      <p className="font-semibold">Selecione o que você deseja filtrar</p>
      <form
        action=""
        className="w-full flex flex-col items-center justify-center p-1 gap-3"
      >
        <select
          name="Status"
          className="w-3/4 p-1 rounded-[10px] text-black cursor-pointer bg-white hover:scale-105 transition-all"
          value={values.status}
          onChange={(e) => SetStatus(e.target.value)}
        >
          <option value="" disabled selected>
            Status
          </option>
          <option value="Pendente">Pendente</option>
          <option value="Progresso">Progresso</option>
          <option value="Concluido">Concluido</option>
          <option value="Cancelada">Cancelada</option>
          <option value="Atrasada">Atrasada</option>
          <option value="Revisão">Revisão</option>
          <option value="todas">Todos</option>
        </select>

        <select
          name="Status"
          className="w-3/4 p-1 rounded-[10px] text-black cursor-pointer bg-white hover:scale-105 transition-all"
          value={values.status}
          onChange={(e) => SetData(e.target.value)}
        >
          <option value="" disabled selected>
            Data
          </option>
          <option value="Mês">Este mês</option>
          <option value="Semana">Esta semana</option>
          <option value="Dia">Hoje</option>
          <option value="Atrasadas">Atrasadas</option>
          <option value="todas">Todos</option>
        </select>

        <select
          name="Prioridade"
          id=""
          className="w-3/4 p-1 rounded-[10px] text-black cursor-pointer bg-white hover:scale-105 transition-all"
          value={values.prioridade}
          onChange={(e) => SetPrioridade(e.target.value)}
        >
          <option value="" disabled selected>
            Prioridade
          </option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="alta">Alta</option>
          <option value="todas">Todos</option>
        </select>
      </form>
    </div>
  );
};
