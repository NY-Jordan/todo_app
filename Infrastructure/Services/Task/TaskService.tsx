import { assignTaskToUserFailed, assignTaskToUserSuccess, changeTaskPhaseFailed, changeTaskPhaseSucess, createTaskFailure, createTaskSuccess, deleteTaskFailure, deleteTaskSuccess, fetchCollaboratorsTasksFailure, fetchTasksFailure, fetchTasksSuccess, rescheduleTaskFailure, rescheduleTaskSucess, unAssignTaskToUserSuccess, updateTaskFailure, updateTaskSuccess } from "@/app/Actions/TaskActions";
import { store } from "@/app/store/store";
import { CreateTaskType, ITask } from "@/domain/entities/task.entities";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";
import { getProjectCollaborators } from "../projects/ProjectsService";
import { QueryKey } from "@tanstack/react-query";
import { fetchCollaboratorsTasksSuccess } from '../../../app/Actions/TaskActions';
import { TaskPhasesEnum } from "@/domain/enum/TaskEnum";

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
        if (!options.users.length) {
           
            store.dispatch(unAssignTaskToUserSuccess(data));
        } else {
            store.dispatch(assignTaskToUserSuccess(data))
        }
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


  export const fetchCollaboratorsTasks = async (projectId : number, collaboratorId : number, assignedDate? : string|null, keysWord? : string | null ) => {
    const url  = keysWord ?  `project/tasks/fetch/${projectId}/${collaboratorId}?assigned_date=${assignedDate}&keys_word=${keysWord}` :  `project/tasks/fetch/${projectId}/${collaboratorId}?assigned_date=${assignedDate}`; 
    try {
        const reponse = await ApiClient().get(url,{
            headers : {
                Authorization : await getBearerAuthToken(),
                "Content-Type" : 'multipart/form-data'

            }
        });
        const data = reponse.data.tasks;
        store.dispatch(fetchCollaboratorsTasksSuccess(data))
    } catch (e) {
        store.dispatch(fetchCollaboratorsTasksFailure(e))
    }
}




export const reScheduleTaskAssignment = async (projectId : number, taskId : number, date : string) => {
    try {
        const reponse = await ApiClient().post(`project/tasks/reschedule/${projectId}/${taskId}`, {
            date : date
        },{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.task;
        store.dispatch(rescheduleTaskSucess(data))
    } catch (e) {
        store.dispatch(rescheduleTaskFailure(e))
    }
}


export const changeTaskPhase = async ( taskId : number,previousPhase : TaskPhasesEnum,  nextPhase : TaskPhasesEnum) => {
    try {
        const reponse = await ApiClient().post(`project/tasks/update/phase/${taskId}`,{
            phase : nextPhase
        },{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.task as ITask;
        store.dispatch(changeTaskPhaseSucess(data, previousPhase, nextPhase))
    } catch (e) {
        store.dispatch(changeTaskPhaseFailed(e))
    }
}
