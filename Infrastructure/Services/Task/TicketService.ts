import { createTicketFailure, createTicketSuccess, fetchTicketFailure, fetchTicketSuccess } from "@/app/Actions/TicketsAction";
import { store } from "@/app/store/store";
import { CreateTicketTypeInterface } from "@/domain/entities/ticket.entities";
import { TicketStatusEnum } from "@/domain/enum/TicketStatusEnum";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";

export const fetchTaskTickets = async (taskId : number, status : TicketStatusEnum) => {
    try {
        const reponse = await ApiClient().get(`project/tasks/ticket/fetch/${taskId}?status=${status}`,{
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
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        store.dispatch(createTicketSuccess(data))
    } catch (e) {
        store.dispatch(createTicketFailure(e))
    }
}