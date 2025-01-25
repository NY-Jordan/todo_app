import { UserDetailsEntitie } from '@/domain/entities/user.entities';
import React, { useEffect, useState } from 'react'

export default function useAuth() {
    const [user, setUser] = useState<UserDetailsEntitie>();

    useEffect(() => {
        const user  = localStorage.getItem('user')
        if (user) {
            const userDetails  = JSON.parse(user) as UserDetailsEntitie
            setUser(userDetails)
        }
        

    }, []);

  return {
    user
  }
}
