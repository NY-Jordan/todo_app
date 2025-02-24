import { changeTicketStatusFailure, changeTicketStatusSuccess, createTicketFailure, createTicketSuccess, deleteTicketFailure, deleteTicketSuccess, fetchTicketFailure, fetchTicketSuccess, updateTicketSuccess } from "@/app/Actions/TicketsAction";
import { store } from "@/app/store/store";
import { CreateTicketTypeInterface } from "@/domain/entities/ticket.entities";
import { TicketStatusEnum } from "@/domain/enum/TicketStatusEnum";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";
import { updateTicketFailure } from '../../../app/Actions/TicketsAction';
import { TicketTypeEnum } from "@/domain/enum/TicketTypeEnum";
import { TicketType } from "@/domain/enum/TicketEnum";

export const fetchTaskTickets = async (taskId : number, status : TicketStatusEnum, type? : TicketType|undefined) => {
    try {
        const reponse = await ApiClient().get(`project/tasks/ticket/fetch/${taskId}?status=${status}&type=${type}`,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.tickets;
        store.dispatch(fetchTicketSuccess(data, status))
    } catch (e) {
        store.dispatch(fetchTicketFailure(e, status))
    }
}

export const createTaskTicket = async (options : CreateTicketTypeInterface) => {
    try {
        const reponse = await ApiClient().post(`project/tasks/ticket/create`,options,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.ticket;
        store.dispatch(createTicketSuccess(data))
    } catch (e) {
        store.dispatch(createTicketFailure(e))
    }
}


export const deleteTaskTicket = async (ticketId : number) => {
    try {
        const reponse = await ApiClient().delete(`project/tasks/ticket/delete/${ticketId}`,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        store.dispatch(deleteTicketSuccess(ticketId))
    } catch (e) {
        store.dispatch(deleteTicketFailure(e, ticketId))
    }
}


export const changeTaskTicketStatus = async (ticketId : number, ticketStatus : TicketStatusEnum) => {
    try {
        const reponse = await ApiClient().post(`project/tasks/ticket/status/update/${ticketId}`,{
            'status' : ticketStatus
        },{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.ticket;

        store.dispatch(changeTicketStatusSuccess(data))
    } catch (e) {
        store.dispatch(changeTicketStatusFailure(e))
    }
}