import { createDailyTaskSuccess, fetchDailyTasksFailure, fetchDailyTasksSuccess } from "@/app/Actions/DailyTaskActions";
import { store } from "@/app/store/store";
import { INewDailyTaskPayload } from "@/domain/entities/task.entities";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";
import { createDailyTaskFailure } from '../../../app/Actions/DailyTaskActions';

export const FetchAllDailyTasks = async () => {
    try {
        const reponse = await ApiClient().get("/project/task/daily",{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.data;
        store.dispatch(fetchDailyTasksSuccess(data));
    } catch (e) {
        store.dispatch(fetchDailyTasksFailure(e))
    }
}

export const createNewDailyTasks = async (NewDailyTaskPayload : INewDailyTaskPayload ) => {
    try {
        const reponse = await ApiClient().post("/project/task/daily/create",NewDailyTaskPayload,{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse?.data;
        store.dispatch(createDailyTaskSuccess(data?.task));
    } catch (e) {
        store.dispatch(createDailyTaskFailure(e))
    }
}