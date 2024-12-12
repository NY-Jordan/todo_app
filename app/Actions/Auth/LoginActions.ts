export const  LoginActions = {
    LOGIN_USER_SUCESS : "LOGIN_USER_SUCESS" ,
    LOGIN_USER_FAILED : "LOGIN_USER_SUCESS" ,
    INIT_LOGIN_USER_STATE : "LOGIN_USER_SUCESS" ,

    GET_USER_DETAILS_SUCESS : "GET_USER_DETAILS_SUCESS",
    GET_USER_DETAILS_FAILED : "GET_USER_DETAILS_FAILED",
}


export const loginUserFailed = (error : string) => ({
    type : LoginActions.LOGIN_USER_FAILED,
    payload : {error : error}
});


export const loginUserSucess = () => ({
    type : LoginActions.LOGIN_USER_FAILED,
    payload : {status : true}
});

export const initLoginUserState = () => ({
    type : LoginActions.INIT_LOGIN_USER_STATE,
});

