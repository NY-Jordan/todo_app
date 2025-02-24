import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBook, faBug, faCheckSquare, faChevronDown, faChevronUp, faClose, faEllipsisH, faIndent, faLightbulb, faMagic, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { type } from 'node:os';
import { TicketType } from '@/domain/enum/TicketEnum';
import CustomButton from '../../button/CustomButton';
import classNames from 'classnames';
import { changeTaskTicketStatus, deleteTaskTicket } from '@/Infrastructure/Services/Task/TicketService';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';
import { changeTicketStatusInit, deleteTicketInit, deleteTicketReset, updateTicketInit } from '@/app/Actions/TicketsAction';
import { ITicket } from '@/domain/entities/ticket.entities';
import toast from 'react-hot-toast';
import { error } from 'console';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { convertToLocalDate } from '@/Infrastructure/helpers/utils';
import { TicketStatusEnum } from '@/domain/enum/TicketStatusEnum';

type TicketTypeCardProps = {
    type : TicketType,
    text : string,
    ticket : ITicket,
    activeTicketId: number | null;
    toggleDescription: (ticketId: number) => void;

}

export default function TicketTypeCard({type, text, ticket, activeTicketId, toggleDescription} : TicketTypeCardProps) {
    const [moreActions, setMoreActions] = useState(false);
    const dispatch = useAppDispatch()
    const deleteTicketState = useAppSelector(state => state.tickets).delete
    const changeTicketStatusState = useAppSelector(state => state.tickets).changeStatus
    const [showDescription, setShowDescription] = useState(false);
    
    useEffect(() => {
        if (deleteTicketState.status === StatusStateEnum.success || changeTicketStatusState.status === StatusStateEnum.success) {
            setMoreActions(false);
        }
    }, [deleteTicketState.status, changeTicketStatusState.status])
    
  return (
    <>
        <div>
            <motion.div whileHover={{ scale: 1.03 }}  transition={{ type: "spring", stiffness: 300, damping: 15 }} className="w-full  flex justify-between  min-h-16  ">
                <motion.div initial={{ width : '100%' }} animate={{ width : moreActions ? '70%' : '100%' }}  className=' flex items-center  justify-between px-3 rounded-md border  bg-white shadow-md '>
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
                        <p className='text-center'>{text}  {
                            activeTicketId === ticket.id ?
                            <a className='hover:cursor-pointer hover:bg-gray-100 p-1 rounded-full' onClick={() => toggleDescription(ticket.id)} ><FontAwesomeIcon size='sm' icon={faChevronUp} /></a> : 
                            <a className='hover:cursor-pointer hover:bg-gray-100 p-1 rounded-full' onClick={() => toggleDescription(ticket.id)}><FontAwesomeIcon size='sm' icon={faChevronDown} /></a>
                            }</p>
                    </div>
                    <div >
                        <span className='mr-4 text-xs text-gray-300 hover:text-gray-600'>{convertToLocalDate(ticket.updated_at, 'DD MMMM  YYYY, hh:mm a')}</span>
                    {!moreActions ? <a onClick={() => setMoreActions(true)} className='p-2 hover:bg-gray-200 rounded-full'>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </a> : <a onClick={() => setMoreActions(false)} className='p-2 hover:bg-gray-200 rounded-full'>
                            <FontAwesomeIcon icon={faClose} />
                        </a>}
                    </div>
                </motion.div>
                <motion.div initial={{ width : '0%', opacity : 0, visibility : 'hidden' }}  animate={{ width : moreActions ? '30%' : '0%', opacity : moreActions ? 1 : 0, visibility : moreActions ? 'visible' : 'hidden' }} className=' flex rounded-md  border '>
                
                    <CustomButton 
                        loader={deleteTicketState.status === StatusStateEnum.loading} 
                        onClick={() => {
                            dispatch(changeTicketStatusInit());
                            deleteTaskTicket(ticket.id)
                        }} text='delete' 
                        btnClassName='w-[33%] h-full bg-red-500 hover:bg-red-500 hover:border-red-500 flex flex-col items-center justify-center hover:cursor-pointer text-white tooltip border-red-500 rounded-none shadow-none flex-col' 
                        icon={<FontAwesomeIcon icon={faTrash} />} />
                    {ticket.status.name === TicketStatusEnum.DONE ? <CustomButton onClick={() => {
                        dispatch(updateTicketInit())
                        changeTaskTicketStatus(ticket.id, TicketStatusEnum.IN_PROGRESS)
                    }} text='In Progress' 
                    btnClassName='w-[33%] h-full bg-orange-500 hover:bg-orange-500 hover:border-orange-500 flex flex-col items-center justify-center hover:cursor-pointer text-white tooltip border-orange-500 rounded-none shadow-none flex-col' icon={<FontAwesomeIcon icon={faCheckSquare} />}
                     /> : 
                     <CustomButton onClick={() => {
                        dispatch(updateTicketInit())
                        changeTaskTicketStatus(ticket.id,  TicketStatusEnum.DONE  )
                    }} text='Done' 
                    btnClassName='w-[33%] h-full bg-green-500 hover:bg-green-500 hover:border-green-500 flex flex-col items-center justify-center hover:cursor-pointer text-white tooltip border-green-500 rounded-none shadow-none flex-col' icon={<FontAwesomeIcon icon={faCheckSquare} />}
                     /> }
                    <CustomButton text='Edit' btnClassName='w-[33%] h-full bg-gray-500 hover:bg-gray-500 hover:border-gray-500 flex flex-col items-center justify-center hover:cursor-pointer text-white tooltip border-gray-500 rounded-none shadow-none flex-col' icon={<FontAwesomeIcon icon={faPencil} />} />
                </motion.div>
            </motion.div>
            <motion.div className='bg-white px-3 mt-3 overflow-hidden' initial={{ height : 0, opacity : 0 }} animate={{  height : activeTicketId === ticket.id ? 'fit-content' : 0, opacity :  activeTicketId === ticket.id  ? 1 : 0 }} >
                <p dangerouslySetInnerHTML={{ __html : ticket.description}} />
            </motion.div>
        </div>
    </>
  )
}
