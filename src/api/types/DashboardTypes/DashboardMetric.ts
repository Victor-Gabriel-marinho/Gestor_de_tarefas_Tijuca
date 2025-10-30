import type {MetricItem} from "./MetricItem"

export interface dashboardMetricsDTO {
    tarStatus: MetricItem[]
    tarPriority: MetricItem[]
    tarUsers: MetricItem[]
}