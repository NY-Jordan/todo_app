import React from 'react'
import CustomButton from '../button/CustomButton'
import { EventContentArg } from '@fullcalendar/core/index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { GoogleEventInterface } from '@/domain/entities/events.entities'
import { motion } from 'framer-motion';
import moment from 'moment'

export default function EventModalDetails({active, setActive, event, position} : {active : boolean, setActive  : React.Dispatch<React.SetStateAction<boolean>> , event : GoogleEventInterface, position : {x : number,  y : number} }) {
    console.log(event.attendees);
    
    return (
    <>
        <motion.div animate={{ left : `${position.x}px`, top  : `${position.y}px` }} className=" z-50  rounded-md  w-[500px] absolute px-4 bg-gray-200 shadow-md shadow-gray-500">
            <div className="w-full flex justify-end items-center ">
                <a onClick={() => setActive(false)}>
                    <FontAwesomeIcon icon={faClose}  />
                </a>
            </div>

            <div className="w-full my-4 ">
                <div className='flex justify-start space-x-2 h-fit'>
                    <div className='w-[8%] h-[20%]'>
                        <img src={'/images/small_logo.png'}  className='w-full h-full' />
                    </div>
                   <div className='h-fit'>
                        <div className='flex flex-col'>
                            <span className='text-2xl  text-black'>{event.summary}</span>
                            <div className='flex items-center space-x-3'>
                                <span>{moment(event.start.dateTime).format("MMMM D, YYYY, h:mma")}</span>
                                <span>-</span>
                                <span>{moment(event.end.dateTime).format("MMMM D, YYYY, h:mma")}</span>
                            </div>
                        </div>
                        <div className='flex items-center '>
                            <h4 className='font-bold'>TimeZone : </h4>
                            <span>{event.start.timeZone}</span>
                        </div>

                        <div className='mt-4'>
                            {event.attendees && event.attendees.length  && event.attendees.map((attendees) => {
                                return <div className='flex items-center '>
                                    <div className="avatar avatar-placeholder">
                                        <div className="bg-blue-600 text-neutral-content w-8 rounded-full">
                                            <span className='text-center'>SY</span>
                                        </div>
                                    </div>
                                    <span>{attendees.email}</span>
                                </div>
                            })}
                        </div>
                   </div>
                </div>
               
               
            </div>
        </motion.div>
        </>
  )
}
