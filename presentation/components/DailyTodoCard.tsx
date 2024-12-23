import { faFilter, faSort , faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import DailyTaskITem from './DailyTaskITem'

export default function DailyTodoCard() {
  return (
    <div className=' mb-4 w-2/3 bg-white border rounded-sm px-5 pb-2 pt-4  '>
      <div className='  max-h-[10%]  w-full flex items-center justify-between'>

        <div>
          <h4 className='text-2xl font-bold'>To do</h4>
          <div>
            <span className='text-gray-500'>Task assigned to me</span>
          </div>
        </div>

        <div className='flex items-center'>
          <label className="input input-bordered  flex items-center h-10 rounded-md">
            <input type="text" className="grow rounded-full" placeholder="Search tasks" />
            <svg
                height={30}
                width={30}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
          <div className='flex  items-center mx-3'>
            <FontAwesomeIcon icon={faFilter} size='xs' />
            <h5 className='text-gray-600 text-sm ml-1'>35 tasks</h5>
          </div>
          <a className='flex  items-center text-indigo-500 hover:cursor-pointer mx-3'>
            <FontAwesomeIcon icon={faSort} size='xs' />
            <h5 className=' text-sm ml-1'>sorting</h5>
          </a>
        </div>
      </div>
      <div className='h-[75%] scrollbar-rounded scrollbar-hidden hover:scrollbar-hover  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-white'>
        <DailyTaskITem />
        <DailyTaskITem />
        <DailyTaskITem />
        <DailyTaskITem />
        <DailyTaskITem />
        <DailyTaskITem />
        <DailyTaskITem />
        <DailyTaskITem />
      </div>
      <div className='mt-2'>
          <a className='flex items-center font-bold text-indigo-700  space-x-3'>
            <FontAwesomeIcon icon={faPlus} size='xs' />
            <span className='text-sm'>Add new task</span>
          </a>
      </div>
    </div>
  )
}
