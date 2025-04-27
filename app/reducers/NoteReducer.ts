import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";
import { NoteActions } from "../Actions/NoteActions";
import { INote } from "@/domain/entities/note.entities";

const initialState = {
  create: { status: "idle", error: null },
  fetch: { status: "idle", draft : 0,  data: [], error: null },
  update: { status: "idle", noteId : null,  error: null },
  delete: { status: "idle", noteId : null ,error: null },
  delete_progress: [],
  associateTask: { status: "idle", error: null },
  dissociateTask: { status: "idle", error: null },
};

type ActionType = {
  type: string;
  payload: any;
};

export const NotesReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case NoteActions.CREATE_INIT:
      return {
        ...state,
        create: { ...state.create, status: StatusStateEnum.loading, error: null },
      };

    case NoteActions.CREATE_SUCCESS:
      return {
        ...state,
        create: { ...state.create, status: StatusStateEnum.success, error: null },
      };

    case NoteActions.CREATE_FAILURE:
      return {
        ...state,
        create: { ...state.create, status: StatusStateEnum.failure, error: action.payload },
      };

    case NoteActions.CREATE_RESET:
      return {
        ...state,
        create: { ...state.create, status: "idle", error: null },
      };

    case NoteActions.FETCH_INIT:
      return {
        ...state,
        fetch: { ...state.fetch,  
           status: StatusStateEnum.loading },
      };

    case NoteActions.FETCH_SUCCESS:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          status: StatusStateEnum.success,
          data: action.payload.notes,
          draft : action.payload.draft,
          error: null,
        },
      };

    case NoteActions.FETCH_FAILURE:
      return {
        ...state,
        fetch: { ...state.fetch, draft : 0,  status: StatusStateEnum.failure, error: action.payload },
      };

    case NoteActions.FETCH_RESET:
      return {
        ...state,
        fetch: { ...state.fetch, draft : 0, status: "idle", error: null },
      };

    case NoteActions.UPDATE_INIT:
      return {
        ...state,
        update: { ...state.update, draft : 0, noteId : null, status: StatusStateEnum.loading, error: null },
      };

    case NoteActions.UPDATE_SUCCESS:
      return {
        ...state,
        update: { ...state.update, noteId : action.payload.id, status: StatusStateEnum.success, error: null },
        fetch: {
          ...state.fetch,
          
          data: state.fetch.data.map((note : INote) => {
            return note.id === action.payload.id ? action.payload : note 
          })
        },
      };

    case NoteActions.UPDATE_FAILURE:
      return {
        ...state,
        update: { ...state.update, noteId : action.payload, status: StatusStateEnum.failure, error: action.payload },
      };

    case NoteActions.UPDATE_RESET:
      return {
        ...state,
        update: { ...state.update, noteId : null,status: "idle", error: null },
      };

    case NoteActions.DELETE_INIT:
      return {
        ...state,
        delete: { ...state.delete, noteId : null, status: StatusStateEnum.loading, error: null },
      };
    case NoteActions.DELETE_PROGRESS : 
      return {
        ...state, 
        delete_progress : [
          ...state.delete_progress,
          action.payload
        ]

      }

    case NoteActions.DELETE_SUCCESS:
      return {
        ...state,
        delete: { ...state.delete, noteId : action.payload, status: StatusStateEnum.success, error: null },
        fetch: {
          ...state.fetch,
          data: state.fetch.data.filter((note : INote) => note.id !== action.payload)
        },
      };

    case NoteActions.DELETE_FAILURE:
      return {
        ...state,
        delete: { ...state.delete,  noteId : action.payload.noteId, status: StatusStateEnum.failure, error: action.payload },
      };

    case NoteActions.DELETE_RESET:
      return {
        ...state,
        delete: { ...state.delete, noteId : null,status: "idle", error: null },
      };

    case NoteActions.ASSOCIATE_TASK_INIT:
      return {
        ...state,
        associateTask: { ...state.associateTask, status: StatusStateEnum.loading, error: null },
      };

    case NoteActions.ASSOCIATE_TASK_SUCCESS:
      return {
        ...state,
        associateTask: { ...state.associateTask, status: StatusStateEnum.success, error: null },
      };

    case NoteActions.ASSOCIATE_TASK_FAILURE:
      return {
        ...state,
        associateTask: { ...state.associateTask, status: StatusStateEnum.failure, error: action.payload },
      };

    case NoteActions.ASSOCIATE_TASK_RESET:
      return {
        ...state,
        associateTask: { ...state.associateTask, status: "idle", error: null },
      };

    case NoteActions.DISSOCIATE_TASK_INIT:
      return {
        ...state,
        dissociateTask: { ...state.dissociateTask, status: StatusStateEnum.loading, error: null },
      };

    case NoteActions.DISSOCIATE_TASK_SUCCESS:
      return {
        ...state,
        dissociateTask: { ...state.dissociateTask, status: StatusStateEnum.success, error: null },
      };

    case NoteActions.DISSOCIATE_TASK_FAILURE:
      return {
        ...state,
        dissociateTask: { ...state.dissociateTask, status: StatusStateEnum.failure, error: action.payload },
      };

    case NoteActions.DISSOCIATE_TASK_RESET:
      return {
        ...state,
        dissociateTask: { ...state.dissociateTask, status: "idle", error: null },
      };

    default:
      return {...state};
  }
};
