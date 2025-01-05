// projectsActions.js

import { IInvitation, IProject } from "@/domain/entities/project.entities";
import { IUser } from "@/domain/entities/user.entities";

// Constants
export const ProjectsActions = {
  CREATE_PROJECT_INIT: "CREATE_PROJECT_INIT",
  CREATE_PROJECT_SUCCESS: "CREATE_PROJECT_SUCCESS",
  CREATE_PROJECT_FAILURE: "CREATE_PROJECT_FAILURE",
  RESET_CREATE_PROJECT_STATE: "RESET_CREATE_PROJECT_STATE",

  FETCH_PROJECTS_INIT: "FETCH_PROJECTS_INIT",
  FETCH_PROJECTS_SUCCESS: "FETCH_PROJECTS_SUCCESS",
  FETCH_PROJECTS_FAILURE: "FETCH_PROJECTS_FAILURE",

  UPDATE_PROJECT_INIT: "UPDATE_PROJECT_INIT",
  UPDATE_PROJECT_SUCCESS: "UPDATE_PROJECT_SUCCESS",
  UPDATE_PROJECT_FAILURE: "UPDATE_PROJECT_FAILURE",

  DELETE_PROJECT_INIT: "DELETE_PROJECT_INIT",
  DELETE_PROJECT_SUCCESS: "DELETE_PROJECT_SUCCESS",
  DELETE_PROJECT_FAILURE: "DELETE_PROJECT_FAILURE",
  RESET_DELETE_PROJECT_STATE: "RESET_DELETE_PROJECT_STATE",

  LEFT_PROJECT_INIT: "LEFT_PROJECT_INIT",
  LEFT_PROJECT_SUCCESS: "LEFT_PROJECT_SUCCESS",
  LEFT_PROJECT_FAILURE: "LEFT_PROJECT_FAILURE",
  RESET_LEFT_PROJECT_STATE: "RESET_LEFT_PROJECT_STATE",

  SEND_INVITATION_SUCESS : "SEND_INVITATION_SUCESS",
  SEND_INVITATION_FAILED : "SEND_INVITATION_FAILED",
  INIT_INVITATION_STATUS : "INIT_INVITATION_STATUS",

  CANCEL_PROJECT_INVITATION_SUCESS : "CANCEL_PROJECT_INVITATION_SUCESS",
  CANCEL_PROJECT_INVITATION_FAILED : "CANCEL_PROJECT_INVITATION_FAILED",
  INIT_CANCEL_PROJECT_INVITATION_STATUS : "INIT_CANCEL_PROJECT_INVITATION_STATUS",
  RESET_CANCEL_PROJECT_PROJECT_INVITATION_STATE: "RESET_CANCEL_PROJECT_PROJECT_INVITATION_STATE",


  ACCEPT_PROJECT_INVITATION_SUCESS :  "ACCEPT_PROJECT_INVITATION_SUCESS",
  ACCEPT_PROJECT_INVITATION_FAILED :  "ACCEPT_PROJECT_INVITATION_FAILED",
  INIT_PROJECT_INVITATION :  "INIT_PROJECT_INVITATION",

  REFUSE_PROJECT_INVITATION_SUCESS :  "REFUSE_PROJECT_INVITATION_SUCESS",
  REFUSE_PROJECT_INVITATION_FAILED :  "REFUSE_PROJECT_INVITATION_FAILED",
  INIT_REFUSE_PROJECT_INVITATION :  "INIT_REFUSE_PROJECT_INVITATION",

  GET_INVITATIONS_SUCESS :  "GET_INVITATIONS_SUCESS",
  GET_INVITATIONS_FAILED :  "GET_INVITATIONS_FAILED",
  INIT_GET_INVITATIONS :  "INIT_GET_INVITATIONS",
  RESET_GET_INVITATIONS_STATE :  "RESET_GET_INVITATIONS_STATE",

  REMOVE_USER_FROM_PROJECT_SUCESS : "REMOVE_USER_FROM_PROJECT_SUCESS",
  REMOVE_USER_FROM_PROJECT_FAILED : "REMOVE_USER_FROM_PROJECT_FAILED",
  INIT_REMOVE_USER_FROM_PROJECT : "INIT_REMOVE_USER_FROM_PROJECT",
  RESET_REMOVE_USER_FROM_PROJECT_STATE: "RESET_REMOVE_USER_FROM_PROJECT_STATE",
};


// Action Creators
export const createProjectInit = () => ({
  type: ProjectsActions.CREATE_PROJECT_INIT,
});

export const createProjectSuccess = (project : IProject) => ({
  type: ProjectsActions.CREATE_PROJECT_SUCCESS,
  payload: {project : project},
});

export const createProjectFailure = (error : any) => ({
  type: ProjectsActions.CREATE_PROJECT_FAILURE,
  payload: error,
});

export const resetCreateProjectState = () => ({
  type: ProjectsActions.RESET_CREATE_PROJECT_STATE,
});

