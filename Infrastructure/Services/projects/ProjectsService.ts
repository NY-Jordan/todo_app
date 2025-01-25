import { AcceptProjectInvitationFailed, AcceptProjectInvitationSucess, CancelProjectInvitationFailed, CancelProjectInvitationSucess, createProjectFailure, createProjectSuccess, deleteProjectFailure, deleteProjectSuccess, fetchProjectsSuccess, getInvitationsFailed, getInvitationsSucess, RefuseProjectInvitationFailed, RefuseProjectInvitationSucess, removeUserFromProjectFailed, removeUserFromProjectSucess, SendInvitationFailed, SendInvitationSucess } from "@/app/Actions/ProjectsActions";
import { store } from "@/app/store/store";
import ApiClient from "@/Infrastructure/helpers/ApiClient";
import { getBearerAuthToken } from "@/Infrastructure/helpers/HelperUtils";
import { fetchProjectsFailure } from '../../../app/Actions/ProjectsActions';
import { ICreateProject, ProjectInvitationInterface } from "@/domain/entities/project.entities";
import { data } from '../../data/data';

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

export const searchUser = async  (projectId: number, key : string) => {
    try {
        const reponse = await ApiClient().get(`project/search/${projectId}?search=${key}`,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        return reponse.data.users;
    } catch (e) {
        return null;
    }
}


export async function getProjectInvitation(uuid : string|number) : Promise<ProjectInvitationInterface|null>   {
    try {
        const response  = await ApiClient().get('/project/invite/'+uuid,
        {
            headers : {
                Authorization : await getBearerAuthToken()
            }
        })
        const res =  response.data.data;
       return res;
    } catch (error) {
        return null;
    }
    
}



export async function acceptProjectInvitation(uuid : string|number) {
    ApiClient().post('/project/invite/user/accept/'+uuid,  
    {},
    {
        headers : {
            Authorization : await getBearerAuthToken()
        }
    }).then((response) => {
        const res = response.data;
        if (response.status === 200) {
            store.dispatch(AcceptProjectInvitationSucess(uuid))
        }   
    }).catch((e) => { 
        store.dispatch(AcceptProjectInvitationFailed());
        
    }) 
}

export async function refuseProjectInvitation(uuid : string|number) {
    ApiClient().post('/project/invite/user/reject/'+uuid,  
    {},
    {
        headers : {
            Authorization : await getBearerAuthToken()
        }
    }).then((response) => {
        const res = response.data;
        if (response.status === 200) {
            store.dispatch(RefuseProjectInvitationSucess(uuid))
        }   
    }).catch((e) => { 
        store.dispatch(RefuseProjectInvitationFailed());
    }) 
}

export async function SendInvitationToUser(userId : number,projectId : number) {
    ApiClient().post('/project/invite/'+userId+'/user/'+projectId,  
    {},
    {
        headers : {
            Authorization : await getBearerAuthToken()
        }
    }).then((response) => {
        const res = response.data;
        if (response.status === 201) {
            store.dispatch(SendInvitationSucess(userId,projectId,200))
        }   
    }).catch((e) => { 
        if(e.response.status === 412){
            store.dispatch(SendInvitationFailed(userId,projectId,412))
        }else {
            store.dispatch(SendInvitationFailed(userId,projectId,400))
        }
    }) 
}

export async function cancelProjectInvitation(uuid : string) {
    ApiClient().post(`/project/invite/user/cancel/${uuid}`,  
    {},
    {
        headers : {
            Authorization : await getBearerAuthToken()
        }
    }).then((response) => {
        const res = response.data;
            store.dispatch(CancelProjectInvitationSucess(uuid))
    }).catch((e) => { 
         store.dispatch(CancelProjectInvitationFailed(e))
       
    }) 
}

export async function removeUserOfProject(userId : number, projectId : number, invitationId : number) {
    ApiClient().post(`project/user/remove/${userId}/${projectId}/${invitationId}`,  
    {},
    {
        headers : {
            Authorization : await getBearerAuthToken()
        }
    }).then((response) => {
        const res = response.data;
            store.dispatch(removeUserFromProjectSucess(userId))
    }).catch((e) => { 
         store.dispatch(removeUserFromProjectFailed(e))
       
    }) 
}



export async function getInvitations(projectId : number) : Promise<void>  {
    try {
        const response  = await ApiClient().get(`project/invitations/${projectId}`,
        {
            headers : {
                Authorization : await getBearerAuthToken()
            }
        })
        const res =  response.data.data;
        store.dispatch(getInvitationsSucess(res))
    } catch (error) {
        store.dispatch(getInvitationsFailed(error))
    }
    
}



export async function getProjectDetails(projectId : number)  {
    try {
        const response  = await ApiClient().get(`project/details/${projectId}`,
        {
            headers : {
                Authorization : await getBearerAuthToken()
            }
        })
        const res =  response.data.data;
        return res;
    } catch (error) {
        return null;
    }
    
}



export const getProjectCollaborators = async  (projectId : number) => {
    try {
        const reponse = await ApiClient().get(`project/collaborators/${projectId}`,{
            headers : {
                Authorization : await getBearerAuthToken(),
                "Content-Type" : 'multipart/form-data'

            }
        });
        const data = reponse.data.data;
       return data;
    } catch (e) {
        return null;
    }
}


