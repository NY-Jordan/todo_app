import { store } from "@/app/store/store";
import ApiClient from "../helpers/ApiClient";
import { getBearerAuthToken } from "../helpers/HelperUtils";
import { getNotificationsFailed, getNotificationsSucess } from "@/app/Actions/NotificationActions";

export async function getAllNotification ()  {
    try {
        const response  = await  ApiClient().get('/notifications',  
            {
                 headers : {
                     Authorization : await getBearerAuthToken()
                 }
        });
        const res = response.data;
       
        if (response.status === 200) {
             const data = res.data
            
            store.dispatch(getNotificationsSucess(data));
        }   
    } catch (error) {
        store.dispatch(getNotificationsFailed());
    }
};