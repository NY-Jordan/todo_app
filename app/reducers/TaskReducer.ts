import { IPagination, ITask } from "@/domain/entities/task.entities";
import { TaskActions } from "../Actions/TaskActions";

// État initial
const initialState  : {
  create: { status: string, error: null|any },
  fetch: { status: string, error: null|any, data: {tasks : ITask[], pagination : IPagination|null} },
  update: { status: string, error: null|any },
  delete: { status: string, error: null|any },
  assign: { status: string, error: null|any },
  assign_task : { status: string, error: null|any, task : null|ITask },
} ={
  create: { status: 'idle', error: null },
  fetch: { status: 'idle', error: null, data: {tasks : [], pagination : null} },
  update: { status: 'idle', error: null },
  delete: { status: 'idle', error: null },
  assign: { status: 'idle', error: null },
  assign_task : { status: "idle", error: null, task : null },

};

type ActionType = {
    type : string,
    payload : any
}

// Reducer
const TaskReducer = (state = initialState, action : ActionType) => {
  switch (action.type) {
    // CREATE
    case TaskActions.CREATE_TASK_INIT:
      return { ...state, create: { status: 'loading', error: null } };

    case TaskActions.CREATE_TASK_SUCCESS:
      return {
        ...state,
        create: { status: 'succeeded', error: null },
        fetch: {
          ...state.fetch,
          data: {tasks : action.payload.tasks , pagination : action.payload.pagination}, 
        },
      };

    case TaskActions.CREATE_TASK_FAILURE:
      return { ...state, create: { status: 'failed', error: action.payload } };

    case TaskActions.CREATE_TASK_RESET:
      return { ...state, create: { status: 'idle', error: null } };

    // FETCH
    case TaskActions.FETCH_TASKS_INIT:
      return { ...state, fetch: { ...state.fetch, status: 'loading', error: null } };

    case TaskActions.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        fetch: { status: 'succeeded', error: null, data: {tasks : action.payload.tasks, pagination : action.payload.pagination} },
      };

    case TaskActions.FETCH_TASKS_FAILURE:
      return { ...state, fetch: { ...state.fetch, status: 'failed', error: action.payload } };

    case TaskActions.FETCH_TASKS_RESET:
      return { ...state, fetch: { status: 'idle', error: null, data: {tasks : [], pagination : null} } };

    // UPDATE
    case TaskActions.UPDATE_TASK_INIT:
      return { ...state, update: { status: 'loading', error: null } };

    case TaskActions.UPDATE_TASK_SUCCESS:
     
      return {
        ...state,
        update: { status: 'succeeded', error: null },
        fetch: {
          ...state.fetch,
          data : {tasks : state.fetch.data.tasks.map((task : ITask) =>
            task.id === action.payload.task.id ? action.payload.task : task
          ), pagination : state.fetch.data.pagination} ,
        },
      };

    case TaskActions.UPDATE_TASK_FAILURE:
      return { ...state, update: { status: 'failed', error: action.payload } };

    case TaskActions.UPDATE_TASK_RESET:
      return { ...state, update: { status: 'idle', error: null } };

    // DELETE
    case TaskActions.DELETE_TASK_INIT:
      return { ...state, delete: { status: 'loading', error: null } };

    case TaskActions.DELETE_TASK_SUCCESS:
      return {
        ...state,
        delete: { status: 'succeeded', error: null },
        /* fetch: {
          ...state.fetch,
          data: state.fetch.data.tasks.filter((task : ITask) => task.id !== action.payload),
        }, */
      };

    case TaskActions.DELETE_TASK_FAILURE:
      return { ...state, delete: { status: 'failed', error: action.payload } };

    case TaskActions.DELETE_TASK_RESET:
      return { ...state, delete: { status: 'idle', error: null } };

    // ASSIGN
      case TaskActions.INIT_ASSIGN_TASK_TO_USERS:
        return {
          ...state,
          assign_task: { ...state.assign_task, status: "loading", error: null, task : null },
        };
  
        case TaskActions.ASSIGN_TASK_TO_USERS_SUCESS:
        return {
          ...state,
          assign_task: { ...state.assign_task, status: "success", error: null, task : action.payload.task  },
          fetch: {
            ...state.fetch,
            data : {tasks : state.fetch.data.tasks.map((task : ITask) =>
              task.id === action.payload.task.id ? action.payload.task : task
            ), pagination : state.fetch.data.pagination} ,
          },
        };
  
        case TaskActions.ASSIGN_TASK_TO_USERS_FAILED:
          return {
            ...state,
            assign_task: { ...state.assign_task, status: "failure", error: action.payload.error, task : null },
          };
  
        case TaskActions.RESET_ASSIGN_TASK_TO_USERS_STATE:
          return {
            ...state,
            assign_task: { ...state.assign_task, status: null, error: null, task : null },
          };
  
  

    default:
      return state;
  }
};

export default TaskReducer;
