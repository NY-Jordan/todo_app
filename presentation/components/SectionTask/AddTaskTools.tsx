import { mdiFileEdit, mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

export default function AddTaskTools() {
  return (
    <div className='flex flex-row justify-between w-full'>
        <div className='mt-4 flex flex-row items-center space-x-2'>
            <button className="btn  btn-xs bg-blue-500 btn-square hover:bg-blue-400 rounded-lg	"> 
            <Icon 
            path={mdiPlus}
            color={"white"}
            size={1}
            />
            </button>
            <p className='text-sm text-blue-800'>Add a tag</p>
        </div>
        <div className='mt-4 flex flex-row items-center space-x-2'>
           
                <label htmlFor="reminder_date" className="btn  btn-xs bg-blue-500 btn-square hover:bg-blue-400 rounded-lg	">
                    <Icon 
                    path={mdiPlus}
                    color={"white"}
                    size={1}
                    />
                </label>
            
            <p className='text-sm text-blue-800'>Add a reminder date</p>
        </div>
        <div className='mt-4 flex flex-row items-center space-x-2'>
            <button className="btn  btn-xs bg-blue-500 btn-square hover:bg-blue-400 rounded-lg	"> 
            <Icon 
            path={mdiFileEdit}
            color={"white"}
            size={1}
            />
            </button>
            <p className='text-sm text-blue-800'>Attach a file</p>
        </div>
    </div>
  )
}
