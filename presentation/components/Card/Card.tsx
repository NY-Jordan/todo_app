import React, { useState } from 'react'

export default function Card({title, percent, icon} : {title : string, percent : string, icon? : React.ReactNode})  {

    const [showViewMoreButton, setShowViewMoreButton] = useState(false);
    const animation = {
        height: "100%",
        scale : 1,
        cursor : "pointer",
        transition: { duration: 0.5},
    }

     
  return (
   
        <div className={"card my-2 h-70  dark:bg-slate-800 rounded-sm bg-base-100 shadow-md dark:shadow-gray-800 "} >
            <div className="card-body">
                {icon}
                <h2 className="text-sm font-normal dark:text-white">{title}</h2>
                <div className='flex flex-row items-center w-full'>
                    <p className='text-3xl font-medium dark:text-white'>{percent}</p>
                </div>
                
            </div>     
        </div>
  )
}
