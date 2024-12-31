import { ITask } from "@/domain/entities/task.entities";

export const DailyTaskActions = {
    CREATE_DAILY_TASK_INIT: 'CREATE_DAILY_TASK_INIT',
    CREATE_DAILY_TASK_SUCCESS: 'CREATE_DAILY_TASK_SUCCESS',
    CREATE_DAILY_TASK_FAILURE: 'CREATE_DAILY_TASK_FAILURE',
  
    FETCH_DAILY_TASKS_INIT: 'FETCH_DAILY_TASKS_INIT',
    FETCH_DAILY_TASKS_SUCCESS: 'FETCH_DAILY_TASKS_SUCCESS',
    FETCH_DAILY_TASKS_FAILURE: 'FETCH_DAILY_TASKS_FAILURE',
  
    EDIT_DAILY_TASK_INIT: 'EDIT_DAILY_TASK_INIT',
    EDIT_DAILY_TASK_SUCCESS: 'EDIT_DAILY_TASK_SUCCESS',
    EDIT_DAILY_TASK_FAILURE: 'EDIT_DAILY_TASK_FAILURE',
  
    DELETE_DAILY_TASK_INIT: 'DELETE_DAILY_TASK_INIT',
    DELETE_DAILY_TASK_SUCCESS: 'DELETE_DAILY_TASK_SUCCESS',
    DELETE_DAILY_TASK_FAILURE: 'DELETE_DAILY_TASK_FAILURE',
  
    UPDATE_DAILY_TASK_PHASE_INIT: 'UPDATE_DAILY_TASK_PHASE_INIT',
    UPDATE_DAILY_TASK_PHASE_SUCCESS: 'UPDATE_DAILY_TASK_PHASE_SUCCESS',
    UPDATE_DAILY_TASK_PHASE_FAILURE: 'UPDATE_DAILY_TASK_PHASE_FAILURE',

    RESET_CREATE_DAILY_TASK: 'RESET_CREATE_DAILY_TASK',
    RESET_FETCH_DAILY_TASKS: 'RESET_FETCH_DAILY_TASKS',
    RESET_EDIT_DAILY_TASK: 'RESET_EDIT_DAILY_TASK',
    RESET_DELETE_DAILY_TASK: 'RESET_DELETE_DAILY_TASK',
    RESET_UPDATE_DAILY_TASK_PHASE: 'RESET_UPDATE_DAILY_TASK_PHASE',
};

export const createDailyTaskInit = () => ({
    type: DailyTaskActions.CREATE_DAILY_TASK_INIT,
});

export const createDailyTaskSuccess = (dailyTask : ITask) => ({
    type: DailyTaskActions.CREATE_DAILY_TASK_SUCCESS,
    payload: dailyTask,
});

export const createDailyTaskFailure = (error : any) => ({
    type: DailyTaskActions.CREATE_DAILY_TASK_FAILURE,
    payload: error,
});

export const resetCreateDailyTask = () => ({
    type: DailyTaskActions.RESET_CREATE_DAILY_TASK,
});

export const fetchDailyTasksInit = () => ({
    type: DailyTaskActions.FETCH_DAILY_TASKS_INIT,
});

export const fetchDailyTasksSuccess = (dailyTasks : Array<ITask>) => ({
    type: DailyTaskActions.FETCH_DAILY_TASKS_SUCCESS,
    payload: dailyTasks,
});

export const fetchDailyTasksFailure = (error : any) => ({
    type: DailyTaskActions.FETCH_DAILY_TASKS_FAILURE,
    payload: error,
});

export const resetFetchDailyTasks = () => ({
    type: DailyTaskActions.RESET_FETCH_DAILY_TASKS,
});

export const editDailyTaskInit = () => ({
    type: DailyTaskActions.EDIT_DAILY_TASK_INIT,
});

export const editDailyTaskSuccess = (task :Array<ITask>, taskId : number) => ({
    type: DailyTaskActions.EDIT_DAILY_TASK_SUCCESS,
    payload: {task : task, id : taskId},
});

export const editDailyTaskFailure = (error :any, id : number) => ({
    type: DailyTaskActions.EDIT_DAILY_TASK_FAILURE,
    payload: {error : error, id : id}
});

export const resetEditDailyTask = () => ({
    type: DailyTaskActions.RESET_EDIT_DAILY_TASK,
});

export const deleteDailyTaskInit = () => ({
    type: DailyTaskActions.DELETE_DAILY_TASK_INIT,
});

export const deleteDailyTaskSuccess = (id : number) => ({
    type: DailyTaskActions.DELETE_DAILY_TASK_SUCCESS,
    payload: id,
});

export const deleteDailyTaskFailure = (error : any) => ({
    type: DailyTaskActions.DELETE_DAILY_TASK_FAILURE,
    payload: error,
});

export const resetDeleteDailyTask = () => ({
    type: DailyTaskActions.RESET_DELETE_DAILY_TASK,
});

export const updateDailyTaskPhaseInit = () => ({
    type: DailyTaskActions.UPDATE_DAILY_TASK_PHASE_INIT,
});

export const updateDailyTaskPhaseSuccess = (taskId: number, task : ITask) => ({
    type: DailyTaskActions.UPDATE_DAILY_TASK_PHASE_SUCCESS,
    payload: { taskId, task },
});

export const updateDailyTaskPhaseFailure = (error: any, taskId: number) => ({
    type: DailyTaskActions.UPDATE_DAILY_TASK_PHASE_FAILURE,
    payload: { error, taskId },
});

export const resetUpdateDailyTaskPhase = () => ({
    type: DailyTaskActions.RESET_UPDATE_DAILY_TASK_PHASE,
});
