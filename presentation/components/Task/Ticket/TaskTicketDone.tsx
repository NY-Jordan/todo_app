import React, { useEffect } from 'react'
import CustomButton from '../../button/CustomButton'
import TicketTypeCard from './TicketTypeCard'
import { ITask } from '@/domain/entities/task.entities'
import { TicketStatusEnum } from '@/domain/enum/TicketStatusEnum'
import { fetchTaskTickets } from '@/Infrastructure/Services/Task/TicketService'

export default function TaskTicketDone({active, setActive, task}: {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, task : ITask}) {
    useEffect(() => {
            if (active) {
              fetchTaskTickets(task.id, TicketStatusEnum.DONE)
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
            
            
        </div>
    </>
  )
}
