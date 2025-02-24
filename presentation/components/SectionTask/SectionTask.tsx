import React, { SetStateAction, useEffect, useState } from 'react'
import SectionTaskHeader from './SectionTaskHeader'
import SectionTaskCard from './SectionTaskCard'
import { Reorder } from 'framer-motion'
import AddTask from './AddTask'
import { useResponsive } from '@/Infrastructure/hooks/useResponsive'
import { TaskPhasesEnum } from '@/domain/enum/TaskEnum'
import { ITask } from '@/domain/entities/task.entities'
import { useAppSelector } from '@/app/store/hook'
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum'
import TaskTicketManagement from '../Task/Ticket/TaskTicketManagement'
type props = {
    showMoreButton? : boolean,
    name: string,
    data : ITask[]    
}

export default function SectionTask({showMoreButton, name, data}  : props) {
 
  const initialItems  =  data;
    const [items, setItems] = useState(initialItems);
    const {isTabletOrMobile, isSM} = useResponsive();
    const [ticketsModal, setTicketsModal] = useState(false);
    const [taskTicket, setTaskTicket] = useState<ITask|undefined>(undefined);
    const fetchCollaboratorTasksState = useAppSelector(state => state.task).collaboratorsTasks
    useEffect(() => {
      setItems(data);
    }, [data]);


  return (
    <div style={{  width : isSM ? "100%" : "24%", }} >
      <SectionTaskHeader count={data.length} showMoreButton={showMoreButton}  name={name} />
        <Reorder.Group 
        axis="y" 
        style={{ marginTop : isSM ? '0%': "10%",  }} 
        layoutScroll 
        onReorder={setItems} 
        values={items}>
          {fetchCollaboratorTasksState.status === StatusStateEnum.loading ? <div className='flex justify-center'>
            <span className="loading loading-spinner loading-xs flex self-center"></span>
          </div>
 :  ( items.length ? items.map((item, key) => (
             <Reorder.Item  drag  key={item.id}  dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }} value={item} id={item.id.toString()} >
                <SectionTaskCard setTaskTicket={setTaskTicket} setTicketsModal={setTicketsModal}  position={key}  color={name === TaskPhasesEnum.Backlog ? 'gray' : (
                  name === TaskPhasesEnum.Started ? 'blue' : (name === TaskPhasesEnum.InReview ? 'orange' : 'green' )
                )}  item={item} />
             </Reorder.Item>

          ))  : <div className='text-red-600 text-center text-xs'>--Empty--</div>)} 
        </Reorder.Group>
        {taskTicket && <TaskTicketManagement  active={ticketsModal} setActive={setTicketsModal} task={taskTicket} />}
    </div>
  )
}
