import { IInvitation } from "./project.entities"

export interface  NotificationInterface  {
    created_at : string
    id: number,
    notifiable_contentt_id :  string|number
    status :  number
    type : string,
    updated_at : string,
    user_id : number
} 

export  interface NotificationInvitationInterface {
    type: string,
    user: number,
    content: IInvitation
}