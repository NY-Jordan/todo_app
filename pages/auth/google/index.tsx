import { useAppSelector } from '@/app/store/hook';
import { googleAuthCallback } from '@/Infrastructure/Services/Auth/LoginService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function index() {
    const loginState = useAppSelector(state => state.auth).login
    const router  = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const queryString = router.asPath.split('?')[1] || '';    

    useEffect(() => {
        googleAuthCallback(queryString)
    }, [])
    useEffect(() => {
        if (!loginState.status) return ;
    
        if (loginState.status) {
          router.push('/dashboard');
        }
        if (!loginState.status) {
            router.push('/auth/login');
        }
      }, [loginState.status]);

    if (isLoading) {
        return (
           <div className='h-screen  w-full flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>

          )
    } 
  
}
