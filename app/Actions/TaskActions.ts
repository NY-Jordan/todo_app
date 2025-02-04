import { IPagination, ITask } from "@/domain/entities/task.entities";

// Action Types
export const TaskActions = {
    CREATE_TASK_INIT: 'CREATE_TASK_INIT',
    CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
    CREATE_TASK_FAILURE: 'CREATE_TASK_FAILURE',
    CREATE_TASK_RESET: 'CREATE_TASK_RESET',
  
    FETCH_TASKS_INIT: 'FETCH_TASKS_INIT',
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_FAILURE: 'FETCH_TASKS_FAILURE',
    FETCH_TASKS_RESET: 'FETCH_TASKS_RESET',
  
    FETCH_COLLABORATORS_TASKS_INIT: 'FETCH_COLLABORATORS_TASKS_INIT',
    FETCH_COLLABORATORS_TASKS_SUCCESS: 'FETCH_COLLABORATORS_TASKS_SUCCESS',
    FETCH_COLLABORATORS_TASKS_FAILURE: 'FETCH_COLLABORATORS_TASKS_FAILURE',
    FETCH_COLLABORATORS_TASKS_RESET: 'FETCH_COLLABORATORS_TASKS_RESET',
  
    UPDATE_TASK_INIT: 'UPDATE_TASK_INIT',
    UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
    UPDATE_TASK_FAILURE: 'UPDATE_TASK_FAILURE',
    UPDATE_TASK_RESET: 'UPDATE_TASK_RESET',
  
    DELETE_TASK_INIT: 'DELETE_TASK_INIT',
    DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
    DELETE_TASK_FAILURE: 'DELETE_TASK_FAILURE',
    DELETE_TASK_RESET: 'DELETE_TASK_RESET',
  
    ASSIGN_TASK_TO_USERS_SUCCESS: 'ASSIGN_TASK_TO_USERS_SUCCESS',
    UNASSIGN_TASK_TO_USERS_SUCCESS: 'UNASSIGN_TASK_TO_USERS_SUCCESS',
    ASSIGN_TASK_TO_USERS_FAILED: 'ASSIGN_TASK_TO_USERS_FAILED',
    INIT_ASSIGN_TASK_TO_USERS: 'INIT_ASSIGN_TASK_TO_USERS',
    RESET_ASSIGN_TASK_TO_USERS_STATE: 'RESET_ASSIGN_TASK_TO_USERS_STATE',

    RESCHEDULE_TASK_INIT: 'RESCHEDULE_TASK_INIT',
    RESCHEDULE_TASK_SUCESS: 'RESCHEDULE_TASK_SUCESS',
    RESCHEDULE_TASK_FAILURE: 'RESCHEDULE_TASK_FAILURE',
    RESCHEDULE_TASK_RESET: 'RESCHEDULE_TASK_RESET',
};

// Action Creators
export const createTaskInit = () => ({
    type: TaskActions.CREATE_TASK_INIT,
});

export const createTaskSuccess = (task: ITask) => ({
    type: TaskActions.CREATE_TASK_SUCCESS,
    payload: { task },
});

export const createTaskFailure = (error: any) => ({
    type: TaskActions.CREATE_TASK_FAILURE,
    payload: error,
});

export const createTaskReset = () => ({
    type: TaskActions.CREATE_TASK_RESET,
});


export const fetchTasksInit = () => ({
    type: TaskActions.FETCH_TASKS_INIT,
});

export const fetchTasksSuccess = (tasks: ITask[], pagination: IPagination) => ({
    type: TaskActions.FETCH_TASKS_SUCCESS,
    payload: { tasks, pagination },
});

export const fetchTasksFailure = (error: any) => ({
    type: TaskActions.FETCH_TASKS_FAILURE,
    payload: error,
});

export const fetchTasksReset = () => ({
    type: TaskActions.FETCH_TASKS_RESET,
});


export const fetchCollaboratorsTasksInit = () => ({
    type: TaskActions.FETCH_COLLABORATORS_TASKS_INIT,
});

export const fetchCollaboratorsTasksSuccess = (tasks: ITask[]) => ({
    type: TaskActions.FETCH_COLLABORATORS_TASKS_SUCCESS,
    payload: { tasks },
});

export const fetchCollaboratorsTasksFailure = (error: any) => ({
    type: TaskActions.FETCH_COLLABORATORS_TASKS_FAILURE,
    payload: {error},
});

export const fetchCollaboratorsTasksReset = () => ({
    type: TaskActions.FETCH_COLLABORATORS_TASKS_RESET,
});


export const updateTaskInit = () => ({
    type: TaskActions.UPDATE_TASK_INIT,
});

export const updateTaskSuccess = (task: ITask) => ({
    type: TaskActions.UPDATE_TASK_SUCCESS,
    payload: { task },
});

export const updateTaskFailure = (error: any) => ({
    type: TaskActions.UPDATE_TASK_FAILURE,
    payload: error,
});

export const updateTaskReset = () => ({
    type: TaskActions.UPDATE_TASK_RESET,
});

export const deleteTaskInit = () => ({
    type: TaskActions.DELETE_TASK_INIT,
});

export const deleteTaskSuccess = (taskId: number) => ({
    type: TaskActions.DELETE_TASK_SUCCESS,
    payload: taskId,
});

export const deleteTaskFailure = (error: any) => ({
    type: TaskActions.DELETE_TASK_FAILURE,
    payload: error,
});

export const deleteTaskReset = () => ({
    type: TaskActions.DELETE_TASK_RESET,
});

export const assignTaskToUserSuccess = (task: ITask) => ({
    type: TaskActions.ASSIGN_TASK_TO_USERS_SUCCESS,
    payload: { task },
});

export const unAssignTaskToUserSuccess = (task: ITask) => ({
    type: TaskActions.UNASSIGN_TASK_TO_USERS_SUCCESS,
    payload: { task },
});

export const assignTaskToUserFailed = (error: any) => ({
    type: TaskActions.ASSIGN_TASK_TO_USERS_FAILED,
    payload: { error },
});

export const initAssignTaskToUser = () => ({
    type: TaskActions.INIT_ASSIGN_TASK_TO_USERS,
});

export const resetAssignTaskToUserState = () => ({
    type: TaskActions.RESET_ASSIGN_TASK_TO_USERS_STATE,
});


// RESCHEDULE

export const rescheduleTaskInit = () => ({
    type: TaskActions.RESCHEDULE_TASK_INIT,
});

export const rescheduleTaskSucess = (task: ITask) => ({
    type: TaskActions.RESCHEDULE_TASK_SUCESS,
    payload: { task },
});

export const rescheduleTaskFailure = (error: any) => ({
    type: TaskActions.RESCHEDULE_TASK_FAILURE,
    payload: { error },
});



export const ResetRescheduleTask = () => ({
    type: TaskActions.RESCHEDULE_TASK_RESET
});