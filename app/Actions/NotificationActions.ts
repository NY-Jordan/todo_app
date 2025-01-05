import { NotificationInterface } from "@/domain/entities/notifications.entities";

export const  NotificationActions = {
    GET_NOTIFICATIONS_SUCESS : "GET_NOTIFICATIONS_SUCESS" ,
    GET_NOTIFICATIONS_FAILED : "GET_NOTIFICATIONS_FAILED" ,
}


export const getNotificationsSucess = (notifications : NotificationInterface) => ({
    type : NotificationActions.GET_NOTIFICATIONS_SUCESS,
    payload : {notifications : notifications}
});

export const getNotificationsFailed = () => ({
    type : NotificationActions.GET_NOTIFICATIONS_SUCESS,
    payload : {error : true}
});