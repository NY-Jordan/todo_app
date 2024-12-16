import React from 'react'
import SideMenu from '../components/SideMenu'
import Menu from '../components/Menu'

export default function Layout({children, pageTitle} : {children : React.ReactNode, pageTitle? : string}) {
  return (
    <div className='h-full w-full flex overflow-y-hidden '>
      <div className="bg-white flex overflow-y-hidden  w-full">
            <SideMenu />
            <div className='lg:w-[87%]   w-full  pt-4 scrollbar-rounded scrollbar-hidden hover:scrollbar-hover  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500   h-full'>
                <Menu pageTitle={pageTitle} />
                <div className="bg-gray-50 divider mb-0 pb-0"></div>
                <div className='bg-gray-50 p-4 h-full'>{children}</div>
            </div>
      </div>
    </div>
  )
}
