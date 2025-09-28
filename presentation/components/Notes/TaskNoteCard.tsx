import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Tag from '../Tag/Tag'
import { TaskTypeEnum } from '@/domain/enum/TaskEnum'
import { ITask } from '@/domain/entities/task.entities'

export default function TaskNoteCard({task, noteId} : {task : ITask, noteId}) {
  return (
    <div
        className='p-3 group bg-gray-100 flex justify-between items-center rounded-md hover:bg-gray-200 cursor-pointer transition'
        >
        <div className='flex flex-col  w-[80%]'>
            <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
                <h4 className='text-lg font-semibold'>{task.title}</h4>
                {task.type.name === TaskTypeEnum.OWN && (
                <span className='bg-orange-400 px-2 py-1 rounded-full text-white text-xs'>daily</span>
                )}
                <Tag className='text-xs' status text={task.task_phase.name}  />
            </div>
            </div>
            <p className='text-sm text-gray-600 mt-1'>
            {task.breifing && task.breifing.length > 80
                ? `${task.breifing.slice(0, 80)}...`
                : task.breifing}
            </p>
        </div>
        <div>
            <a
            data-tip='Link'
            className='text-blue-500 hover:bg-gray-300 p-1 rounded-full tooltip group-hover:block hidden'
            >
            <FontAwesomeIcon icon={faLink} />
            </a>
        </div>
        </div>
  )
}
