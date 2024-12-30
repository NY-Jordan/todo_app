import { createProjectFailure, createProjectSuccess, deleteProjectFailure, deleteProjectSuccess, fetchProjectsSuccess } from "@/app/Actions/ProjectsSctions";
import { store } from "@/app/store/store";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";
import { fetchProjectsFailure } from '../../../app/Actions/ProjectsSctions';
import { ICreateProject } from "@/domain/entities/project.entities";

export const FetchAllProjects = async () => {
    try {
        const reponse = await ApiClient().get("/project/user",{
            headers : {
                Authorization : await getBearerAuthToken()
            }
        });
        const data = reponse.data.data;
        store.dispatch(fetchProjectsSuccess(data));
    } catch (e) {
        store.dispatch(fetchProjectsFailure(e))
    }
}

export const CreateProject = async  (options : FormData) => {
    try {
        const reponse = await ApiClient().post("/project/create",options,{
            headers : {
                Authorization : await getBearerAuthToken(),
                "Content-Type" : 'multipart/form-data'

            }
        });
        const data = reponse.data.data;
        store.dispatch(createProjectSuccess(data));
    } catch (e) {
        store.dispatch(createProjectFailure(e))
    }
}

export const deleteProject = async  (projectId : number) => {
    try {
        const reponse = await ApiClient().delete(`/project/delete/${projectId}`,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        store.dispatch(deleteProjectSuccess(projectId));
    } catch (e) {
        store.dispatch(deleteProjectFailure(e))
    }
}

/* export const leaveProject = async  (options : FormData) => {
    try {
        const reponse = await ApiClient().post("/project/create",options,{
            headers : {
                Authorization : await getBearerAuthToken(),
                "Content-Type" : 'multipart/form-data'

            }
        });
        const data = reponse.data.data;
        store.dispatch(createProjectSuccess(data));
    } catch (e) {
        store.dispatch(createProjectFailure(e))
    }
} */