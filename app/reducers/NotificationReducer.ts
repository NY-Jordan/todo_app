import { ActionInterface } from "@/domain/entities/actions.entities";
import { NotificationActions } from "../Actions/NotificationActions";

const initialState = {
    notifications : null,
    error : false,
}


const  NotificationReducer = (state = initialState, action : ActionInterface) => {
    switch (action.type) {
    case NotificationActions.GET_NOTIFICATIONS_SUCESS : 
        return {...state, notifications : action.payload.notifications}
    case NotificationActions.GET_NOTIFICATIONS_FAILED : 
        return {...state, error : true}
    default:
        return {...state};
    }
};

export default NotificationReducer;