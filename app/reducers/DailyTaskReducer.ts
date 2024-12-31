import { ITask } from "@/domain/entities/task.entities";
import { DailyTaskActions } from "../Actions/DailyTaskActions";

const initialState = {
  create: { status: 'idle', error: null },
  fetch: { status: 'idle', error: null, data: [] },
  edit: { status: 'idle', error: null , taskId : null},
  delete: { status: 'idle', error: null, taskId : null },
  updatePhase: { status: 'idle', error: null, taskId: null },
};

type ActionType = {
    type : string,
    payload : any
}

const DailyTaskReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case DailyTaskActions.CREATE_DAILY_TASK_INIT:
      return { ...state, create: { status: 'loading', error: null } };

    case DailyTaskActions.CREATE_DAILY_TASK_SUCCESS:
      return { 
        ...state, 
        create: { status: 'success', error: null },
        fetch: { 
          ...state.fetch, 
          data: [...state.fetch.data, action.payload], 
        }, 
      };

    case DailyTaskActions.CREATE_DAILY_TASK_FAILURE:
      return { ...state, create: { status: 'failure', error: action.payload } };

    case DailyTaskActions.RESET_CREATE_DAILY_TASK:
      return { ...state, create: { status: 'idle', error: null } };

    case DailyTaskActions.FETCH_DAILY_TASKS_INIT:
      return { ...state, fetch: { ...state.fetch, status: 'loading', error: null } };

    case DailyTaskActions.FETCH_DAILY_TASKS_SUCCESS:
      return { 
        ...state, 
        fetch: { status: 'success', error: null, data: action.payload } 
      };

    case DailyTaskActions.FETCH_DAILY_TASKS_FAILURE:
      return { ...state, fetch: { ...state.fetch, status: 'failure', error: action.payload } };

    case DailyTaskActions.RESET_FETCH_DAILY_TASKS:
      return { ...state, fetch: { ...state.fetch, status: 'idle', error: null, data: [] } };

    case DailyTaskActions.EDIT_DAILY_TASK_INIT:
      return { ...state, edit: { status: 'loading', error: null } };

    case DailyTaskActions.EDIT_DAILY_TASK_SUCCESS:
      return {
        ...state,
        edit: { status: 'success', error: null, taskId : action.payload.id },
        fetch: {
          ...state.fetch,
          data: state.fetch.data.map((task : ITask) =>
            task.id === action.payload.id ? action.payload.task : task
          ),
        },
      };

    case DailyTaskActions.EDIT_DAILY_TASK_FAILURE:
      return { ...state, edit: { status: 'failure', error: action.payload.error, taskId :  action.payload.id } };

    case DailyTaskActions.RESET_EDIT_DAILY_TASK:
      return { ...state, edit: { status: 'idle', error: null, taskId : null } };

    case DailyTaskActions.DELETE_DAILY_TASK_INIT:
      return { ...state, delete: { status: 'loading', error: null } };

    case DailyTaskActions.DELETE_DAILY_TASK_SUCCESS:
      return {
        ...state,
        delete: { status: 'success', error: null , taskId : action.payload},
        fetch: {
          ...state.fetch,
          data: state.fetch.data.filter((task : ITask) => task.id !== action.payload),
        },
      };

    case DailyTaskActions.DELETE_DAILY_TASK_FAILURE:
      return { ...state, delete: { status: 'failure', error: action.payload } };

    case DailyTaskActions.RESET_DELETE_DAILY_TASK:
      return { ...state, delete: { status: 'idle', error: null, taskId : null } };

    case DailyTaskActions.UPDATE_DAILY_TASK_PHASE_INIT:
      return { ...state, updatePhase: { status: 'loading', error: null, taskId: null } };

    case DailyTaskActions.UPDATE_DAILY_TASK_PHASE_SUCCESS:
      return {
        ...state,
        updatePhase: { status: 'success', error: null, taskId: action.payload.taskId },
        fetch: {
          ...state.fetch,
          data: state.fetch.data.map((task: ITask) =>
            task.id === action.payload.taskId ? action.payload.task : task
          ),
        },
      };

    case DailyTaskActions.UPDATE_DAILY_TASK_PHASE_FAILURE:
      return { 
        ...state, 
        updatePhase: { status: 'failure', error: action.payload.error, taskId: action.payload.taskId },
      };

    case DailyTaskActions.RESET_UPDATE_DAILY_TASK_PHASE:
      return { ...state, updatePhase: { status: 'idle', error: null, taskId: null } };

    default:
      return state;
  }
};

export default DailyTaskReducer;
