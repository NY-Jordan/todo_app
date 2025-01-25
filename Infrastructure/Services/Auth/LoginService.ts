import { loginUserFailed, loginUserSucess } from "@/app/Actions/Auth/LoginActions";
import { store } from "@/app/store/store";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { log } from "console";
import {deleteCookie, setCookie} from "cookies-next";

export const LoginService = async (email : string, password : string) => {
    try {
        const reponse = await ApiClient().post("/auth/login",{
            email : email,
            password : password
        } ,{
        });
        const data = reponse.data.data;
        
        setCookie("token", data.token, {
            maxAge : 60 * 60 * 24,
        });
        localStorage.setItem('token', data.token)
        localStorage.setItem("user", JSON.stringify(data.user));
        store.dispatch(loginUserSucess());
    } catch (e) {
        store.dispatch(loginUserFailed(e))
    }
}


export const LogoutService =  () => {
    deleteCookie("token");
    localStorage.removeItem("user");
    localStorage.clear();
}


export const getGoogleAuth2Url = async () => {
    try {
      const response = await ApiClient().get("/auth2/google");
      if (response.status === 200) {
        return response.data.url; 
      }
      return null; 
    } catch (error) {
      return null; 
    }
};


export const getGithubAuth2Url = async () => {
  try {
    const response = await ApiClient().get("/auth2/github");
    if (response.status === 200) {
      return response.data.url; 
    }
    return null; 
  } catch (error) {
    return null; 
  }
};


export const googleAuthCallback = async (callbackParams : string) => {
  try {
    const response = await ApiClient().get(`auth2/google/callback?${callbackParams}`);
    if (response.status === 201 || response.status === 200) {
      const data = response.data.data;
      setCookie("token", data.token, {
        maxAge : 60 * 60 * 24,
     });
   
     localStorage.setItem('token', data.token.access_token)
      localStorage.setItem("user", JSON.stringify(data.user) );
      store.dispatch(loginUserSucess()); 
    }
  } catch (error) {
    store.dispatch(loginUserFailed(error))
  }
}

export const githubAuthCallback = async (callbackParams : string) => {
  try {
    const response = await ApiClient().get(`auth2/github/callback?${callbackParams}`);
    if (response.status === 201 || response.status === 200) {
      const data = response.data.data;
      setCookie("token", data.token, {
        maxAge : 60 * 60 * 24,
     });
     localStorage.setItem('token', data.token.access_token)
      localStorage.setItem("user", JSON.stringify(data.user) );
      store.dispatch(loginUserSucess()); 
    }
  } catch (error) {
    store.dispatch(loginUserFailed(error))
  }
}
 