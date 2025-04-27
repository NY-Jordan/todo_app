import React, { SetStateAction, useEffect, useState } from 'react'
import SectionTaskHeader from './SectionTaskHeader'
import SectionTaskCard from './SectionTaskCard'
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import AddTask from './AddTask'
import { useResponsive } from '@/Infrastructure/hooks/useResponsive'
import { TaskPhasesEnum } from '@/domain/enum/TaskEnum'
import { ITask } from '@/domain/entities/task.entities'
import { useAppSelector } from '@/app/store/hook'
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum'
import TaskTicketManagement from '../Task/Ticket/TaskTicketManagement'
import { useDroppable } from '@dnd-kit/core'
import DroppableArea from './DroppableArea'
import { data } from '../../../Infrastructure/data/data';
type props = {
    showMoreButton? : boolean,
    name: string,
    id : TaskPhasesEnum,
    showTaskFooter? : boolean
    tasks : ITask[]    
}

export default function SectionTask({showMoreButton, name, id,tasks, showTaskFooter}  : props) {
 
  const initialItems  =  tasks;
    const [items, setItems] = useState(initialItems);
    const {isTabletOrMobile, isSM} = useResponsive();
    const [ticketsModal, setTicketsModal] = useState(false);
    const [taskTicket, setTaskTicket] = useState<ITask|undefined>(undefined);
    const fetchCollaboratorTasksState = useAppSelector(state => state.task).collaboratorsTasks
    useEffect(() => {
      setItems(tasks);
    }, [tasks]);

    const [sectionIsOver, setSectionIsOver] = useState(false);

    const { setNodeRef, isOver, over, active } = useDroppable({
      id : id,
      
    });
    
    useEffect(() => {
      if (!(over?.id === id)) {
        setSectionIsOver(false);
        return ;
      }
      if (over && active?.data.current?.previousPhase !== over.id) {
        setSectionIsOver(isOver);
      }
    }, [isOver])

    

  return (
    <motion.div   style={{  width :  "100%" }} className=' h-full'  ref={setNodeRef}  >
      <SectionTaskHeader count={tasks.length} showMoreButton={showMoreButton}  name={name} />
       
          {fetchCollaboratorTasksState.status === StatusStateEnum.loading ?
          
          <div className='flex justify-center'>
            <span className="loading loading-spinner loading-xs flex self-center"></span>
          </div>
 :  
          <>
            <DroppableArea active={sectionIsOver} />

            {
               items.length ? items.map((item, key) => {
                 return (
                  <div >
                
                      <SectionTaskCard showFooter={showTaskFooter} setTaskTicket={setTaskTicket} setTicketsModal={setTicketsModal}  position={key}  color={name === TaskPhasesEnum.Backlog ? 'gray' : (
                        name === TaskPhasesEnum.Started ? 'blue' : (name === TaskPhasesEnum.InReview ? 'orange' : 'green' )
                      )}  item={item} />
                  </div>
    
                )
               }) 
                : 
               <>
              {  !sectionIsOver &&  <div className='text-red-600 text-center text-xs'>--Empty--</div>}
               </>
            }
          </>} 
        {taskTicket && <TaskTicketManagement  active={ticketsModal} setActive={setTicketsModal} task={taskTicket} />}
    </motion.div>
  )
}
