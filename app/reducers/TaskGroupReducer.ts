import { error } from "console";
import { TaskGroupActions } from "../Actions/TaskGroupActions";
import { ITaskGroup } from '../../domain/entities/task.group.entities';

const initialState = {
  taskGroups: [],
  status: 'idle',
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
        create: {status :  'loading', error : null},
      };
    case TaskGroupActions.CREATE_TASKGROUP_SUCCESS:
      return {
        ...state,
        create: {status :  'succeeded', error : null},
        taskGroups: [...state.taskGroups, action.payload],
      };
    case TaskGroupActions.CREATE_TASKGROUP_FAILURE:
      return {
        ...state,
        create: {status :  'failure', error : action.payload},
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
        status: 'loading',
        error: null,
      };
    case TaskGroupActions.FETCH_TASKGROUPS_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        taskGroups: action.payload,
      };
    case TaskGroupActions.FETCH_TASKGROUPS_FAILURE:
      return {
        ...state,
        status: 'failure',
        error: action.payload,
      };
    case TaskGroupActions.FETCH_TASKGROUPS_RESET:
      return {
        ...state,
        status: 'idle',
        error: null,
      };

    // Pour la mise à jour d'un TaskGroup
    case TaskGroupActions.UPDATE_TASKGROUP_INIT:
      return {
        ...state,
        update: {status :  'loading', error : null},
      };
    case TaskGroupActions.UPDATE_TASKGROUP_SUCCESS:
      return {
        ...state,
        update:  {status :  'succeeded', error : null},
        taskGroups: state.taskGroups.map((group : ITaskGroup) =>
          group.id === action.payload.id ? { ...group, ...action.payload } : group
        ),
      };
    case TaskGroupActions.UPDATE_TASKGROUP_FAILURE:
      return {
        ...state,
        update:  {status :  'failure', error : action.payload},
      };
    case TaskGroupActions.UPDATE_TASKGROUP_RESET:
      return {
        ...state,
        update:  {status :  'idle', error : action.payload},
      };

    // Pour la suppression d'un TaskGroup
    case TaskGroupActions.DELETE_TASKGROUP_INIT:
      return {
        ...state,
        delete: {status :  'loading', error : null},
      };
    case TaskGroupActions.DELETE_TASKGROUP_SUCCESS:
      return {
        ...state,
        delete: {status :  'succeeded', error : null, taskGroupId : action.payload},
        taskGroups: state.taskGroups.filter((group : ITaskGroup) => group.id !== action.payload),
      };
    case TaskGroupActions.DELETE_TASKGROUP_FAILURE:
      return {
        ...state,
        delete: {status :  'failure', error : action.payload, taskGroupId : null},
        error: action.payload,
      };
    case TaskGroupActions.DELETE_TASKGROUP_RESET:
      return {
        ...state,
        delete: {status :  'idle', error : null, taskGroupId : null},
      };

    default:
      return state;
  }
};

export default taskGroupReducer;
