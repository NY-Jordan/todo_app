import { store } from "@/app/store/store";
import ApiClient from "../helpers/ApiClient";
import { getBearerAuthToken } from "../helpers/HelperUtils";
import { fetchUsersCollaboratorsFailure, fetchUsersCollaboratorsSuccess, fetchUsersStatsFailure, fetchUsersStatsSuccess } from "@/app/Actions/AppActions";

export const fetchStats = async () => {
    
    try {
        const reponse = await ApiClient().get(`/stats`,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data;
        store.dispatch(fetchUsersStatsSuccess(data));
        
    } catch (e) {
        store.dispatch(fetchUsersStatsFailure(e));

    }
}

export const fetUserschCollaborators = async () => {
    try {
        const reponse = await ApiClient().get(`/collaborators`,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data;
       store.dispatch(fetchUsersCollaboratorsSuccess(data));
    } catch (e) {
        store.dispatch(fetchUsersCollaboratorsFailure(e));

    }
}