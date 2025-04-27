import { faExchangeAlt, faExpand, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { INote } from '@/domain/entities/note.entities';
import DeleteNoteModal from './DeleteNoteModal';
import UpdateNoteModal from './UpdateNoteModal';

export default function CardNote({note} : {note : INote}) {

    const [showMoreActive, setShowMoreActive] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const buttonAnimationStart = {rotate :  45}
    const buttonAnimationEnd = {rotate :  0  }

    const buttonAnimationVariants = {
        start : buttonAnimationStart,
        end : buttonAnimationEnd,
    }

    const buttonVariants = {
        hidden: { x: -15, opacity: 0, display: "none" },
        visible: (delay : number) => ({
          x: 10,
          opacity: 1,
          display: "block",
          transition: { delay, duration: 0.2, stiffness: 200, damping: 30 }
        })
      };

  return (
    <>
       <div style={{ backgroundColor : note.color }} className={` group w-full  overflow-x-hidden h-full p-2 rounded-lg flex flex-col `}>

            <div className='flex items-center justify-between'>
                <span className='text-sm mb-2'>May 21, 2020</span>
                <div >
                    <a onClick={() => setUpdateModal(true)} className=' hidden group-hover:block hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faExpand} />
                    </a>
                </div>
            </div>
            <div className='  h-[70%]'>
                    <span className='text-xl'>{note.title.length > 40 ?  note.title.substring(0, 36)+'...' : note.title}</span>
                </div>
           {!note.is_draft && <div className='flex  justify-between items-center h-[30%]'>
               
                <div className='flex items-center space-x-4'>
                    <motion.button animate={!showMoreActive ? 'end' : 'start'} variants={buttonAnimationVariants}   onClick={() => setShowMoreActive(!showMoreActive)} className='btn z-50  rounded-full bg-black hover:bg-black border-black hover:border-black  text-white'>
                        <FontAwesomeIcon icon={faPlus} />
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate={showMoreActive ? "visible" : "hidden"}
                        transition={{ delay: 0.3 }}
                        onClick={() => setDeleteModal(true)}
                        className={`btn z-20 rounded-full bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700  text-white`}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate={showMoreActive ? "visible" : "hidden"}
                        transition={{ delay: 0.5  }}
                        className={`btn z-20 rounded-full bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700  text-white`}
                    >
                        <FontAwesomeIcon icon={faExchangeAlt} />
                    </motion.button>
                </div>
            </div>}
        </div>
        <DeleteNoteModal note={note} active={deleteModal} setActive={setDeleteModal} />
        <UpdateNoteModal note={note} active={updateModal} setActive={setUpdateModal} />
    </>
  )
}
