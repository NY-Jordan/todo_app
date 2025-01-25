export interface ITaskGroup {
    id: number;
    name: string;
    status: string; 
    backlog: number;
    started: number;
    in_review: number;
    done: number;
    project_id: number;
    created_at: string; 
    updated_at: string; 
  }