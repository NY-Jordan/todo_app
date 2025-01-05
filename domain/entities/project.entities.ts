export interface ICreateProject {
    name : string,
    logo : FileList|null

}



export interface IProject {
    id: number;
    name: string;
    logo: string;
    user_id: number;
    collaborators: number;
    is_admin: boolean;
    tasks: number;
    delivery_at: string | null; 
    created_at: string; 
    updated_at: string; 
}



export interface ProjectInvitationInterface {
    uuid : string,
    status : Status,
    project : {
        id : number,
        name : string
    },
    receiver : {
        id : number,
        email : string,
        picture : string,
        username : string
    },
    sender : {
        id : number,
        email : string,
        picture : string,
        username : string
    }
}


interface IPRojectUser {
    id: number;
    name: string;
    picture: string;
    email: string;
    email_verified_at: string | null;
    status_id: number;
    google_id: string | null;
    github_id: string | null;
    created_at: string;
    updated_at: string;
    is_admin: boolean;
  }
  
  interface Status {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
 export  interface IInvitation {
    id: number;
    uuid: string;
    project : IProject;
    sender: IPRojectUser;
    receiver: IPRojectUser;
    status: Status;
    created_at : string,
    updated_at : string
  }
  