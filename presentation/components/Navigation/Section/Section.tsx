import React, { ReactNode } from 'react'
import localFont from "next/font/local";

export default function Section({title, children} : {title : string, children : React.ReactNode}) {
   
    return (
      <div>
        <div>
          <span className='text-gray-600'>{title}</span>
        </div>
        <div className=' py-5'>
          {children}
        </div>
      </div>
    )
  }
  