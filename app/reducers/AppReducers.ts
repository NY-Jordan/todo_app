import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";
import { AppActions } from "../Actions/AppActions";

 type actionType = {
    type: string,
    payload: any
}

export const initialState = {
    stats : {
        status :  StatusStateEnum.idle,
        errors : null,
        data : null,
    },
    collaborators : {
        status :  StatusStateEnum.idle,
        errors : null,
        data : null,
    },
    tasks_activities : {
        status :  StatusStateEnum.idle,
        errors : null,
        data : null,
    },

}

const  AppReducers = (state = initialState, action : actionType) => {
    switch (action.type) {
        case AppActions.FETCH_USERS_STATS_INIT :
            return {...state, stats : {status : StatusStateEnum.loading, errors: null, data : null}};

        case AppActions.FETCH_USERS_STATS_SUCCESS :
            return {...state, stats : {status : StatusStateEnum.success, errors: false, data: action.payload}};

        case AppActions.FETCH_USERS_STATS_FAILURE :
            return {...state, stats : {status : StatusStateEnum.failure, errors: action.payload, data : null}};

        case AppActions.FETCH_USERS_STATS_RESET :
            return {...state, stats : {status : StatusStateEnum.idle, errors: null, data : null}};

        // COLLABORATORS
        
        case AppActions.FETCH_USERS_COLLABORATORS_INIT :
            return {...state, collaborators : {status : StatusStateEnum.loading, errors: null, data : null}};

        case AppActions.FETCH_USERS_COLLABORATORS_SUCCESS :
            return {...state, collaborators : {status : StatusStateEnum.success, errors: false, data: action.payload}};

        case AppActions.FETCH_USERS_COLLABORATORS_FAILURE :
            return {...state, collaborators : {status : StatusStateEnum.failure, errors: action.payload, data : null}};

        case AppActions.FETCH_USERS_COLLABORATORS_RESET :
            return {...state, collaborators : {status : StatusStateEnum.idle, errors: null, data : null}};


        case AppActions.FETCH_USERS_TASKS_ACTIVITIES_INIT :
            return {...state, tasks_activities : {status : StatusStateEnum.loading, errors: false, data: null}};

        case AppActions.FETCH_USERS_TASKS_ACTIVITIES_SUCCESS :
            return {...state, tasks_activities : {status : StatusStateEnum.success, errors: action.payload, data : action.payload}};

        case AppActions.FETCH_USERS_COLLABORATORS_FAILURE :
            return {...state, tasks_activities : {status : StatusStateEnum.failure, errors: action.payload, data : null}};
    
        case AppActions.FETCH_USERS_TASKS_ACTIVITIES_RESET :
            return {...state, tasks_activities : {status : StatusStateEnum.idle, errors: null, data : null}};
    

        default:
        return {...state};
    }
};

export default AppReducers;