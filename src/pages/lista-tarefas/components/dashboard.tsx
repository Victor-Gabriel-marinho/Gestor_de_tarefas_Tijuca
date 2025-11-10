import { Bar, Doughnut } from "react-chartjs-2";
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
import {useState } from "react";
import type { FiltroDashboard } from "../../../api/types/DashboardTypes/filtro";

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
  id_team: string
  prazo: string
  onFiltroChange: (filtro: FiltroDashboard) => void;
}

function GraficoBarras({id_team, onFiltroChange}: graficoProps) {

    const {
        metrics,
        paginasPorUsuario,
        paginaAtual,
        setPaginaAtual,
        totalPaginas,
        loading,
        erro,
      } = useDashboardPages(id_team)    

  /*preciso dos status das tarefas, prioridade ,  e também nome dos responsáveis */
  //integração
  
    const [Filtros, setFiltros] = useState<FiltroDashboard>({
    prioridade: "todas",
    prazo: "todas",
    status: "todas"
  })
const [prioridadeSelecionada, setPrioridadeSelecionada] = useState<string | null>(null)
const [statusSelecionada, setStattusSelecionada] = useState<string | null>(null)
const [prazoSelecionado, setPrazoSelecionado] = useState<string | null>(null)

  if (loading) return <Loading_anim/>
  if (erro) return <div>{erro}</div>
  if (!metrics) return <div>Dados não encontrados</div>

  const prazoLabel = metrics?.tarByTerm?.map(item => item.name) || []
  const prazoCount = metrics?.tarByTerm?.map(item => item.count) || []

  const statusLabel = metrics?.tarStatus?.map(item => item.name) || []
  const statusCount = metrics?.tarStatus?.map(item => item.count) || []

  const prioridadeLabel = metrics?.tarPriority?.map(item => item.name) || []
  const prioridadeCount = metrics?.tarPriority?.map(item => item.count) || []


  
// Prazo
const prazo = {
  labels: prazoLabel,
  datasets: [
    {
      label: "Tarefas",
      data: prazoCount,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderRadius: 6,
      barThickness: 30,
    }
  ]
};

 const termClick = (_event: any, elements: any[]) => {
    if (!elements.length) return
    const index = elements[0].index
    const prazoclicado = prazoLabel[index]
    setFiltros({...Filtros, prazo: prazoclicado})
    onFiltroChange(Filtros)
    console.log("prazo clicado:", prazoclicado)
  }

const optionsPrazo = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Tarefas por prazo" },
    },
    scales: {
      y: { beginAtZero: true },
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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 6,
        barThickness: 45,
      },
    ],
  };


  const statusClick = (_event: any, elements: any[]) => {
    if (!elements.length) return
    const index = elements[0].index
    const statusClicada = statusLabel[index]
    setFiltros({...Filtros, status: statusClicada})
    onFiltroChange(Filtros)
    console.log("status clicada:", statusClicada)
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Tarefas por Status" },
    },
    scales: {
      y: { beginAtZero: true },
    },
      onClick: statusClick
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
    const prioridadeClicada = prioridadeLabel[index]
    setFiltros({...Filtros, prioridade: prioridadeClicada});
    onFiltroChange(Filtros);
     console.log("Prioridade clicada:", prioridadeClicada);
  }
  
  const prioridadeoptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Tarefas por Prioridade" },
    },
     onClick: prioridadeClick
  };

  //responsaveis
  const pagLabel = paginasPorUsuario.map(item => item.name) || [];
  const pagCount = paginasPorUsuario.map(item => item.count) || [];
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
      <h2 className="font-semibold text-3xl text-white">Dashboards 📊</h2>
      <p className="text-white text-xl font-semibold">
        Clique nos gráficos para filtrar as tarefas acima
      </p>

    <div className="flex flex-col items-center gap-1 p-3 bg-gray-900">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <Bar data={prazo} options={optionsPrazo} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md">
          <Bar data={data} options={options} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-[#797272]">
          <Doughnut data={prioridade} options={prioridadeoptions} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-[#797272] flex flex-col items-center justify-center overflow-x-auto">
          <Bar data={responsaveisdata} options={responsaveisop} />
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
              onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))} // Avança uma página (máximo = totalPaginas)
              disabled={paginaAtual === totalPaginas}// Desativa se estiver na última página
              className={`bg-green-400 hover:bg-green-300 text-white p-1 rounded-full  ${paginaAtual === totalPaginas}`}
            >
              <FaArrowRight color="black" />
            </button>
          </div>
        </div>

        {(prioridadeSelecionada || prazoSelecionado || statusSelecionada) && (
  <div className="flex justify-center">
    <button
      className="bg-green-500 text-white rounded hover:bg-green-300 h-10 p-1"
      onClick={() => {
        setPrioridadeSelecionada(null)
        setPrazoSelecionado(null)
        setStattusSelecionada(null)
        onFiltroChange({prioridade: "todas", prazo: "todas", status: "todas"})
      }}
    >
      Limpar filtros
    </button>
  </div>
 )}
      </div>
    </div>

    </div>
  );
}

export default GraficoBarras;
