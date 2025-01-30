import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";
import { ProjectsActions } from "../Actions/ProjectsActions";

const initialState = {
  create: { status: "idle", error: null },
  fetch: { status: "idle", data: [], error: null },
  update: { status: "idle", error: null },
  delete: { status: "idle", error: null },
  leave : { status: "idle", error: null },
  invitations : { status: "idle", error: null, invitations : [] },
  cancel_invitation : { status: "idle", error: null, uuid : null },
  remove_user : { status: "idle", error: null, userId : null },
  send_invitation_status : {
    user_id : null,
    project_id : null,
    status : null
  },
  accept_invitation_status : {
      uuid : null,
      status : null
  },
  refuse_invitation_status : {
      uuid : null,
      status : null
  },
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
        create: { ...state.create, status:  StatusStateEnum.loading, error: null },
      };

    case ProjectsActions.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        create: { ...state.create, status:  StatusStateEnum.success, error: null },
      };

    case ProjectsActions.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        create: { ...state.create, status:  StatusStateEnum.failure, error: action.payload.error },
      };

    case ProjectsActions.RESET_CREATE_PROJECT_STATE:
        return {
          ...state,
          create: { ...state.create, status: "idle", error: null },
      };

    case ProjectsActions.FETCH_PROJECTS_INIT:
      return {
        ...state,
        fetch: { ...state.fetch, status:  StatusStateEnum.loading, error: null },
      };

    case ProjectsActions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          status:  StatusStateEnum.success,
          data: action.payload.projects,
          error: null,
        },
      };

    case ProjectsActions.FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        fetch: { ...state.fetch, status:  StatusStateEnum.failure, error: action.payload.error },
      };

    case ProjectsActions.UPDATE_PROJECT_INIT:
      return {
        ...state,
        update: { ...state.update, status:  StatusStateEnum.loading, error: null },
      };

    case ProjectsActions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        update: { ...state.update, status:  StatusStateEnum.success, error: null },
      };

    case ProjectsActions.UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        update: { ...state.update, status:  StatusStateEnum.failure, error: action.payload.error },
      };

    case ProjectsActions.DELETE_PROJECT_INIT:
      return {
        ...state,
        delete: { ...state.delete, status: StatusStateEnum.loading, error: null },
      };

    case ProjectsActions.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        delete: { ...state.delete, status: StatusStateEnum.success, error: null },
      };

    case ProjectsActions.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        delete: { ...state.delete, status: StatusStateEnum.failure, error: action.payload.error },
      };
    case ProjectsActions.RESET_DELETE_PROJECT_STATE:
      return {
        ...state,
        delete: { ...state.delete, status: "idle", error: null },
      };




      case ProjectsActions.LEFT_PROJECT_INIT:
        return {
          ...state,
          delete: { ...state.leave, status: StatusStateEnum.loading, error: null },
        };
  
      case ProjectsActions.LEFT_PROJECT_SUCCESS:
        return {
          ...state,
          delete: { ...state.leave, status: StatusStateEnum.success, error: null },
        };
  
      case ProjectsActions.LEFT_PROJECT_FAILURE:
        return {
          ...state,
          delete: { ...state.leave, status: StatusStateEnum.failure, error: action.payload.error },
        };
      case ProjectsActions.RESET_LEFT_PROJECT_STATE:
        return {
          ...state,
          delete: { ...state.leave, status: "idle", error: null },
        };

        // send invitation
            case ProjectsActions.SEND_INVITATION_SUCESS : 
            return {...state,send_invitation_status : { user_id : action.payload.user_id, project_id : action.payload.project_id, status : action.payload.status} }

        case ProjectsActions.SEND_INVITATION_FAILED : 
            return {...state,send_invitation_status : { user_id : action.payload.user_id, project_id : action.payload.project_id, status : action.payload.status}}

        case ProjectsActions.INIT_INVITATION_STATUS : 
            return {...state,send_invitation_status : { user_id : null, project_id : null,status : null} }


        //accept project invitation
        case ProjectsActions.ACCEPT_PROJECT_INVITATION_SUCESS : 
            return {...state, accept_invitation_status : {uuid : action.payload.uuid,status : true } }

        case ProjectsActions.ACCEPT_PROJECT_INVITATION_FAILED : 
            return {...state, accept_invitation_status : { uuid : action.payload.uuid,status : false }
            }

        case ProjectsActions.INIT_PROJECT_INVITATION : 
            return {...state, accept_invitation_status : { uuid : null,status : null }
        }

        //refuse project invitation
        case ProjectsActions.REFUSE_PROJECT_INVITATION_SUCESS : 
            return {...state, refuse_invitation_status : {uuid : action.payload.uuid,status : true } }

        case ProjectsActions.REFUSE_PROJECT_INVITATION_FAILED : 
            return {...state, refuse_invitation_status : { uuid : action.payload.uuid,status : false }
            }
            
        case ProjectsActions.INIT_REFUSE_PROJECT_INVITATION : 
            return {...state, refuse_invitation_status : { uuid : null,status : null }
        }


        case ProjectsActions.INIT_GET_INVITATIONS : 
        return {
          ...state,
          invitations: { ...state.invitations, status: StatusStateEnum.loading, error: null },
         }

        case ProjectsActions.GET_INVITATIONS_SUCESS : 
            return {...state, invitations: { ...state.invitations, invitations : action.payload.invitations, status: StatusStateEnum.success, error: null },
            }
        case ProjectsActions.GET_INVITATIONS_FAILED : 
          return {...state, invitations: { ...state.invitations, invitations : [], status: StatusStateEnum.failure, error: action.payload.error },
        }
            
        case ProjectsActions.RESET_GET_INVITATIONS_STATE : 
            return {...state, invitations : { invitations : [], status: "idle", error: null }
        }


        case ProjectsActions.INIT_CANCEL_PROJECT_INVITATION_STATUS : 
          return {
            ...state,
            cancel_invitation: { ...state.cancel_invitation, status: StatusStateEnum.loading, error: null },
          }

        case ProjectsActions.CANCEL_PROJECT_INVITATION_SUCESS : 
            return {...state, cancel_invitation: { ...state.cancel_invitation, uuid : action.payload.uuid, status: StatusStateEnum.success, error: null },
            }
        case ProjectsActions.CANCEL_PROJECT_INVITATION_FAILED : 
          return {...state, cancel_invitation: { ...state.cancel_invitation,  status: StatusStateEnum.failure, error: action.payload.error },
        }
            
        case ProjectsActions.RESET_CANCEL_PROJECT_PROJECT_INVITATION_STATE : 
            return {...state, cancel_invitation : { uuid : null, status: "idle", error: null }
        }

        case ProjectsActions.INIT_REMOVE_USER_FROM_PROJECT : 
        return {
          ...state,
          remove_user: { ...state.remove_user, status: StatusStateEnum.loading, error: null },
        }

      case ProjectsActions.REMOVE_USER_FROM_PROJECT_SUCESS : 
          return {...state, remove_user: { ...state.remove_user, userId : action.payload.userId, status: StatusStateEnum.success, error: null },
          }
      case ProjectsActions.REMOVE_USER_FROM_PROJECT_FAILED : 
        return {...state, remove_user: { ...state.remove_user,  status: StatusStateEnum.failure, error: action.payload.error },
      }
          
      case ProjectsActions.RESET_REMOVE_USER_FROM_PROJECT_STATE : 
          return {...state, remove_user : { userId : null, status: "idle", error: null }
      }

    default:
      return state;
  }
};
