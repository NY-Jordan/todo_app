import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

export default function Tag({text} :  {text : string}) {
  return (
    <div className=' p-2 flex justify-center items-center  bg-blue-400 mx-2 btn-xs rounded-full '>
      <span className='text-white w-full font-bold'>{text} </span>
      <a href='#' className='relative -top-3 left-2 rounded-full bg-secondary'>
        <Icon 
        path={mdiClose}
        size={1/2}
        color={'white'}
        />
      </a>
      
    </div>
  )
}
