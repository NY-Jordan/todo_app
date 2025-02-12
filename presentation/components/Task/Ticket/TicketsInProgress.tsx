import React, { useEffect } from 'react'
import CustomButton from '../../button/CustomButton'
import TicketTypeCard from './TicketTypeCard'
import { ITask } from '@/domain/entities/task.entities'
import { fetchTaskTickets } from '@/Infrastructure/Services/Task/TicketService'
import { TicketStatusEnum } from '@/domain/enum/TicketStatusEnum'
import { useAppSelector } from '@/app/store/hook'
import { ITicket } from '@/domain/entities/ticket.entities'
import { TicketTypeEnum } from '@/domain/enum/TicketTypeEnum'
import { TicketType } from '@/domain/enum/TicketEnum'

export default function TicketsInProgress({active, setActive, task}: {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, task : ITask}) {
    const ticketState = useAppSelector(state => state.tickets).fetchTicketsInProgress

    useEffect(() => {
        if (active) {
          fetchTaskTickets(task.id, TicketStatusEnum.IN_PROGRESS)
        }
      }, [active])
      
  return (
    <>
       <div className="flex  items-center justify-between">
            <label className=" flex space-x-3 items-center">
                <span className="label ">All</span>
                <input type="radio" name="type" defaultChecked className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Sub Tasks</span>
                <input type="radio" name="type"  className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Bugs</span>
                <input type="radio" name="type"  className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Improvment</span>
                <input type="radio" name="type"  className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Story</span>
                <input type="radio" name="type"  className="radio radio-sm" />
            </label>
            <CustomButton text="New Ticket" onClick={() => setActive(false)} />
        </div>
        <div className="flex flex-col mt-7 space-y-5">
            {
                ticketState.data.tickets ? 
                (ticketState.data.tickets.length ? 
                    ticketState.data.tickets.map((ticket : ITicket) => {
                            return <TicketTypeCard type={ticket.type.name as TicketType} text={ticket.title} />
                    }) : <></>
                ) 
                : <div className='w-full h-full flex justify-center items-center'><span className="loading loading-dots loading-md"></span> </div>
            }
        </div>
    </>
  )
}
