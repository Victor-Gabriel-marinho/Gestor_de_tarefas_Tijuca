import { Bar, Doughnut} from "react-chartjs-2";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
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

function GraficoBarras() {
  //status
  const data = {
    labels: ["Pendente", "Em progresso", "Concluído"],
    datasets: [
      {
        label: "Tarefas",
        data: [12, 19, 5], // Corrigido: o número de valores precisa bater com o número de labels
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
      title: { display: true, text: "Tarefas por Status"},
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  //prioridade
  const prioridade = {
    labels: ["Baixa", "Média", "Alta"],
    datasets: [
      {
        label: "Prioridade",
        data: [20, 25, 30],
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
   const users = Array.from({ length: 45 }, (_, i) => ({
    nome: `Usuário ${i + 1}`,
    tarefas: Math.floor(Math.random() * 50),
  }));

  const [paginaatual, setPaginaatual] = useState(1) //estado da página atual começa em 1
  
  const N = 10; // usuários por página

  // calcula o índice inicial e final da página atual
  const inicio = (paginaatual - 1) * N
  const final = inicio + N
  // pega os usuários da página atual 
  const pagina = users.slice(inicio, final)

  //Dados que alimentam o gráfico de barras
   const responsaveisdata = {
    labels: pagina.map((u) => u.nome), // Quantidade de tarefas de cada usuário
    datasets: [
      {
        label: "Tarefas atribuídas",
        data: pagina.map((u) => u.tarefas),
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
        text: `Responsáveis — Página ${paginaatual}`,
      },
      legend: { display: false },
    },
    scales: { y: { beginAtZero: true } },
  };

  //Calcula o total de páginas
 const totalpag = Math.ceil(users.length / N)


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

        <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center">
          <Bar data={responsaveisdata} options={responsaveisop} className="overflow-x-auto"/>
          <div className="">
            <button
            onClick={() => setPaginaatual((p) => Math.max(p-1, 1))}// Volta uma página (mínimo = 1) 
            disabled={paginaatual === 1}// Desativa se estiver na primeira página
            className={`bg-green-400 hover:bg-green-300 text-white p-1 rounded-full  ${
               paginaatual === 1
            
            }`}
            >
              <FaArrowLeft color="black"/>
            </button>
            <span className="p-1">Página {paginaatual} de {totalpag}</span>
            <button
               onClick={() => setPaginaatual((p) => Math.min(p + 1, totalpag))} // Avança uma página (máximo = totalPaginas)
            disabled={paginaatual === totalpag}// Desativa se estiver na última página
            className={`bg-green-400 hover:bg-green-300 text-white p-1 rounded-full  ${
              paginaatual === totalpag
            
            }`}
            >
              <FaArrowRight color="black"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraficoBarras;
