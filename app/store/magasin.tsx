import { combineReducers } from "redux"
import AuthReducer from "@/app/reducers/AuthReducer";
import { ProjectsReducer } from "../reducers/ProjectsReducer";
import DailyTaskReducer from "../reducers/DailyTaskReducer";
import NotificationReducer from "../reducers/NotificationReducer";


 const RootReducer = 
    combineReducers({
       auth : AuthReducer,
       projects : ProjectsReducer,
       dailyTask : DailyTaskReducer,
       notifications : NotificationReducer,
});


export default RootReducer;



