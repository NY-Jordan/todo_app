import { ICollaborator } from "@/domain/entities/project.entities";
import { ITask } from "@/domain/entities/task.entities";
import { IUserStats } from "@/domain/entities/user.entities";

export const AppActions = {
  
    FETCH_USERS_STATS_INIT: 'FETCH_USERS_STATS_INIT',
    FETCH_USERS_STATS_SUCCESS : 'FETCH_USERS_STATS_SUCCESS',
    FETCH_USERS_STATS_FAILURE : 'FETCH_USERS_STATS_FAILURE',
    FETCH_USERS_STATS_RESET : 'FETCH_USERS_STATS_RESET',

    FETCH_USERS_COLLABORATORS_INIT: 'FETCH_USERS_COLLABORATORS_INIT',
    FETCH_USERS_COLLABORATORS_SUCCESS : 'FETCH_USERS_COLLABORATORS_SUCCESS',
    FETCH_USERS_COLLABORATORS_FAILURE : 'FETCH_USERS_COLLABORATORS_FAILURE',
    FETCH_USERS_COLLABORATORS_RESET : 'FETCH_USERS_COLLABORATORS_RESET'
  
   
};

export const fetchUsersStatsInit = () => ({
    type: AppActions.FETCH_USERS_STATS_INIT,
});

export const fetchUsersStatsSuccess = (data : IUserStats) => ({
    type: AppActions.FETCH_USERS_STATS_SUCCESS,
    payload: data,
});

export const fetchUsersStatsFailure = (error : any) => ({
    type: AppActions.FETCH_USERS_STATS_FAILURE,
    payload: error,
});

export const fetchUsersStatsReset = () => ({
    type: AppActions.FETCH_USERS_STATS_RESET,
});



export const fetchUsersCollaboratorsInit = () => ({
    type: AppActions.FETCH_USERS_COLLABORATORS_INIT,
});

export const fetchUsersCollaboratorsSuccess = (data : ICollaborator[]) => ({
    type: AppActions.FETCH_USERS_COLLABORATORS_SUCCESS,
    payload: data,
});

export const fetchUsersCollaboratorsFailure = (error : any) => ({
    type: AppActions.FETCH_USERS_COLLABORATORS_FAILURE,
    payload: error,
});

export const fetchUsersCollaboratorsReset = () => ({
    type: AppActions.FETCH_USERS_COLLABORATORS_RESET,
});