import React from 'react'
import CustomButton from '../../button/CustomButton'
import TicketTypeCard from './TicketTypeCard'

export default function TicketsInProgress({setActive}: {setActive : React.Dispatch<React.SetStateAction<boolean>>}) {
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
            
            <TicketTypeCard text="Sub Task" type="sub" />
            <TicketTypeCard type="bug" text="Bug ticket" />
            <TicketTypeCard type='improvement' text="Improvment ticket" />
            <TicketTypeCard type='story' text="Story ticket" />
        </div>
    </>
  )
}
