import React from 'react'
import SideMenu from '../components/SideMenu'
import Menu from '../components/Menu'

export default function Layout({children, pageTitle} : {children : React.ReactNode, pageTitle? : string}) {
  return (
    <div className=' h-screen w-full flex'>
      <div className="bg-white flex overflow-y-hidden  w-full">
            <SideMenu />
            <div className='lg:w-[87%] w-full p-4 overflow-y-auto h-full'>
                <Menu pageTitle={pageTitle} />
                <div className="divider"></div>
                {children}
            </div>
      </div>
    </div>
  )
}
