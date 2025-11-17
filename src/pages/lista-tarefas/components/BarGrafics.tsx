import { Bar, Pie, Doughnut } from "react-chartjs-2";

type graficProps = {
  type?: "bar" | "pie" | "doughnut";
  data: any;
  options: any;
};

export function ChartGeneric({
  type = "bar",
  data,
  options,
}: graficProps) {
  const ChartComponent =
    type === "pie" ? Pie : type === "doughnut" ? Doughnut : Bar;

  return (
    <div
      className={`flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-md `}
    >
      <ChartComponent data={data} options={options} className="w-full h-full" />
    </div>
  );
}
