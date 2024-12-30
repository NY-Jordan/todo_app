// projectsActions.js

import { IProject } from "@/domain/entities/project.entities";

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
