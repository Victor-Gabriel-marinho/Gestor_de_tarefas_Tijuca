import api from '../api'
import type { dashboardMetricsDTO } from '../types/DashboardTypes/DashboardMetric'

export const dashboardService = {
    async getStatus(id_team: string): Promise<dashboardMetricsDTO> {
        let url = `lista/${id_team}`

        if (!id_team) {
          console.error("ID do time não fornecido para o dashboard.");
        }
        
        const {data} = await api.get<dashboardMetricsDTO>(url)
        return data
    }
}