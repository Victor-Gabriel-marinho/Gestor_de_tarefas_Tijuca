import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// registrar os módulos
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GraficoBarras() {
  const data = {
    labels: ["Pendente", "Em progresso", "Concluído"],
    datasets: [
      {
        label: "Tarefas",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 6, 
        
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Gráfico de Barras - Exemplo",
      },
    },
  };

  return (
    <div className="w-full h-[400px] bg-[#1F2937] p-4  shadow">
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraficoBarras;
