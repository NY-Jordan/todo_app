import { Reorder, delay } from 'framer-motion'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { mdiBookEdit, mdiChevronLeft, mdiChevronRight, mdiDelete, mdiDotsVertical, mdiTagEdit } from '@mdi/js';
import Icon from '@mdi/react';

type ItemType = {
    id : number,
    title: string
    description: string
}
export default function SectionTaskCard({ item, position, color} :  { item : ItemType, position : number, color : string}) {
    const top = (position * 50);
    const [showViewMoreButton, setShowViewMoreButton] = useState(false);

    const animation = {
        height: "100%",
        scale : 1,
        bottom : top +20,
        cursor : "pointer",
        transition: { duration: 0.5},
    }

     
  return (
   
        <motion.div  
             onMouseEnter={() => setShowViewMoreButton(true)}
             onMouseLeave={() => setShowViewMoreButton(false)}
             whileHover={animation }
             whileFocus={animation}
           
            className={"card my-2 overflow-hidden dark:bg-slate-800  dark:hover:bg-slate-900 dark:shadow-slate-700  dark:border-slate-800 dark:text-white  h-40 border-2 bg-base-100 shadow-md "} style={{ bottom  : top }}>
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
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a href='#'><Icon path={mdiBookEdit} size={3/4} color={'red'} />Edit</a>
                        </li>
                        <li>
                            <a href='#'><Icon path={mdiDelete} size={3/4} color={'red'} />Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card-body pb-0">
                <h2 className="text-md font-bold">{item.title}</h2>
                <p className='p-2'>If a dog chews chews chews chews chews chews  ?</p>
                <div className="card-actions justify-end">
                <button className={"btn  btn-primary "+(showViewMoreButton ? '' : 'invisible')}>View More</button>
               
                </div>
            </div>     
            <div className='flex   flex-row p-2 items-center justify-between'>
                    <a href='#' className={(showViewMoreButton ? 'hover:bg-gray-200 rounded-full relative bottom-32 right-2' : 'invisible')}><Icon path={mdiChevronLeft} size={1} color={'gray'} /></a>
                    <a href='#' className={showViewMoreButton ? 'hover:bg-gray-200 rounded-full  relative bottom-32 left-2' : 'invisible'}><Icon path={mdiChevronRight} size={1} color={'gray'} /></a>
            </div>  
        </motion.div>
    
  )
}
