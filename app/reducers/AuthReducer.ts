import {LoginActions} from "@/app/Actions/Auth/LoginActions";
 type actionType = {
    type: string,
    payload: any
}

export const initialState = {
    name: "auth",
    login : {
        status : null,
        errors : null,
    },
}

const  AuthReducer = (state = initialState, action : actionType) => {
    switch (action.type) {
        case LoginActions.LOGIN_USER_FAILED :
            return {...initialState, login : {status : false, errors: action.payload.errors}};

        case LoginActions.LOGIN_USER_SUCESS :
            return {...initialState, login : {status : true, errors: false}};

        case LoginActions.INIT_LOGIN_USER_STATE :
            return {...initialState, login : {status : null, errors: null}};

        default:
        return {...state};
    }
};

export default AuthReducer;