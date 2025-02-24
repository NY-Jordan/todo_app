import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";
import { TicketActions } from "../Actions/TicketsAction";
import { ITicket } from "@/domain/entities/ticket.entities";
import { TicketStatusEnum } from "@/domain/enum/TicketStatusEnum";

// État initial
const initialState = {
  create: { status: StatusStateEnum.idle, error: null },
  fetchTicketsInProgress: { status: StatusStateEnum.idle, error: null, data: { tickets: [] } },
  fetchTicketsDone: { status: StatusStateEnum.idle, error: null, data: { tickets: [] } },
  update: { status: StatusStateEnum.idle, error: null },
  delete: { status: StatusStateEnum.idle, error: null, ticketId : null },
  changeStatus: { status: StatusStateEnum.idle, error: null },
};

type ActionType = {
  type: string;
  payload: any;
};

// Reducer
const TicketsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    // CREATE
    case TicketActions.CREATE_TICKET_INIT:
      return { ...state, create: { status: StatusStateEnum.loading, error: null } };

    case TicketActions.CREATE_TICKET_SUCCESS:
      return {
        ...state,
        create: { status: StatusStateEnum.success, error: null },
        fetchTicketsInProgress: { ...state.fetchTicketsInProgress, data: { tickets: [action.payload.ticket, ...state.fetchTicketsInProgress.data.tickets] } },
      };

    case TicketActions.CREATE_TICKET_FAILURE:
      return { ...state, create: { status: StatusStateEnum.failure, error: action.payload } };

    case TicketActions.CREATE_TICKET_RESET:
      return { ...state, create: { status: StatusStateEnum.idle, error: null } };

    // FETCH
    case TicketActions.FETCH_TICKETS_INIT:
      if (action.payload.status === TicketStatusEnum.DONE) {
        return { ...state, 
          fetchTicketsDone: { ...state.fetchTicketsDone, status: StatusStateEnum.loading, error: null } 
        };
      }
      if (action.payload.status === TicketStatusEnum.IN_PROGRESS) {
        return { ...state, 
          fetchTicketsInProgress: { ...state.fetchTicketsInProgress, status: StatusStateEnum.loading, error: null } ,
        };
      }
      

    case TicketActions.FETCH_TICKETS_SUCCESS:
        if (action.payload.status === TicketStatusEnum.IN_PROGRESS) {
            return {
                ...state,
                fetchTicketsInProgress: { status: StatusStateEnum.success, error: null, data: { tickets: action.payload.tickets } },
              };
        } 
        if (action.payload.status === TicketStatusEnum.DONE) {
            return {
                ...state,
                fetchTicketsDone: { status: StatusStateEnum.success, error: null, data: { tickets: action.payload.tickets } },
              };
        } 
      

    case TicketActions.FETCH_TICKETS_FAILURE:
        if (action.payload.status === TicketStatusEnum.IN_PROGRESS) {
            return {
                ...state, 
                fetchTicketsInProgress: { ...state.fetchTicketsInProgress, status: StatusStateEnum.failure, error: action.payload.errors } 
            };
        } 
        if (action.payload.status === TicketStatusEnum.DONE) {
            return {
                ...state, 
                fetchTicketsDone: { ...state.fetchTicketsDone, status: StatusStateEnum.failure, error: action.payload.errors } 
            };
        } 

    case TicketActions.FETCH_TICKETS_RESET:
      return { ...state, fetch: { status: StatusStateEnum.idle, error: null, data: { tickets: [] } } };

    // UPDATE
    case TicketActions.UPDATE_TICKET_INIT:
      return { ...state, update: { status: StatusStateEnum.loading, error: null } };

    case TicketActions.UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        update: { status: StatusStateEnum.success, error: null },
        fetch: {
          ...state.fetchTicketsInProgress,
          data: {
            tickets: state.fetchTicketsInProgress.data.tickets.map((ticket: ITicket) =>
              ticket.id === action.payload.ticket.id ? action.payload.ticket : ticket
            ),
          },
        },
      };

    case TicketActions.UPDATE_TICKET_FAILURE:
      return { ...state, update: { status: StatusStateEnum.failure, error: action.payload } };

    case TicketActions.UPDATE_TICKET_RESET:
      return { ...state, update: { status: StatusStateEnum.idle, error: null } };

    // DELETE
    case TicketActions.DELETE_TICKET_INIT:
      return { ...state, delete: { status: StatusStateEnum.loading, error: null } };

    case TicketActions.DELETE_TICKET_SUCCESS:
      return {
        ...state,
        delete: { status: StatusStateEnum.success, error: null, ticketId : action.payload },
        fetchTicketsInProgress: { ...state.fetchTicketsInProgress,
               data: { 
                tickets: state.fetchTicketsInProgress.data.tickets.filter((ticket: ITicket) => ticket.id !== action.payload) 
            } 
        },
      };

    case TicketActions.DELETE_TICKET_FAILURE:
      return { ...state, delete: { status: StatusStateEnum.failure, error: action.payload .error, ticketId : action.payload.ticketId} };

    case TicketActions.DELETE_TICKET_RESET:
      return { ...state, delete: { status: StatusStateEnum.idle, error: null } };

    // CHANGE STATUS
    case TicketActions.CHANGE_TICKET_STATUS_INIT:
      return { ...state, changeStatus: { status: StatusStateEnum.loading, error: null } };

    case TicketActions.CHANGE_TICKET_STATUS_SUCCESS:
      const ticket = action.payload.ticket as ITicket;
      // if the new status is done
      if (ticket.status.name === TicketStatusEnum.DONE) {
        return {
          ...state,
          changeStatus: { status: StatusStateEnum.success, error: null },
          fetchTicketsInProgress: {
            ...state.fetchTicketsInProgress,
            data: {
              tickets: state.fetchTicketsInProgress.data.tickets.filter((ticket: ITicket) => ticket.id !== action.payload.ticket.id ),
            },
          },
          fetchTicketsDone : {
            ...state.fetchTicketsDone,
             data: { tickets: [ticket, ...state.fetchTicketsDone.data.tickets] } ,
           }
        };
      }
      // if the new status is in progress
      if (ticket.status.name === TicketStatusEnum.IN_PROGRESS) {
        return {
          ...state,
          changeStatus: { status: StatusStateEnum.success, error: null },
          fetchTicketsDone: {
            ...state.fetchTicketsDone,
            data: {
              tickets: state.fetchTicketsDone.data.tickets.filter((ticket: ITicket) => ticket.id !== action.payload.ticket.id ),
            },
          },
          fetchTicketsInProgress: {
            ...state.fetchTicketsInProgress,
             data: { tickets: [ticket, ...state.fetchTicketsInProgress.data.tickets]  },
           }
        };
      }
      

    case TicketActions.CHANGE_TICKET_STATUS_FAILURE:
      return { ...state, changeStatus: { status: StatusStateEnum.failure, error: action.payload } };

    case TicketActions.CHANGE_TICKET_STATUS_RESET:
      return { ...state, changeStatus: { status: StatusStateEnum.idle, error: null } };

    default:
      return state;
  }
};

export default TicketsReducer;