export const fetchProjectsInit = () => ({
  type: ProjectsActions.FETCH_PROJECTS_INIT,
});

export const fetchProjectsSuccess = (projects : Array<IProject>) => ({
  type: ProjectsActions.FETCH_PROJECTS_SUCCESS,
  payload: {projects: projects},
});

export const fetchProjectsFailure = (error : any) => ({
  type: ProjectsActions.FETCH_PROJECTS_FAILURE,
  payload: {error : error},
});

export const updateProjectInit = () => ({
  type: ProjectsActions.UPDATE_PROJECT_INIT,
});

export const updateProjectSuccess = (project : IProject) => ({
  type: ProjectsActions.UPDATE_PROJECT_SUCCESS,
  payload: {project : project},
});

export const updateProjectFailure = (error : any) => ({
  type: ProjectsActions.UPDATE_PROJECT_FAILURE,
  payload: {error : error},
});

export const deleteProjectInit = () => ({
  type: ProjectsActions.DELETE_PROJECT_INIT,
});

export const deleteProjectSuccess = (projectId : number) => ({
  type: ProjectsActions.DELETE_PROJECT_SUCCESS,
  payload: {projectId : projectId},
});

export const deleteProjectFailure = (error : any) => ({
  type: ProjectsActions.DELETE_PROJECT_FAILURE,
  payload: {error : error},
});


export const resetDeleteProjectState = () => ({
  type: ProjectsActions.RESET_DELETE_PROJECT_STATE,
});


export const SendInvitationSucess = (user_id:number, project_id : number, status : number) => ({
  type : ProjectsActions.SEND_INVITATION_SUCESS,
  payload : {status : status, user_id : user_id, project_id : project_id}
})


export const SendInvitationFailed = (user_id:number, project_id : number,  status : number) => ({
  type : ProjectsActions.SEND_INVITATION_FAILED,
  payload : {status : status, user_id : user_id, project_id : project_id}

});


export const InitInvitationStatus = () => ({
  type : ProjectsActions.INIT_INVITATION_STATUS,
});




export const AcceptProjectInvitationSucess = (uuid : string|number) => ({
  type : ProjectsActions.ACCEPT_PROJECT_INVITATION_SUCESS,
  payload : {uuid : uuid}
})


export const AcceptProjectInvitationFailed = () => ({
  type : ProjectsActions.ACCEPT_PROJECT_INVITATION_FAILED,
  payload : {error : true}
})

export const iniProjectInvitattionStatus = () => ({
  type : ProjectsActions.INIT_PROJECT_INVITATION,
})


export const RefuseProjectInvitationSucess = (uuid : string|number) => ({
  type : ProjectsActions.REFUSE_PROJECT_INVITATION_SUCESS,
  payload : {uuid : uuid}
})


export const RefuseProjectInvitationFailed = () => ({
  type : ProjectsActions.REFUSE_PROJECT_INVITATION_FAILED,
  payload : {error : true}
});

export const inirefuseProjectInvitattionStatus = () => ({
  type : ProjectsActions.INIT_REFUSE_PROJECT_INVITATION,
})


export const getInvitationsSucess = (invitations : Array<IInvitation>) => ({
  type: ProjectsActions.GET_INVITATIONS_SUCESS,
  payload: {invitations : invitations},
});

export const getInvitationsFailed = (error : any) => ({
  type: ProjectsActions.GET_INVITATIONS_FAILED,
  payload: {error : error}
});

export const initGetInvitations = (projectId : number) => ({
  type: ProjectsActions.INIT_GET_INVITATIONS,
});

export const resetGetInvitationsState = () => ({
  type: ProjectsActions.RESET_GET_INVITATIONS_STATE,
});



export const CancelProjectInvitationSucess = (uuid : string) => ({
  type: ProjectsActions.CANCEL_PROJECT_INVITATION_SUCESS,
  payload: {uuid : uuid},
});

export const CancelProjectInvitationFailed = (error : any) => ({
  type: ProjectsActions.CANCEL_PROJECT_INVITATION_FAILED,
  payload: {error : error}
});

export const InitCancelProjectInvitation = () => ({
  type: ProjectsActions.INIT_CANCEL_PROJECT_INVITATION_STATUS,
});

export const resetCancelProjectInvitationState = () => ({
  type: ProjectsActions.RESET_CANCEL_PROJECT_PROJECT_INVITATION_STATE,
});




export const removeUserFromProjectSucess = (userId : number) => ({
  type: ProjectsActions.REMOVE_USER_FROM_PROJECT_SUCESS,
  payload: {userId : userId},
});

export const removeUserFromProjectFailed = (error : any) => ({
  type: ProjectsActions.REMOVE_USER_FROM_PROJECT_FAILED,
  payload: {error : error}
});

export const initRemoveUserFromProject = () => ({
  type: ProjectsActions.INIT_REMOVE_USER_FROM_PROJECT,
});

export const resetRemoveUserFromProjectState = () => ({
  type: ProjectsActions.RESET_REMOVE_USER_FROM_PROJECT_STATE,
});

