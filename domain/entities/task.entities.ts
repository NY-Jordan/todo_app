

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
  
 export interface ITask {
    id: number;
    taskgroup_id: number | null;
    user_id: number;
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