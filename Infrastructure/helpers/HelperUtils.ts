import { UserDetailsEntitie } from "@/domain/entities/user.entities";


export async function   getBearerAuthToken () {
    const token = await  localStorage.getItem('token');
    return `Bearer ${token}`
}

export  function getCurrentUser() : object|null {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem('user');
        if (user) {
            const userDetails  = JSON.parse(user) as UserDetailsEntitie
            if (typeof userDetails === 'object') {
                return   userDetails
            }
        }
    }
   
   return null;
  }
  

