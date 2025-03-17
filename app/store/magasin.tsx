import { combineReducers } from "redux"
import AuthReducer from "@/app/reducers/AuthReducer";
import { ProjectsReducer } from "../reducers/ProjectsReducer";
import DailyTaskReducer from "../reducers/DailyTaskReducer";
import NotificationReducer from "../reducers/NotificationReducer";
import taskGroupReducer from "../reducers/TaskGroupReducer";
import TaskReducer from "../reducers/TaskReducer";
import AppReducers from "../reducers/AppReducers";
import TicketsReducer from "../reducers/TicketsReducer";
import themeSlice from '../reducers/ThemeReducer';


 const RootReducer = 
    combineReducers({
       auth : AuthReducer,
       projects : ProjectsReducer,
       taskGroup : taskGroupReducer,
       dailyTask : DailyTaskReducer,
       tickets : TicketsReducer,
       task : TaskReducer,
       notifications : NotificationReducer,
       theme : themeSlice,
       app : AppReducers,
});


export default RootReducer;



