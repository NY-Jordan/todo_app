import React from 'react'
import Tag from '../Tag'
import { mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import ReminderDateModal from '../AddTask/ReminderDateModal'

export default function AddTaskDetails() {
  return (
    <div>
        <div className='flex flex-row justify-between '>
                
            <div >
                <div className='link text-sm link-primary'>
                    <a href='#' >
                        <label htmlFor='files_attached'>
                            3 files attached
                        </label>
                        
                    </a>
                </div>
            </div>
            <div className='flex flex-row mb-2' >
                
                

                <div className='font-bold  text-blue-500 text-sm mr-2'>Reminder date  : </div>
                <div className='font-bold   text-sm '> 05 decembre 2023</div>
                    <a href='#' style={{ cursor : "pointer" }}  className='hover:bg-gray-200 ml-2 rounded-xl '>
                        <label htmlFor="reminder_date" >
                            <Icon
                            path={mdiPencil}
                            color={'black'}
                            size={3/4}
                            />
                        </label>
                    </a>
            </div>
        </div>
        <div className='flex flex-row justify-between '>
            <div >
                <div className='font-bold   text-sm text-blue-400'>Tag(s)</div>
                </div>
        </div>
        <div className='grid mb-6 mt-2  grid-cols-4  gap-2'>
            <Tag text='back-end'/>
            <Tag text='front-end' />
            <Tag text='full-stack' />
            <Tag text='full-stack' />
            <Tag text='full-stack' />
            <Tag text='full-stack' />
            <Tag text='full-stack' />
            
        </div>
    </div>
  )
}
