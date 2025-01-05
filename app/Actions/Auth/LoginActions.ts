export const  LoginActions = {
    LOGIN_USER_SUCESS : "LOGIN_USER_SUCESS" ,
    LOGIN_USER_FAILED : "LOGIN_USER_FAILED" ,
    INIT_LOGIN_USER_STATE : "INIT_LOGIN_USER_STATE" ,

    GET_USER_DETAILS_SUCESS : "GET_USER_DETAILS_SUCESS",
    GET_USER_DETAILS_FAILED : "GET_USER_DETAILS_FAILED",
}


export const loginUserFailed = (error : any) => ({
    type : LoginActions.LOGIN_USER_FAILED,
    payload : {error : error}
});


export const loginUserSucess = () => ({
    type : LoginActions.LOGIN_USER_SUCESS,
    payload : {status : true}
});

export const initLoginUserState = () => ({
    type : LoginActions.INIT_LOGIN_USER_STATE,
});

