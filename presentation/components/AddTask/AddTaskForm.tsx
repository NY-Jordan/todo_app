import React from 'react'
import {motion} from 'framer-motion'
import { mdiClose } from '@mdi/js'
import Tag from '../Tag'
import Icon from '@mdi/react'
export default function AddTaskForm({active, setActive} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <>
       <div className="divider lg:divider-horizontal"></div>
            <motion.div animate={{ width : active ? '50%': '0%', display : active ? 'block' : 'none', opacity :  active ? 1 : 0 }} className='w-2/3'>
                <div className='p-2 dark:bg-black flex flex-row justify-between  items-center rounded-t-xl ' >
                    <div className='flex flex-row  items-center space-x-2 '>
                        <h5 className='text-lg  font-bold text-indigo-500'>Add a new Task</h5>
                    </div>
                    <button onClick={() => setActive(false)} className='btn bg-indigo-950 border-indigo-950 text-white hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:text-white dark:border-black' >
                        <Icon path={mdiClose} size={1} />
                    </button>
                </div>
                <div className='bg-white  dark:bg-slate-800 w-full rounded-b-xl p-2'>
                    <div className='grid mb-6 mt-2  grid-cols-4  gap-2'>
                        <Tag text='back-end'/>
                        <Tag text='front-end' />
                        <Tag text='full-stack' />
                        <Tag text='full-stack' />
                        <Tag text='full-stack' />
                        <Tag text='full-stack' />
                        <Tag text='full-stack' />
                        
                    </div>
                    <form className='px-4 w-full mt-2'>
                        
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold dark:text-white">Task Group <small className='text-red-800'>*</small></span>
                                <span className="label-text-alt"></span>
                            </div>
                            <select className="select select-bordered w-full  w-full">
                                    <option disabled selected>------</option>
                                    <option>Authentification (Backend)</option>
                                    <option>Authentification (Frontend)</option>
                            </select>
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold dark:text-white">Title of your task? <small className='text-red-800'>*</small></span>
                                <span className="label-text-alt"></span>
                            </div>
                            <input type="text" placeholder="title of the task" className="input input-bordered w-full dark:bg-slate-600" />
                            
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <div>
                                    <span className="label-text font-bold dark:text-white">What ? <small className='text-red-800'>*</small></span>
                                    <div className='text-red-800 text-xs '>briefy describe for your team</div>
                                </div>
                                <span className="label-text-alt"></span>
                            </div>
                            <input type="text" placeholder="what about the task" className="input input-bordered w-full dark:bg-slate-600" />
                            
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold dark:text-white">Details <small className='text-red-800'>*</small></span>
                                <span className="label-text-alt"></span>
                            </div>
                            <textarea className="textarea textarea-bordered dark:bg-slate-600" placeholder="more details"></textarea>
                            
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold dark:text-white">Add Tags <small className='text-red-800'>*</small></span>
                                <span className="label-text-alt"></span>
                            </div>
                            <select className="select select-bordered w-full  w-full">
                                    <option disabled selected>------</option>
                                    <option>Backeng</option>
                                    <option>Frontend</option>
                            </select>
                        </label>
                    

                        

                        <button className='btn mt-4 dark:bg-black dark:border-black dark:hover:bg-slate-700 dark:hover:border-slate-700 dark:text-white  hover:bg-indigo-400 hover:text-white w-full'>Submit</button>
                        {/* end add tools */}
                    </form>
                
                </div>
            </motion.div>
    </>
  )
}
