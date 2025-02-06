import { combineReducers } from "redux"
import AuthReducer from "@/app/reducers/AuthReducer";
import { ProjectsReducer } from "../reducers/ProjectsReducer";
import DailyTaskReducer from "../reducers/DailyTaskReducer";
import NotificationReducer from "../reducers/NotificationReducer";
import taskGroupReducer from "../reducers/TaskGroupReducer";
import TaskReducer from "../reducers/TaskReducer";
import AppReducers from "../reducers/AppReducers";


 const RootReducer = 
    combineReducers({
       auth : AuthReducer,
       projects : ProjectsReducer,
       taskGroup : taskGroupReducer,
       dailyTask : DailyTaskReducer,
       task : TaskReducer,
       notifications : NotificationReducer,
       app : AppReducers,
});


export default RootReducer;



