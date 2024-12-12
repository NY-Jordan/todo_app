import axios from 'axios';
import { getCookie } from 'cookies-next'


const ApiClient =  () => {
    const API_SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
    const axiosInstance = axios.create({
        baseURL  : API_SERVER_URL,
        withXSRFToken : true,
        withCredentials : true,
        headers : {
            /* 'Content-Type': 'application/json', */
           /*  'accept': 'application/json', */
            'X-CSRF-TOKEN' : getCookie('X-CSRF-TOKEN'),
            isRetry: true
        }
    });


    const onRequest = (config : any) => {
        if ((
                config.method == 'post' || 
                config.method == 'put' || 
                config.method == 'delete'
                /* other methods you want to add here */
            ) && !getCookie('X-CSRF-TOKEN')) {
            return setCSRFToken()
                .then(response => config);
        }
        return config;
    }
    
    const setCSRFToken = () => {
        return axiosInstance.get(process.env.NEXT_PUBLIC_BASE_URL+'/sanctum/csrf-cookie');
    }
    
    axiosInstance.interceptors.request.use(onRequest, null);
    
    return axiosInstance
};

export default ApiClient;