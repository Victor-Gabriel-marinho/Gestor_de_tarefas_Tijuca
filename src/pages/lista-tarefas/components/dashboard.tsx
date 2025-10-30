import { Bar, Doughnut } from "react-chartjs-2";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useDashboardPages } from "../../../hooks/get_dashBoardpages";

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
}

function GraficoBarras({id_team}: graficoProps) {

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
  
  if (loading) return <div> carregando...</div>
  if (erro) return <div>{erro}</div>
  if (!metrics) return <div>Dados não encontrados</div>

  const statusLabel = metrics?.tarStatus?.map(item => item.name) || []
  const statusCount = metrics?.tarStatus?.map(item => item.count) || []

  const prioridadeLabel = metrics?.tarPriority?.map(item => item.name) || []
  const prioridadeCount = metrics?.tarPriority?.map(item => item.count) || []

  const usersLabel = metrics?.tarUsers?.map(item => item.name)  || []
  const usersCount = metrics?.tarUsers?.map(item => item.count) || []

  console.log("Status Labels:", statusLabel);
    console.log("Status Counts:", statusCount);
    console.log("Responsáveis da Página:", paginasPorUsuario);
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

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Tarefas por Status" },
    },
    scales: {
      y: { beginAtZero: true },
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
      legend: { display: true },
      title: { display: true, text: "Tarefas por Prioridade" },
    },
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
        borderWidth: 1,
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
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-900 min-h-screen">


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <Bar data={data} options={options} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md">
          <Doughnut data={prioridade} options={prioridadeoptions} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center overflow-x-auto">
          <Bar data={responsaveisdata} options={responsaveisop}/>
          <div className="">
            <button
              onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}// Volta uma página (mínimo = 1) 
              disabled={paginaAtual === 1}// Desativa se estiver na primeira página
              className={`bg-green-400 hover:bg-green-300 text-white p-1 rounded-full  ${paginaAtual === 1

                }`}
            >
              <FaArrowLeft color="black" />
            </button>
            <span className="p-1">Página {paginaAtual} de {totalPaginas}</span>

            <button
              onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))} // Avança uma página (máximo = totalPaginas)
              disabled={paginaAtual === totalPaginas}// Desativa se estiver na última página
              className={`bg-green-400 hover:bg-green-300 text-white p-1 rounded-full  ${paginaAtual === totalPaginas

                }`}
            >
              <FaArrowRight color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraficoBarras;
