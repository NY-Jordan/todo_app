import { Reorder, delay } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { mdiBookEdit, mdiChevronLeft, mdiChevronRight, mdiDelete, mdiDotsVertical, mdiPlus, mdiTagEdit } from '@mdi/js';
import Icon from '@mdi/react';
import { ITask } from '@/domain/entities/task.entities';
import TaskTicketManagement from '../Task/Ticket/TaskTicketManagement';
import { TaskPhasesEnum } from '@/domain/enum/TaskEnum';
import { getNextTaskPhase, getPreviousTaskPhase } from '@/Infrastructure/helpers/utils';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { initChangeTaskPhaseState, resetChangeTaskPhaseState } from '@/app/Actions/TaskActions';
import { changeTaskPhase } from '@/Infrastructure/Services/Task/TaskService';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';


export default function SectionTaskCard({ item, position, color, setTicketsModal, setTaskTicket} :  { item : ITask, position : number, color : string, setTicketsModal : React.Dispatch<React.SetStateAction<boolean>>, setTaskTicket : React.Dispatch<React.SetStateAction<ITask | undefined>>}) {
    const top = (position * 50);
    const [showViewMoreButton, setShowViewMoreButton] = useState(false);
    const dispatch  =  useAppDispatch();
    const changeTaskPhaseState = useAppSelector(state => state.task).change_status;
    const animation = {
        height: "100%",
        scale : 1,
        bottom : top +20,
        cursor : "pointer",
        transition: { duration: 0.5},
    }

    const buttonVariants = {
        hidden: { 
            visibility: 'hidden' ,
            transition: { duration : 0.1 },

        },
        visible: {
          visibility: 'visible',
          transition: { delay: 0.4 },
        },
      };

    const nextPhase = (phase : TaskPhasesEnum) => {
        const nextPhase = getNextTaskPhase(phase);
        if (!nextPhase) {
           toast.error("Can't process this action");
           return ;
        }
        dispatch(initChangeTaskPhaseState());
        changeTaskPhase(item.id,phase, nextPhase);
    }

    const previousPhase = (phase : TaskPhasesEnum) => {
        const nextPhase = getPreviousTaskPhase(phase);
        if (!nextPhase) {
           toast.error("Can't process this action");
           return ;
        }
        dispatch(initChangeTaskPhaseState());
        changeTaskPhase(item.id,phase, nextPhase);
    }

    useEffect(() => {
        if (changeTaskPhaseState.status === StatusStateEnum.success && changeTaskPhaseState.task.id === item.id) {
            toast.success('Change phase action  completed')
            dispatch(resetChangeTaskPhaseState())
        }
        if (changeTaskPhaseState.status === StatusStateEnum.failure && changeTaskPhaseState.task.id === item.id) {
            toast.success('Change phase action  failed')
            dispatch(resetChangeTaskPhaseState())
        }
    }, [changeTaskPhaseState.task]);
     
  return (
    <>
        <motion.div  
             onMouseEnter={() => setShowViewMoreButton(true)}
             onMouseLeave={() => setShowViewMoreButton(false)}
             whileHover={animation }
             whileFocus={animation}
           
            className={"card my-2  dark:bg-slate-800 relative  z-1/2  dark:hover:bg-slate-900 dark:shadow-slate-700  dark:border-slate-800 dark:text-white  h-40 border-2 bg-base-100 shadow-md "} style={{ bottom  : top }}>
            <div className='card-title m-0 p-0 justify-between'>
                <span  style={{ backgroundColor : color }} className=" ml-4 rounded-sm mt-2 p-2"></span>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className=" m-1">
                        <a href='#' className='hover:bg-gray-200 rounded'>
                            <Icon 
                            path={mdiDotsVertical}
                            size={3/4}
                            color={'black'}
                            />
                        </a>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
                        <li>
                            <a href='#'><Icon path={mdiPlus} size={3/4} color={'black'} />New Comment</a>
                        </li>
                        <li>
                            <a href='#' onClick={() => {setTicketsModal(true) ; setTaskTicket(item)}}><Icon path={mdiPlus} size={3/4} color={'black'}  />Add a ticket</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card-body pb-0">
                <h2 className="text-md font-bold">{item.title}</h2>
                <p className='p-2'>{item.breifing}</p>
                <div className="card-actions justify-end">
                <motion.button variants={buttonVariants} initial="hidden" animate={showViewMoreButton ? "visible" : "hidden"} className={"btn  btn-primary "}>View More</motion.button>
               
                </div>
            </div>     
            <div className='flex   flex-row p-2 items-center justify-between'>
                    <a href='#' onClick={() => previousPhase(item.task_phase.name)} className={(showViewMoreButton ? 'hover:bg-gray-200 rounded-full relative bottom-32 right-2' : 'invisible')}><Icon path={mdiChevronLeft} size={1} color={'gray'} /></a>
                    <a href='#' onClick={() => nextPhase(item.task_phase.name)} className={showViewMoreButton ? 'hover:bg-gray-200 rounded-full  relative bottom-32 left-2' : 'invisible'}><Icon path={mdiChevronRight} size={1} color={'gray'} /></a>
            </div>  
        </motion.div>
    </>
    
  )
}
