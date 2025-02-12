import React, { useState } from 'react'
import {motion} from 'framer-motion' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBook, faBug, faCheckSquare, faClose, faEllipsisH, faIndent, faLightbulb, faMagic, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { type } from 'node:os';
import { TicketType } from '@/domain/enum/TicketEnum';

type TicketTypeCardProps = {
    type : TicketType,
    text : string
}

export default function TicketTypeCard({type, text} : TicketTypeCardProps) {
    const [moreActions, setMoreActions] = useState(false)
   
  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }}  transition={{ type: "spring", stiffness: 300, damping: 10 }} className="w-full  flex justify-between  min-h-16  ">
        <motion.div animate={{ width : moreActions ? '70%' : '100%' }} className=' flex items-center  justify-between px-3 rounded-md border hover:cursor-pointer shadow-md '>
            <div className='flex space-x-4 '>
                <div className=" text-red-500 tooltip" data-tip={type}>
                    {
                    type === TicketType.BUG ? <FontAwesomeIcon icon={faBug} size="lg" /> : 
                    (type === TicketType.STORY ? <FontAwesomeIcon icon={faBook} size="lg" /> : 
                    (type === TicketType.SUBTASK ? <FontAwesomeIcon icon={faIndent} size="lg" /> :
                (type === TicketType.IMPROVEMENT ? <FontAwesomeIcon icon={faLightbulb} size="lg" /> :
                    <></>))  )
                }
                </div>
                <p>{text} </p>
            </div>
            <div >
               {!moreActions ? <a onClick={() => setMoreActions(true)} className='p-2 hover:bg-gray-200 rounded-full'>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </a> : <a onClick={() => setMoreActions(false)} className='p-2 hover:bg-gray-200 rounded-full'>
                    <FontAwesomeIcon icon={faClose} />
                </a>}
            </div>
        </motion.div>
        <motion.div  animate={{ width : moreActions ? '30%' : '0%', opacity : moreActions ? 1 : 0, visibility : moreActions ? 'visible' : 'hidden' }} className=' flex rounded-md  border '>
            <div className='w-[33%] bg-red-500 flex flex-col items-center justify-center hover:cursor-pointer text-white tooltip' data-tip='delete'>
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete</span>
            </div>
            <div className='w-[33%] bg-green-500 flex flex-col items-center hover:cursor-pointer justify-center text-white tooltip' data-tip='done'>
                <FontAwesomeIcon icon={faCheckSquare} />
                <span>Done</span>
            </div>
            <div className='w-[34%] bg-gray-500 flex flex-col items-center hover:cursor-pointer justify-center text-white tooltip' data-tip='edit'>
                <FontAwesomeIcon icon={faPencil} />
                <span>Edit</span>
            </div>
        </motion.div>
        </motion.div>
    </>
  )
}
