import { ITask } from "./task.entities"

export interface INote   {
    id : number,
    title : string,
    description : string,
    is_draft : boolean,
    color : string,
    tasks? : ITask[]
}

