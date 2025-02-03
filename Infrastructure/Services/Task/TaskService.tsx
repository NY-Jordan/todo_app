import { assignTaskToUserFailed, assignTaskToUserSuccess, createTaskFailure, createTaskSuccess, deleteTaskFailure, deleteTaskSuccess, fetchCollaboratorsTasksFailure, fetchTasksFailure, fetchTasksSuccess, updateTaskFailure, updateTaskSuccess } from "@/app/Actions/TaskActions";
import { store } from "@/app/store/store";
import { CreateTaskType } from "@/domain/entities/task.entities";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";
import { getProjectCollaborators } from "../projects/ProjectsService";
import { QueryKey } from "@tanstack/react-query";
import { fetchCollaboratorsTasksSuccess } from '../../../app/Actions/TaskActions';

export const FetchAllTasks = async (projectId : number, collaboratorId : undefined|string, taskGroupSelected : undefined|number, phaseId : number|undefined, currentPage : number|undefined) => {
    try {
        const reponse = await ApiClient().get(`/project/tasks/fetch/${projectId}?page=${currentPage}&&user_id=${collaboratorId}&&task_group_id=${taskGroupSelected}&&phase_id=${phaseId}`, {
            headers : { 
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.tasks;
        const pagination = reponse.data.pagination;
         store.dispatch(fetchTasksSuccess(data, pagination));
    } catch (e) {
        store.dispatch(fetchTasksFailure(e))
    }
}


export const createTask = async (options : CreateTaskType) => {
    try {
        const reponse = await ApiClient().post(`/project/tasks/create`, options, {
            headers : { 
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.task;

        store.dispatch(createTaskSuccess(data));
    } catch (e) {
        store.dispatch(createTaskFailure(e))
    }
}

export const updateTask = async (options : CreateTaskType, taskId : number) => {
    try {
        const reponse = await ApiClient().post(`/project/tasks/update/${taskId}`, options, {
            headers : { 
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.task;
        store.dispatch(updateTaskSuccess(data));
    } catch (e) {
        store.dispatch(updateTaskFailure(e))
    }
}



export const deleteTask = async (taskId : number) => {
    try {
        const reponse = await ApiClient().delete(`/project/tasks/delete/${taskId}`, {
            headers : { 
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.task;
        store.dispatch(deleteTaskSuccess(taskId));
    } catch (e) {
        store.dispatch(deleteTaskFailure(e))
    }
}



export const assignTaskToUsers = async (projectId : number, options : {task_id : number, users : number[]}) => {
    try {
        const reponse = await ApiClient().post(`project/tasks/assign/${projectId}`, options,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.task;
        store.dispatch(assignTaskToUserSuccess(data))
    } catch (e) {
        store.dispatch(assignTaskToUserFailed(e))
    }
}

export const fetchCollaborators = ({ queryKey } : {queryKey : QueryKey}) => {
    const [, id] = queryKey;
    if (typeof id === 'string') {
      return getProjectCollaborators(parseInt(id));
    }
  };


  export const fetchCollaboratorsTasks = async (projectId : number, collaboratorId : number) => {
    try {
        const reponse = await ApiClient().get(`project/tasks/fetch/${projectId}/${collaboratorId}`,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.tasks;
        store.dispatch(fetchCollaboratorsTasksSuccess(data))
    } catch (e) {
        store.dispatch(fetchCollaboratorsTasksFailure(e))
    }
}
