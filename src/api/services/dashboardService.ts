import api from '../api'
import type { dashboardMetricsDTO } from '../types/DashboardTypes/DashboardMetric'

export const dashboardService = {
    async getStatus(): Promise<dashboardMetricsDTO> {
        const {data} = await api.get<dashboardMetricsDTO>("dashboard/getDados")
        return data
    }
}