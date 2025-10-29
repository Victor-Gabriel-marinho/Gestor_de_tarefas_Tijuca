import type {MetricItem} from "./MetricItem"

export interface dashboardMetricsDTO {
    tasksByStatus: MetricItem[]
    tasksByPriority: MetricItem[]
    taskByUser: MetricItem[]
}