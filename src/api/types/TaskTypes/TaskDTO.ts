export interface Task {
  id: string;
  id_team: string;
  Name: string;
  Content?: string;
  Priority: string;
  id_status: string;
  StartDate?: Date;
  EndDate: Date;
}

export type CreateTaskDTO = Omit<Task, "id"| "StartDate">