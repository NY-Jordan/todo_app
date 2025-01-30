import { error } from "console";
import { TaskGroupActions } from "../Actions/TaskGroupActions";
import { ITaskGroup } from '../../domain/entities/task.group.entities';
import Pagination from "@/presentation/components/Pagination/Pagination";
import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";

const initialState = {
  taskGroups: [],
  status: StatusStateEnum.idle,
  pagination : null,
  error: null,
  create: { status: "idle", error: null }, 
  update: { status: "idle", error: null , taskGroupId : null},  
  delete: { status: "idle", error: null, taskGroupId : null }, 
};

type ActionType = {
    type : string,
    payload : any
}


const taskGroupReducer = (state = initialState, action : ActionType) => {
  switch (action.type) {
    // Pour la création d'un TaskGroup
    case TaskGroupActions.CREATE_TASKGROUP_INIT:
      return {
        ...state,
        create: {status :  StatusStateEnum.loading, error : null},
      };
    case TaskGroupActions.CREATE_TASKGROUP_SUCCESS:
      return {
        ...state,
        create: {status :  StatusStateEnum.success, error : null},
      };
    case TaskGroupActions.CREATE_TASKGROUP_FAILURE:
      return {
        ...state,
        create: {status :  StatusStateEnum.failure, error : action.payload},
      };
    case TaskGroupActions.CREATE_TASKGROUP_RESET:
      return {
        ...state,
        create: {status :  'eidle', error : action.payload},
        error: null,
      };

    // Pour la récupération des TaskGroups
    case TaskGroupActions.FETCH_TASKGROUPS_INIT:
      return {
        ...state,
        status: StatusStateEnum.loading,
        error: null,
      };
    case TaskGroupActions.FETCH_TASKGROUPS_SUCCESS:
      return {
        ...state,
        status: StatusStateEnum.success,
        taskGroups: action.payload.taskGroups,
        pagination: action.payload.pagination,
      };
    case TaskGroupActions.FETCH_TASKGROUPS_FAILURE:
      return {
        ...state,
        status: StatusStateEnum.failure,
        error: action.payload,
      };
    case TaskGroupActions.FETCH_TASKGROUPS_RESET:
      return {
        ...state,
        status: StatusStateEnum.idle,
        error: null,
      };

    // Pour la mise à jour d'un TaskGroup
    case TaskGroupActions.UPDATE_TASKGROUP_INIT:
      return {
        ...state,
        update: {status :  StatusStateEnum.loading, error : null},
      };
    case TaskGroupActions.UPDATE_TASKGROUP_SUCCESS:
      return {
        ...state,
        update:  {status :  StatusStateEnum.success, error : null},
        taskGroups: state.taskGroups.map((group : ITaskGroup) =>
          group.id === action.payload.id ? { ...group, ...action.payload } : group
        ),
      };
    case TaskGroupActions.UPDATE_TASKGROUP_FAILURE:
      return {
        ...state,
        update:  {status :  StatusStateEnum.failure, error : action.payload},
      };
    case TaskGroupActions.UPDATE_TASKGROUP_RESET:
      return {
        ...state,
        update:  {status :  StatusStateEnum.idle, error : action.payload},
      };

    // Pour la suppression d'un TaskGroup
    case TaskGroupActions.DELETE_TASKGROUP_INIT:
      return {
        ...state,
        delete: {status :  StatusStateEnum.loading, error : null},
      };
    case TaskGroupActions.DELETE_TASKGROUP_SUCCESS:
      return {
        ...state,
        delete: {status :  StatusStateEnum.success, error : null, taskGroupId : action.payload},
        taskGroups: state.taskGroups.filter((group : ITaskGroup) => group.id !== action.payload),
      };
    case TaskGroupActions.DELETE_TASKGROUP_FAILURE:
      return {
        ...state,
        delete: {status :  StatusStateEnum.failure, error : action.payload, taskGroupId : null},
        error: action.payload,
      };
    case TaskGroupActions.DELETE_TASKGROUP_RESET:
      return {
        ...state,
        delete: {status :  StatusStateEnum.idle, error : null, taskGroupId : null},
      };

    default:
      return state;
  }
};

export default taskGroupReducer;
