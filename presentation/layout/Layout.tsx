import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu'
import Menu from '../components/Menu'
import { useAppSelector } from '@/app/store/hook';

export default function Layout({children, pageTitle} : {children : React.ReactNode, pageTitle? : string}) {

  const darkMode = useAppSelector(state => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className='h-full w-full flex overflow-y-hidden overflow-x-hidden '>
      <div className="bg-white h-screen flex overflow-y-hidden  w-full">
            <SideMenu />
            <div className='lg:w-[87%] dark:bg-slate-800 overflow-y-auto overflow-x-hidden  w-full  pt-4  h-full your-scroll-container'>
                <Menu pageTitle={pageTitle} />
                <div className='bg-gray-50  dark:bg-black  p-4 h-full dark:border-t-0 border-t-2'>{children}</div>
            </div>
      </div>
    </div>
  )
}
