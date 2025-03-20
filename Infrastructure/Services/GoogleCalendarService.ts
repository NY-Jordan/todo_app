import { log } from "console";
import ApiClient from "../helpers/ApiClient";
import { getBearerAuthToken } from "../helpers/HelperUtils";
import { store } from "@/app/store/store";
import { fetchGoogleEventsCalendarFailure, fetchGoogleEventsCalendarSuccess } from "@/app/Actions/Calendar/GoogleCalendarActions";


export const fetchGoogleEvents = async () => {
    try {
        const reponse = await ApiClient().get(`/calendar/events/fetch`,{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data;
        store.dispatch(fetchGoogleEventsCalendarSuccess(data));
    } catch (e) {
        store.dispatch(fetchGoogleEventsCalendarFailure(e));
    }
}
