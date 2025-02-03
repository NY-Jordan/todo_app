import { IPagination, ITask } from "@/domain/entities/task.entities";
import { TaskActions } from "../Actions/TaskActions";
import Pagination from "@/presentation/components/Pagination/Pagination";
import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";

// État initial
const initialState  : {
  create: { status: string, error: null|any },
  fetch: { status: string, error: null|any, data: {tasks : ITask[], pagination : IPagination|null} },
  collaboratorsTasks: { status: string, error: null|any, data: {tasks : ITask[]} },
  update: { status: string, error: null|any },
  delete: { status: string, error: null|any },
  assign: { status: string, error: null|any },
  assign_task : { status: string, error: null|any, task : null|ITask },
} ={
  create: { status: StatusStateEnum.idle, error: null },
  fetch: { status: StatusStateEnum.idle, error: null, data: {tasks : [], pagination : null} },
  collaboratorsTasks: { status: StatusStateEnum.idle, error: null, data: {tasks : []} },
  update: { status: StatusStateEnum.idle, error: null },
  delete: { status: StatusStateEnum.idle, error: null },
  assign: { status: StatusStateEnum.idle, error: null },
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
      return { ...state, create: { status: StatusStateEnum.loading, error: null } };

    case TaskActions.CREATE_TASK_SUCCESS:
      const task  = action.payload.task
      const tasksLenght = state.fetch.data.tasks.length  === 10 ?  1 :  state.fetch.data.tasks.length;
      
      return {
        ...state,
        create: { status: StatusStateEnum.success, error: null },
      };

    case TaskActions.CREATE_TASK_FAILURE:
      return { ...state, create: { status: StatusStateEnum.failure, error: action.payload } };

    case TaskActions.CREATE_TASK_RESET:
      return { ...state, create: { status: StatusStateEnum.idle, error: null } };

    // FETCH
    case TaskActions.FETCH_TASKS_INIT:
      return { ...state, fetch: { ...state.fetch, status: StatusStateEnum.loading, error: null } };

    case TaskActions.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        fetch: { status: StatusStateEnum.success, error: null, data: {tasks : action.payload.tasks, pagination : action.payload.pagination} },
      };

    case TaskActions.FETCH_TASKS_FAILURE:
      return { ...state, fetch: { ...state.fetch, status: StatusStateEnum.failure, error: action.payload } };

    case TaskActions.FETCH_TASKS_RESET:
      return { ...state, fetch: { status: StatusStateEnum.idle, error: null, data: {tasks : [], pagination : null} } };

    // UPDATE
    case TaskActions.UPDATE_TASK_INIT:
      return { ...state, update: { status: StatusStateEnum.loading, error: null } };

    case TaskActions.UPDATE_TASK_SUCCESS:
     
      return {
        ...state,
        update: { status: StatusStateEnum.success, error: null },
        fetch: {
          ...state.fetch,
          data : {tasks : state.fetch.data.tasks.map((task : ITask) =>
            task.id === action.payload.task.id ? action.payload.task : task
          ), pagination : state.fetch.data.pagination} ,
        },
      };

    case TaskActions.UPDATE_TASK_FAILURE:
      return { ...state, update: { status: StatusStateEnum.failure, error: action.payload } };

    case TaskActions.UPDATE_TASK_RESET:
      return { ...state, update: { status: StatusStateEnum.idle, error: null } };

    // DELETE
    case TaskActions.DELETE_TASK_INIT:
      return { ...state, delete: { status: StatusStateEnum.loading, error: null } };

    case TaskActions.DELETE_TASK_SUCCESS:
      const newTasks = state.fetch.data.tasks.filter((task : ITask) => task.id !== action.payload);      
      return {
        ...state,
        delete: { status: StatusStateEnum.success, error: null },
      };

    case TaskActions.DELETE_TASK_FAILURE:
      return { ...state, delete: { status: StatusStateEnum.failure, error: action.payload } };

    case TaskActions.DELETE_TASK_RESET:
      return { ...state, delete: { status: StatusStateEnum.idle, error: null } };

    // ASSIGN
      case TaskActions.INIT_ASSIGN_TASK_TO_USERS:
        return {
          ...state,
          assign_task: { ...state.assign_task, status: StatusStateEnum.loading, error: null, task : null },
        };
  
        case TaskActions.ASSIGN_TASK_TO_USERS_SUCCESS:
        return {
          ...state,
          assign_task: { ...state.assign_task, status: StatusStateEnum.success, error: null, task : action.payload.task  },
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
            assign_task: { ...state.assign_task, status: StatusStateEnum.failure, error: action.payload.error, task : null },
          };
  
        case TaskActions.RESET_ASSIGN_TASK_TO_USERS_STATE:
          return {
            ...state,
            assign_task: { ...state.assign_task, status: null, error: null, task : null },
          };
  
    case TaskActions.FETCH_COLLABORATORS_TASKS_INIT:
      return { ...state, collaboratorsTasks: { ...state.collaboratorsTasks, status: StatusStateEnum.loading, error: null } };

    case TaskActions.FETCH_COLLABORATORS_TASKS_SUCCESS:
      return {
        ...state,
        collaboratorsTasks: { status: StatusStateEnum.success, error: null, data: {tasks : action.payload.tasks} },
      };

    case TaskActions.FETCH_COLLABORATORS_TASKS_INIT:
      return { ...state, collaboratorsTasks: { ...state.collaboratorsTasks, status: StatusStateEnum.failure, error: action.payload } };

    case TaskActions.FETCH_COLLABORATORS_TASKS_RESET:
      return { ...state, collaboratorsTasks: { status: StatusStateEnum.idle, error: null, data: {tasks : []} } };

    default:
      return state;
  }
};

export default TaskReducer;
