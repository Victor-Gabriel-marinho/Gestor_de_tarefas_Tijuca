// src/hooks/useDashboardPages.ts
import { useEffect, useState } from "react";
import type { dashboardMetricsDTO } from "../api/types/DashboardTypes/DashboardMetric";
import type { MetricItem } from "../api/types/DashboardTypes/MetricItem";
import { dashboardService } from "../api/services/dashboardService";

export function useDashboardPages() {
  const [metrics, setMetrics] = useState<dashboardMetricsDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const [paginasPorUsuario, setPaginasPorUsuario] = useState<MetricItem[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const N = 10;

  // Busca os dados do dashboard ao montar o hook
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await dashboardService.getStatus();
        setMetrics(data);
      } catch (err) {
        console.error("Erro ao buscar métricas", err);
        setErro("Não foi possível encontrar as métricas");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Atualiza a página atual dos usuários
  useEffect(() => {
    if (!metrics?.taskByUser) return;
    const start = (paginaAtual - 1) * N;
    const end = start + N;
    setPaginasPorUsuario(metrics.taskByUser.slice(start, end));
  }, [paginaAtual, metrics]);

  const totalPaginas = Math.max(
    1,
    Math.ceil((metrics?.taskByUser?.length || 0) / N)
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
