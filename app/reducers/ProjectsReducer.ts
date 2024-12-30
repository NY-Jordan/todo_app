import { ProjectsActions } from "../Actions/ProjectsSctions";

const initialState = {
  create: { status: "idle", error: null },
  fetch: { status: "idle", data: [], error: null },
  update: { status: "idle", error: null },
  delete: { status: "idle", error: null },
  leave : { status: "idle", error: null },
};

type ActionType = {
    type : string,
    payload : any
}

export const ProjectsReducer = (state = initialState, action : ActionType) => {
  switch (action.type) {
    case ProjectsActions.CREATE_PROJECT_INIT:
      return {
        ...state,
        create: { ...state.create, status: "loading", error: null },
      };

    case ProjectsActions.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        create: { ...state.create, status: "success", error: null },
      };

    case ProjectsActions.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        create: { ...state.create, status: "failure", error: action.payload.error },
      };

    case ProjectsActions.RESET_CREATE_PROJECT_STATE:
        return {
          ...state,
          create: { ...state.create, status: "idle", error: null },
      };

    case ProjectsActions.FETCH_PROJECTS_INIT:
      return {
        ...state,
        fetch: { ...state.fetch, status: "loading", error: null },
      };

    case ProjectsActions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          status: "success",
          data: action.payload.projects,
          error: null,
        },
      };

    case ProjectsActions.FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        fetch: { ...state.fetch, status: "failure", error: action.payload.error },
      };

    case ProjectsActions.UPDATE_PROJECT_INIT:
      return {
        ...state,
        update: { ...state.update, status: "loading", error: null },
      };

    case ProjectsActions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        update: { ...state.update, status: "success", error: null },
      };

    case ProjectsActions.UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        update: { ...state.update, status: "failure", error: action.payload.error },
      };

    case ProjectsActions.DELETE_PROJECT_INIT:
      return {
        ...state,
        delete: { ...state.delete, status: "loading", error: null },
      };

    case ProjectsActions.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        delete: { ...state.delete, status: "success", error: null },
      };

    case ProjectsActions.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        delete: { ...state.delete, status: "failure", error: action.payload.error },
      };
    case ProjectsActions.RESET_DELETE_PROJECT_STATE:
      return {
        ...state,
        delete: { ...state.delete, status: "idle", error: null },
      };




      case ProjectsActions.LEFT_PROJECT_INIT:
        return {
          ...state,
          delete: { ...state.leave, status: "loading", error: null },
        };
  
      case ProjectsActions.LEFT_PROJECT_SUCCESS:
        return {
          ...state,
          delete: { ...state.leave, status: "success", error: null },
        };
  
      case ProjectsActions.LEFT_PROJECT_FAILURE:
        return {
          ...state,
          delete: { ...state.leave, status: "failure", error: action.payload.error },
        };
      case ProjectsActions.RESET_LEFT_PROJECT_STATE:
        return {
          ...state,
          delete: { ...state.leave, status: "idle", error: null },
        };

    default:
      return state;
  }
};
