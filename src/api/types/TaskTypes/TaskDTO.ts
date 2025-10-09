export interface Task {
  id: string;
  id_team: string;
  Name: string;
  content?: string;
  Priority: string;
  Status: string;
  StartDate?: Date;
  EndDate: Date;
}

export type CreateTaskDTO = Omit<Task, "id"| "StartDate">