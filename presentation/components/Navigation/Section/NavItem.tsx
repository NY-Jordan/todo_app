import { useRouter } from 'next/router'
import React from 'react'

export default function NavItem({title, icon, to} : {title : string, icon : React.ReactNode, to? : string}) {
  const router = useRouter();
  return (
    <label onClick={() => to ? router.push(to) : ''} className='flex space-x-3 items-center p-4 text-indigo-500 hover:cursor-pointer hover:text-white hover:bg-indigo-950 rounded-l-full rounded-r-lg'>
        {icon} 
        <span className=' font-semibold  text-sm '>{title}</span>
    </label>
  )
}
