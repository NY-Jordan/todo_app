import { createDailyTaskSuccess, deleteDailyTaskFailure, deleteDailyTaskSuccess, editDailyTaskFailure, editDailyTaskSuccess, fetchDailyTasksFailure, fetchDailyTasksSuccess, updateDailyTaskPhaseFailure, updateDailyTaskPhaseSuccess } from "@/app/Actions/DailyTaskActions";
import { store } from "@/app/store/store";
import { INewDailyTaskPayload } from "@/domain/entities/task.entities";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";
import { createDailyTaskFailure } from '../../../app/Actions/DailyTaskActions';

export const FetchAllDailyTasks = async (search? : string, date? : string) => {
    try {
        const reponse = await ApiClient().get(`/project/tasks/daily?search=${search}&date=${date}`,{
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
        const reponse = await ApiClient().post("/project/tasks/daily/create",NewDailyTaskPayload,{
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

export const updateDailyTasks = async (NewDailyTaskPayload : INewDailyTaskPayload, taskId : number ) => {
    try {
        const reponse = await ApiClient().post(`/project/tasks/daily/update/${taskId}`,NewDailyTaskPayload,{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse?.data;
        
        store.dispatch(editDailyTaskSuccess(data?.task, taskId));
    } catch (e) {
        store.dispatch(editDailyTaskFailure(e, taskId))
    }
}

export const updateDailyTaskPhase = async (phaseId : number, taskId : number ) => {
    try {
        const reponse = await ApiClient().post(`/project/tasks/daily/update/phase/${taskId}`,{phaseId : phaseId},{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse?.data;
        
        store.dispatch(updateDailyTaskPhaseSuccess(taskId, data?.task));
    } catch (e) {
        store.dispatch(updateDailyTaskPhaseFailure(e, taskId))
    }
}



export const deleteDailyTask = async  (taskId : number) => {
    try {
        const reponse = await ApiClient().delete(`/project/task/delete/${taskId}`,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        store.dispatch(deleteDailyTaskSuccess(taskId));
    } catch (e) {
        store.dispatch(deleteDailyTaskFailure(e))
    }
}
