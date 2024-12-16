import { combineReducers } from "redux"
import AuthReducer from "@/app/reducers/AuthReducer";


 const RootReducer = 
    combineReducers({
       auth : AuthReducer
});


export default RootReducer;



