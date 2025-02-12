import { ITicket } from "@/domain/entities/ticket.entities";
import { TicketStatusEnum } from "@/domain/enum/TicketStatusEnum";

// Action Types
export const TicketActions = {
    CREATE_TICKET_INIT: 'CREATE_TICKET_INIT',
    CREATE_TICKET_SUCCESS: 'CREATE_TICKET_SUCCESS',
    CREATE_TICKET_FAILURE: 'CREATE_TICKET_FAILURE',
    CREATE_TICKET_RESET: 'CREATE_TICKET_RESET',

    UPDATE_TICKET_INIT: 'UPDATE_TICKET_INIT',
    UPDATE_TICKET_SUCCESS: 'UPDATE_TICKET_SUCCESS',
    UPDATE_TICKET_FAILURE: 'UPDATE_TICKET_FAILURE',
    UPDATE_TICKET_RESET: 'UPDATE_TICKET_RESET',

    CHANGE_TICKET_STATUS_INIT: 'CHANGE_TICKET_STATUS_INIT',
    CHANGE_TICKET_STATUS_SUCCESS: 'CHANGE_TICKET_STATUS_SUCCESS',
    CHANGE_TICKET_STATUS_FAILURE: 'CHANGE_TICKET_STATUS_FAILURE',
    CHANGE_TICKET_STATUS_RESET: 'CHANGE_TICKET_STATUS_RESET',

    DELETE_TICKET_INIT: 'DELETE_TICKET_INIT',
    DELETE_TICKET_SUCCESS: 'DELETE_TICKET_SUCCESS',
    DELETE_TICKET_FAILURE: 'DELETE_TICKET_FAILURE',
    DELETE_TICKET_RESET: 'DELETE_TICKET_RESET',

    FETCH_TICKETS_INIT: 'FETCH_TICKETS_INIT',
    FETCH_TICKETS_SUCCESS: 'FETCH_TICKETS_SUCCESS',
    FETCH_TICKETS_FAILURE: 'FETCH_TICKETS_FAILURE',
    FETCH_TICKETS_RESET: 'FETCH_TICKETS_RESET',
};

// Action Creators
export const createTicketInit = () => ({
    type: TicketActions.CREATE_TICKET_INIT,
});

export const createTicketSuccess = (ticket: ITicket) => ({
    type: TicketActions.CREATE_TICKET_SUCCESS,
    payload: { ticket },
});

export const createTicketFailure = (error: any) => ({
    type: TicketActions.CREATE_TICKET_FAILURE,
    payload: error,
});

export const createTicketReset = () => ({
    type: TicketActions.CREATE_TICKET_RESET,
});

export const updateTicketInit = () => ({
    type: TicketActions.UPDATE_TICKET_INIT,
});

export const updateTicketSuccess = (ticket: ITicket) => ({
    type: TicketActions.UPDATE_TICKET_SUCCESS,
    payload: { ticket },
});

export const updateTicketFailure = (error: any) => ({
    type: TicketActions.UPDATE_TICKET_FAILURE,
    payload: error,
});

export const updateTicketReset = () => ({
    type: TicketActions.UPDATE_TICKET_RESET,
});

export const changeTicketStatusInit = () => ({
    type: TicketActions.CHANGE_TICKET_STATUS_INIT,
});

export const changeTicketStatusSuccess = (ticket: ITicket) => ({
    type: TicketActions.CHANGE_TICKET_STATUS_SUCCESS,
    payload: { ticket },
});

export const changeTicketStatusFailure = (error: any) => ({
    type: TicketActions.CHANGE_TICKET_STATUS_FAILURE,
    payload: error,
});

export const changeTicketStatusReset = () => ({
    type: TicketActions.CHANGE_TICKET_STATUS_RESET,
});

export const deleteTicketInit = () => ({
    type: TicketActions.DELETE_TICKET_INIT,
});

export const deleteTicketSuccess = (ticketId: number) => ({
    type: TicketActions.DELETE_TICKET_SUCCESS,
    payload: ticketId,
});

export const deleteTicketFailure = (error: any) => ({
    type: TicketActions.DELETE_TICKET_FAILURE,
    payload: error,
});

export const deleteTicketReset = () => ({
    type: TicketActions.DELETE_TICKET_RESET,
});

export const fetchTicketInit = () => ({
    type: TicketActions.FETCH_TICKETS_INIT,
});

export const fetchTicketSuccess = (tickets: ITicket[], status : TicketStatusEnum) => ({
    type: TicketActions.FETCH_TICKETS_SUCCESS,
    payload: { tickets, status },
});

export const fetchTicketFailure = (error: any, status : TicketStatusEnum) => ({
    type: TicketActions.FETCH_TICKETS_FAILURE,
    payload: {error, status},
});

export const fetchTicketReset = () => ({
    type: TicketActions.FETCH_TICKETS_RESET,
});
