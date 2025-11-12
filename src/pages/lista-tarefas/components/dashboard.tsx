import { Doughnut } from "react-chartjs-2";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useDashboardPages } from "../../../hooks/Dashboard_hooks/get_dashBoardpages";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Loading_anim } from "../../../components/commons/loading";
import { useEffect, useState } from "react";
import type { FiltroDashboard } from "../../../api/types/DashboardTypes/filtro";
import { ChartGeneric } from "./BarGrafics";


// Registrar módulos obrigatórios
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type graficoProps = {
  id_team: string;
  prazo: string;
  Filtro: FiltroDashboard;
  setFiltro: (
    value: React.SetStateAction<{
      status?: string;
      prazo?: string;
      prioridade?: string;
    }>
  ) => void;
};

function GraficoBarras({ id_team, setFiltro, Filtro }: graficoProps) {
  const {
    metrics,
    paginasPorUsuario,
    paginaAtual,
    setPaginaAtual,
    totalPaginas,
    loading,
    erro,
  } = useDashboardPages(id_team);

  /*preciso dos status das tarefas, prioridade ,  e também nome dos responsáveis */
  //integração

  const [clearfilter, setClearfilter] = useState(false);
  const DefaultFilter: FiltroDashboard = { prioridade: "todas", prazo: "todas", status: "todas" };

  useEffect(() => {
    setFiltro(Filtro);
  }, [Filtro]);

  if (loading) return <Loading_anim />;
  if (erro) return <div>{erro}</div>;
  if (!metrics) return <div>Dados não encontrados</div>;

  const prazoLabel = metrics?.tarByTerm?.map((item) => item.name) || [];
  const prazoCount = metrics?.tarByTerm?.map((item) => item.count) || [];

  const statusLabel = metrics?.tarStatus?.map((item) => item.name) || [];
  const statusCount = metrics?.tarStatus?.map((item) => item.count) || [];

  const prioridadeLabel = metrics?.tarPriority?.map((item) => item.name) || [];
  const prioridadeCount = metrics?.tarPriority?.map((item) => item.count) || [];

  // Prazo
  const prazo = {
    labels: prazoLabel,
    datasets: [
      {
        label: "Tarefas",
        data: prazoCount,
        backgroundColor: ["#22c55e", "#facc15", "#ef4444", "#F5930F"],
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const termClick = (_event: any, elements: any[]) => {
    if (!elements.length) return;
    const index = elements[0].index;
    const prazoclicado = prazoLabel[index];
    setFiltro({ ...Filtro, prazo: prazoclicado });
    setClearfilter(true);
  };

  const optionsPrazo = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: true, text: "Tarefas por prazo" },
    },
    onClick: termClick,
  };

  //status
  const data = {
    labels: statusLabel,
    datasets: [
      {
        label: "Tarefas",
        data: statusCount, // Corrigido: o número de valores precisa bater com o número de labels
        backgroundColor: [
          "#22c55e",
          "#facc15",
          "#3b82f6",
          "#DB5B9D",
          "#ef4444",
          "#F5930F",
        ], // verde, amarelo, vermelho, azul, roxo, laranja
      },
    ],
  };

  const statusClick = (_event: any, elements: any[]) => {
    if (!elements.length) return;
    const index = elements[0].index;
    const statusClicada = statusLabel[index];
    setFiltro({ ...Filtro, status: statusClicada });
    setClearfilter(true);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: true, text: "Tarefas por Status" },
    },
    onClick: statusClick,
  };

  //prioridade
  const prioridade = {
    labels: prioridadeLabel,
    datasets: [
      {
        label: "Prioridade",
        data: prioridadeCount,
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"], // verde, amarelo, vermelho
      },
    ],
  };

  const prioridadeClick = (_event: any, elements: any[]) => {
    if (!elements.length) return;
    const index = elements[0].index;
    const prioridadeClicada = prioridadeLabel[index];
    setClearfilter(true);
    console.log(prioridadeClicada);
    
    setFiltro({ ...Filtro, prioridade: prioridadeClicada });
  };

  const prioridadeoptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom" as const },
      title: { display: true, text: "Tarefas por Prioridade" },
    },
    onClick: prioridadeClick,
  };

  //responsaveis
  const pagLabel = paginasPorUsuario.map((item) => item.name) || [];
  const pagCount = paginasPorUsuario.map((item) => item.count) || [];
  //Dados que alimentam o gráfico de barras
  const responsaveisdata = {
    labels: pagLabel, // Quantidade de tarefas de cada usuário
    datasets: [
      {
        label: "Tarefas atribuídas",
        data: pagCount,
        backgroundColor: "#3b82f6aa",
        borderColor: "#3b82f6",
        barThickness: 30,
      },
    ],
  };

  const responsaveisop = {
    plugins: {
      title: {
        display: true,
        text: `Responsáveis — Página ${paginaAtual}`,
      },
      legend: { display: false },
    },
    scales: { y: { beginAtZero: true } },
  };

  // === RENDER ===
  return (
    <div className="flex flex-col min-h-1/2 w-full items-center gap-6 p-6 bg-gray-900">
      <h2 className="font-bold text-3xl text-white">Dashboards 📊</h2>
      <p className="text-white text-xl font-semibold">
        Clique nos gráficos para filtrar as tarefas acima
      </p>

      <h3 className="text-white font-bold text-2xl">Filtros Ativos:</h3>
      <p className="text-white font-semibold">
        Filtro por prazo: {Filtro.prazo}
      </p>
      <p className="text-white font-semibold">
        Filtro por Status: {Filtro.status}
      </p>
      <p className="text-white font-semibold">
        Filtro por Prioridade: {Filtro.prioridade}
      </p>

      <div className="flex flex-col sm:flex-row justify-start items-start p-2  gap-5">
        {clearfilter && (
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white rounded-[10px] hover:bg-green-300 p-2"
              onClick={() => {
                setClearfilter(false);
                setFiltro(DefaultFilter);
                setFiltro(DefaultFilter);
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          <ChartGeneric type="pie" data={prazo} options={optionsPrazo} />

          <ChartGeneric type="doughnut" data={data} options={options} />

          <div className="flex items-center justify-center bg-white p-4 rounded-2xl shadow-xl shadow-[#797272]">
            <Doughnut
              data={prioridade}
              options={prioridadeoptions}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <ChartGeneric data={responsaveisdata} options={responsaveisop}>
            <div className="">
              <button
                onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))} // Volta uma página (mínimo = 1)
                disabled={paginaAtual === 1} // Desativa se estiver na primeira página
                className={`bg-green-400 hover:bg-green-300 text-white p-1 rounded-full  ${
                  paginaAtual === 1
                }`}
              >
                <FaArrowLeft color="black" />
              </button>
              <span className="p-1">
                Página {paginaAtual} de {totalPaginas}
              </span>

              <button
                onClick={() =>
                  setPaginaAtual((p) => Math.min(p + 1, totalPaginas))
                } // Avança uma página (máximo = totalPaginas)
                disabled={paginaAtual === totalPaginas} // Desativa se estiver na última página
                className={`bg-green-400 hover:bg-green-300 text-white p-1 rounded-full  ${
                  paginaAtual === totalPaginas
                }`}
              >
                <FaArrowRight color="black" />
              </button>
            </div>
          </ChartGeneric>
        </div>
      </div>
    </div>
  );
}

export default GraficoBarras;
