import { mdiDotsVertical, mdiMore, mdiPlus, mdiStarThreePoints } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useState } from 'react'
import AddTask from './AddTask'
type props = {
    showMoreButton? : boolean,
    name: string,
    count : number
}
export default function SectionTaskHeader({showMoreButton, name, count}  : props) {
  const [showAddTask, setShowAddTask] = useState(false);
  return (
    <div>
      <div className='flex flex-row justify-between' >
        <div className='flex flex-col'>
            <h5>{name}</h5>
            <div className=' text-sm text-gray-500'>{count} task(s)</div>
        </div>
        <div className='flex flex-row  items-center space-x-2'>
            {
                showMoreButton &&
                <button onClick={() => setShowAddTask(true)} className="btn bg-indigo-950 btn-square hover:bg-indigo-950 rounded-full	"> 
                <Icon 
                path={mdiPlus}
                color={"white"}
                size={3/2}
                />
                 </button>
            }
             <a href='#' className='hover:bg-gray-200 rounded'>
             <Icon 
            path={mdiDotsVertical}
            size={3/3}
            />
             </a>
        </div>
      </div>
      <AddTask active={showAddTask} />
    </div>
  )
}
