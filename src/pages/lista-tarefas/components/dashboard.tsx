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
import type { FiltroDashboard } from "../../../api/types/DashboardTypes/filtro";
import { ChartGeneric } from "./BarGrafics";
import type { dashboardMetricsDTO } from "../../../api/types/DashboardTypes/DashboardMetric";

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
  setFiltro: (newfiltro: FiltroDashboard) => void;
};

function GraficoBarras({ id_team }: graficoProps) {
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

  const optionsPrazo = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: true, text: "Tarefas por prazo" },
    },
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

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: true, text: "Tarefas por Status" },
    },
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

  const prioridadeoptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom" as const },
      title: { display: true, text: "Tarefas por Prioridade" },
    },
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

      <div className="flex flex-col sm:flex-row flex-wrap justify-start items-start p-2 gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <ChartGeneric type="pie" data={prazo} options={optionsPrazo} />

          <ChartGeneric type="doughnut" data={data} options={options} />

          <ChartGeneric type="doughnut" options={prioridadeoptions} data={prioridade}/>

          <ChartGeneric
            data={responsaveisdata}
            options={responsaveisop}
          ></ChartGeneric>
        </div>
      </div>
    </div>
  );
}

export default GraficoBarras;
