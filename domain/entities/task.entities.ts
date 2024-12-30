

export interface INewDailyTaskPayload {
    breifing: string;
    title : string
}

export interface ITaskType {
    name: TaskTypeEnum;
    created_at: string;
    updated_at: string;
  }
  
 export interface ITask {
    id: number;
    taskgroup_id: number | null;
    user_id: number;
    title: string;
    breifing: string;
    details: string | null;
    reminder: string | null;
    phase: number;
    type: ITaskType;
    status: string;
    created_at: string;
    updated_at: string;
  }