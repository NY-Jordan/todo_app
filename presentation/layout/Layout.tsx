import React from 'react'
import SideMenu from '../components/SideMenu'
import Menu from '../components/Menu'

export default function Layout({children, pageTitle} : {children : React.ReactNode, pageTitle? : string}) {
  return (
    <div className='h-full w-full flex overflow-y-hidden overflow-x-hidden '>
      <div className="bg-white h-screen flex overflow-y-hidden  w-full">
            <SideMenu />
            <div className='lg:w-[87%]  overflow-y-auto overflow-x-hidden  w-full  pt-4  h-full your-scroll-container'>
                <Menu pageTitle={pageTitle} />
                <div className='bg-gray-50 p-4 h-full border-t-2'>{children}</div>
            </div>
      </div>
    </div>
  )
}
