import { combineReducers } from "redux"
import AuthReducer from "@/app/reducers/AuthReducer";
import { ProjectsReducer } from "../reducers/ProjectsReducer";
import DailyTaskReducer from "../reducers/DailyTaskReducer";


 const RootReducer = 
    combineReducers({
       auth : AuthReducer,
       projects : ProjectsReducer,
       dailyTask : DailyTaskReducer
});


export default RootReducer;



