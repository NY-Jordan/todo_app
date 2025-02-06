import { TaskPhasesEnum, TaskTypeEnum } from "../enum/TaskEnum";
import { IUser, IUserAssigned } from "./user.entities";


export interface INewDailyTaskPayload {
    breifing: string;
    title : string
}

export interface ITaskType {
    name: TaskTypeEnum;
    created_at: string;
    updated_at: string;
  }
  
  export interface ITaskPhase {
    id: number;
    name: TaskPhasesEnum;
    created_at: string;
    updated_at: string;
  }

  export interface IPagination {
    current_page: number;  
    total_pages: number;   
    total_items: number;   
    per_page: number;      
  }
  
 export interface ITask {
    id: number;
    taskgroup_id: number | null;
    user_id: number;
    assigned_user : IUserAssigned[];
    title: string;
    breifing: string;
    details: string | null;
    reminder: string | null;
    phase: ITaskPhase;
    type: ITaskType;
    status: string;
    created_at: string;
    updated_at: string;
  }

  export type CreateTaskType = {
    task_group_id: number;  
    title: string; 
    breifing: string;
    details: string; 
    reminder?: Date; 
  };

  export interface ITaskBoard {
    [phase: string]: ITask[];
  }

  
  
  export interface ITasksByDate {
    [date: string]: ITask[];
  }