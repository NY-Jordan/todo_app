import React, { useEffect, useState } from 'react'
import CustomButton from '../../button/CustomButton'
import TicketTypeCard from './TicketTypeCard'
import { ITask } from '@/domain/entities/task.entities'
import { fetchTaskTickets } from '@/Infrastructure/Services/Task/TicketService'
import { TicketStatusEnum } from '@/domain/enum/TicketStatusEnum'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { ITicket } from '@/domain/entities/ticket.entities'
import { TicketTypeEnum } from '@/domain/enum/TicketTypeEnum'
import { TicketType } from '@/domain/enum/TicketEnum'
import { fetchTicketInit } from '@/app/Actions/TicketsAction'
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum'

export default function TaskTicketsInProgress({active, setActive, task}: {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, task : ITask}) {
    const ticketState = useAppSelector(state => state.tickets).fetchTicketsInProgress
    const [tikcketTypeSelected, setTikcketTypeSelected] = useState<TicketType|undefined>(undefined)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (active) {
            dispatch(fetchTicketInit(TicketStatusEnum.IN_PROGRESS))
            fetchTaskTickets(task.id, TicketStatusEnum.IN_PROGRESS, tikcketTypeSelected)
        }
      }, [active, tikcketTypeSelected])

      const [activeTicketId, setActiveTicketId] = useState<number | null>(null);

        const toggleDescription = (ticketId: number) => {
            setActiveTicketId(activeTicketId === ticketId ? null : ticketId);
        };


        function handleChangeType(e : React.ChangeEvent<HTMLInputElement>) {
            const val = e.target.value as unknown
            const value  = val as TicketType|undefined
            setTikcketTypeSelected(value)
        }
      
  return (
    <>
       <div className="flex  items-center justify-between flex-wrap mt-5">
            <label className=" flex space-x-3 items-center">
                <span className="label ">All</span>
                <input type="radio" onChange={handleChangeType} value={undefined}   name="type_progress" defaultChecked className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Sub Tasks</span>
                <input type="radio" value={TicketType.SUBTASK} onChange={handleChangeType} name="type_progress"  className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Bugs</span>
                <input type="radio" value={TicketType.BUG} name="type_progress"  onChange={handleChangeType} className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Improvment</span>
                <input type="radio" name="type_progress" value={TicketType.IMPROVEMENT} onChange={handleChangeType} className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Story</span>
                <input type="radio" name="type_progress" value={TicketType.STORY} onChange={handleChangeType} className="radio radio-sm" />
            </label>
            <CustomButton text="New Ticket" onClick={() => setActive(false)}  />
        </div>
        <div className="flex flex-col mt-7 space-y-5 w-fullv h-full">
            {

               (!(StatusStateEnum.loading === ticketState.status) ? 
                (ticketState.data.tickets && ticketState.data.tickets.length ? 
                    ticketState.data.tickets.map((ticket : ITicket) => {
                            return <TicketTypeCard ticket={ticket} type={ticket.type.name as TicketType} text={ticket.title}  activeTicketId={activeTicketId}
                            toggleDescription={toggleDescription} />
                    }) : <div className='w-full h-full justify-center items-center text-red-700 text-center'>Ticket(s) not found</div>
                ) 
                : <div className='w-full h-full flex justify-center items-center'><span className="loading loading-dots loading-md"></span> </div>)
            }
        </div>
    </>
  )
}
