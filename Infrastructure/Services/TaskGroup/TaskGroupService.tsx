import { createTaskGroupFailure, createTaskGroupSuccess, deleteTaskGroupFailure, deleteTaskGroupSuccess, fetchTaskGroupsFailure, fetchTaskGroupsSuccess, updateTaskGroupSuccess } from "@/app/Actions/TaskGroupActions";
import { store } from "@/app/store/store";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";
import { updateTaskGroupFailure } from '../../../app/Actions/TaskGroupActions';

export const fecthTaskGroupsProject = async (projectId : number, currentPage : number|undefined) => {
    try {
        const reponse = await ApiClient().get(`project/taskgroup/${projectId}?page=${currentPage}`,{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.task_groups;
        const pagination = reponse.data.pagination;
        store.dispatch(fetchTaskGroupsSuccess(data, pagination));
    } catch (e) {
        store.dispatch(fetchTaskGroupsFailure(e))
    }
}


export const createTaskGroup = async (option  : { name : string, project_id : number } ) => {
    try {
        const reponse = await ApiClient().post(`project/taskgroup/create`,option,{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
       
        store.dispatch(createTaskGroupSuccess());
    } catch (e) {
        store.dispatch(createTaskGroupFailure(e))
    }
}


export const updateTaskGroup = async (taskGroupId : number, name : string) => {
    try {
        const reponse = await ApiClient().post(`project/taskgroup/update/name/${taskGroupId}`,{
            name : name
        }, {
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.data;
        store.dispatch(updateTaskGroupSuccess(data));
    } catch (e) {
        store.dispatch(updateTaskGroupFailure(e))
    }
}



export const deleteTaskGroup = async (taskGroupId : number) => {
    try {
        const reponse = await ApiClient().delete(`project/taskgroup/delete/${taskGroupId}`,{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.data;
        store.dispatch(deleteTaskGroupSuccess(taskGroupId));
    } catch (e) {
        store.dispatch(deleteTaskGroupFailure(e))
    }
}