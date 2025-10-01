export interface Task {
    id: string;
    id_team: string;
    Name: string;
    content?: string;
    Status: string;
    StartDate?: Date;
    endDate: Date;
}

export type CreateTaskDTO = Omit<Task, "id "| "StartDate">