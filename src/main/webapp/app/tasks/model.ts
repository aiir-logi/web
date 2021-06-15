export interface Task {
  id?: string;
  name?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  subtasks?: Array<SubTask>;
}


export interface SubTask {
  id?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}
