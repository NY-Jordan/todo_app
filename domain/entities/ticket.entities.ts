export interface CreateTicketTypeInterface {
    title : string,
    description : string,
    task_id : number,
    ticket_type_id : number,
}


export interface ITicketType {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
export  interface ITicketStatus {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
export  interface ITicket {
    id : number,
    title: string;
    description: string;
    type: ITicketType;
    status: ITicketStatus;
    created_at: string;
    updated_at: string;
  }