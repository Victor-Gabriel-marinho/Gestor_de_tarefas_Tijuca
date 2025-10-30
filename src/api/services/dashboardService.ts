import api from '../api'
import type { dashboardMetricsDTO } from '../types/DashboardTypes/DashboardMetric'

export const dashboardService = {
    async getStatus(id_team: string): Promise<dashboardMetricsDTO> {
        let url = "lista"

        if (id_team) {
            url = `${url}/${id_team}`
        }
        const {data} = await api.get<dashboardMetricsDTO>(url)
        return data
    }
}