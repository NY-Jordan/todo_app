export const  ResetPasswordActions = {
    SEND_RESET_PASSWORD_LINK_SUCESS : "SEND_RESET_PASSWORD_LINK_SUCESS" ,
    SEND_RESET_PASSWORD_LINK_FAILED : "SEND_RESET_PASSWORD_LINK_FAILED" ,

    RESET_PASSWORD_FAILED : "RESET_PASSWORD_FAILED" ,
    RESET_PASSWORD_SUCESS : "RESET_PASSWORD_SUCESS" ,
    
}

// ------------- send reset password  link ---------------

/* export const sendResetPasswordLinkSucess = (user, token) => ({
    type : ResetPasswordActions.SEND_RESET_PASSWORD_LINK_SUCESS,
    payload : {user : user, token : token}
});
 */
export const sendResetPasswordLinkFailed = () => ({
    type : ResetPasswordActions.SEND_RESET_PASSWORD_LINK_FAILED,
});


// ------------- reset password ---------------
export const ResetPassworFailed = (error : string) => ({
    type : ResetPasswordActions.RESET_PASSWORD_FAILED,
    payload : {error : error}
});

export const ResetPassworSucess = () => ({
    type : ResetPasswordActions.RESET_PASSWORD_SUCESS,
});