
import { useEffect, useState } from "react";
import type { dashboardMetricsDTO } from "../../api/types/DashboardTypes/DashboardMetric";
import type { MetricItem } from "../../api/types/DashboardTypes/MetricItem";
import { dashboardService } from "../../api/services/dashboardService";

export function useDashboardPages(id_team: string) {
  const [metrics, setMetrics] = useState<dashboardMetricsDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [paginasPorUsuario, setPaginasPorUsuario] = useState<MetricItem[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const N = 5;

  // Busca os dados do dashboard ao montar o hook
  useEffect(() => {
  const fetchMetrics = async () => {
    setLoading(true)
    try {
      const data = await dashboardService.getStatus(id_team);
      setMetrics(data);
      console.log(data.tarPriority)
    } catch (err) {
      setErro("Não foi possível encontrar as métricas");
    } finally {
      setLoading(false);
    }
  };
  fetchMetrics()
  
}, [id_team]);

  // Atualiza a página atual dos usuários
  useEffect(() => {
    if (!metrics?.tarUsers) return;
    const start = (paginaAtual - 1) * N;
    const end = start + N;
    setPaginasPorUsuario(metrics.tarUsers.slice(start, end));
  }, [paginaAtual, metrics]);

  const totalPaginas = Math.max(
    1,
    Math.ceil((metrics?.tarUsers?.length || 0) / N)
  );

  return {
    metrics,
    paginasPorUsuario,
    paginaAtual,
    setPaginaAtual,
    totalPaginas,
    loading,
    erro,
  };
}