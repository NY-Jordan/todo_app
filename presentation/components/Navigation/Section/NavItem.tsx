import { useRouter } from 'next/router'
import React from 'react'
import { applyMiddleware } from 'redux';

export default function NavItem({title, icon, to} : {title : string, icon : React.ReactNode, to? : string}) {
  const router = useRouter();
  const url = router.pathname
  const handleClick = () => {
    if (to) {
      router.push(to);
    }
  }
  return (
    <a onClick={handleClick} className={'flex group space-x-3 items-center p-4 text-indigo-500 hover:cursor-pointer hover:text-white hover:bg-indigo-950 rounded-l-full rounded-r-lg '+ ( url  === to ? 'bg-indigo-950 text-white' : '')}>
        <span className={'text-black dark:text-white group-hover:text-white '+ (url  == to ? 'text-white' :'' )}>{icon} </span>
        <span className=' font-semibold  text-sm '>{title}</span>
    </a>
  )
}
