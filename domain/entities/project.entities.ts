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