import { faEdit , faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function DailyTaskITem() {
  return (
    <>
    <div className="border-t  mt-4  "></div>

    <div className='flex  h-10 justify-between items-center my-4 group '>
      <div className='flex items-center space-x-3'>
        <input type="checkbox"  className="checkbox border-indigo-400 checkbox-xs peer" />
        <p className='text-sm text-gray-600  peer-checked:text-gray-400 peer-checked:line-through font-semibold'> Designing the dungeon</p>
        <span className=' border border-blue-400 w-fit font-bold  text-blue-600 text-[8px] py-1 px-2'>
            DRAFT
        </span>
      </div>

      <div className='flex items-center  justify-end  h-full'>
        <span className='text-xs '>12 Nov, 2024</span>
        <div className="border-l w-1  border-gray-500 mx-4 h-[50%]  group-hover:hidden"></div>
        <span className='text-xs font-bold group-hover:hidden '>12:23</span>
        <div className='space-x-1 mx-2 hidden group-hover:flex relative left-2 justify-end'>
            <a className='bg-slate-100 hover:cursor-pointer px-2 border rounded-md border-gray-300  text-gray-700 py-1/2'>
                <FontAwesomeIcon icon={faEdit} size='xs' />
            </a>
            <a className='bg-slate-100 px-2 border hover:cursor-pointer  rounded-md border-gray-300  text-red-700 py-1/2'>
                <FontAwesomeIcon icon={faTrash} size='xs' />
            </a>
        </div>
      </div>
    </div>
    </>
  )
}
