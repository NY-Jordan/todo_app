export interface UserDetailsEntitie {
    id: number;
    username: string;
    email: string;
    picture: string;
}


export interface IUser {
    id: number;
    name: string;
    picture: string;
    email: string | null;
    email_verified_at: string | null;
    status: number;
    google_id: string | null;
    github_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface IUserAssigned {
    id: number;
    name: string;
    picture: string;
    email: string | null;
    email_verified_at: string | null;
    status: number;
    google_id: string | null;
    github_id: string | null;
    created_at: string;
    updated_at: string;
    schedule_at : string;
}


export interface IUserStats {
    projects : string,
    tasks : string,
    notes : string,
    links : string
}