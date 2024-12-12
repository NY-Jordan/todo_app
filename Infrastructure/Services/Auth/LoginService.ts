import { loginUserFailed, loginUserSucess } from "@/app/Actions/Auth/LoginActions";
import { store } from "@/app/store/store";
import ApiClient from "@/Infrastructure/helpers/ApiClient";

export const LoginService = async (email : string, password : string) => {
    try {
        const reponse = await ApiClient().post("/auth/login",{
            email : email,
            password : password
        } ,{
        });
        const token = reponse.data.data;
        store.dispatch(loginUserSucess());
        
    } catch (e) {
        store.dispatch(loginUserFailed(e))
    }
}
