import { faCheck, faDownload, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { mdiClose, mdiFileEdit } from '@mdi/js'
import Icon from '@mdi/react'
import Tag from '../Tag'
import { motion } from "framer-motion"
import AddTaskForm from '../AddTask/AddTaskForm'


export default function TaskTab() {
    const [showAddTask, setShowAddTask] = useState(false);
  return (
    <div className='flex justify-between lg:flex-row md:flex-col'>
      <div className='w-full'>
            <div className='mb-7 flex justify-between '>
                <button onClick={() => setShowAddTask(true)} className='btn bg-indigo-500 hover:bg-indigo-700 text-white'><FontAwesomeIcon icon={faPlus} />  New Task</button>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>All</option>
                    <option>Backlog</option>
                    <option>Started</option>
                    <option>In Review</option>
                    <option>Done</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Assignee</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className=''>
                        <td className='text-sm space-x-3 py-5 '>
                            <span className='border border-gray-500 p-3 text-gray-500 rounded-full'><FontAwesomeIcon icon={faCheck} size='lg' /></span>
                            <span className='text-[16px]'>Design de la page d'Authentification</span>
                        </td>
                        <td className='text-sm'> 
                            
                            <div className="avatar ">
                                <div className="w-24 rounded-full w-9">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                        </td>
                        <td className='text-sm'> 25 June 2025</td>
                        <td className='text-sm'><span className='bg-gray-600 px-3 py-1 text-white rounded-full'>Backlog</span> </td>
                        <td className='space-x-8 p-3'>
                            <a href='#' className='text-red-500 tooltip' data-tip='delete'>
                                <FontAwesomeIcon icon={faTrash} size='lg' />
                            </a>
                            <a href='#' className='text-black tooltip' data-tip='edit'>
                                <FontAwesomeIcon icon={faEdit} size='lg'/>
                            </a>
                            
                        </td>
                    </tr>
                    <tr className=''>
                        <td className='text-sm space-x-3 py-5 '>
                                                <span className='border border-gray-500 p-3 text-gray-500 rounded-full'><FontAwesomeIcon icon={faCheck} size='lg' /></span>

                            <span className='text-[16px]'>Design de la page de mot de passe oublie</span>
                        </td>
                        <td className='text-sm'> 
                            <div className="avatar ">
                                <div className="w-24 rounded-full w-9">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjSyNs101ySkWhZibup1E5iUa-2VCl2RPTNg&s" />
                                </div>
                            </div>
                        </td>
                        <td className='text-sm'> 25 June 2025</td>
                        <td className='text-sm'><span className='bg-blue-600 px-3 py-1 text-white rounded-full'>Started</span> </td>
                        <td className='space-x-8 p-3'>
                            <a href='#' className='text-red-500 tooltip' data-tip='delete'>
                                <FontAwesomeIcon icon={faTrash} size='lg' />
                            </a>
                            <a href='#' className='text-black tooltip' data-tip='edit'>
                                <FontAwesomeIcon icon={faEdit} size='lg'/>
                            </a>
                            
                        </td>
                    </tr>
                    <tr className=''>
                        <td className='text-sm space-x-3 py-5 '>
                                                <span className='border border-gray-500 p-3 text-gray-500 rounded-full'><FontAwesomeIcon icon={faCheck} size='lg' /></span>

                            <span className='text-[16px]'>Design de la page de mot de passe oublie</span>
                        </td>
                        <td className='text-sm'> 
                            <div className="avatar ">
                                <div className="w-24 rounded-full w-9">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1w5uj6YvfAiEh-skxABKwo5DBdfsDlui2XQ&s" />
                                </div>
                            </div>
                        </td>
                        <td className='text-sm'> 25 June 2025</td>
                        <td className='text-sm'><span className='bg-orange-600 px-3 py-1 text-white rounded-full'>In Review</span> </td>
                        <td className='space-x-8 p-3'>
                            <a href='#' className='text-red-500 tooltip' data-tip='delete'>
                                <FontAwesomeIcon icon={faTrash} size='lg' />
                            </a>
                            <a href='#' className='text-black tooltip' data-tip='edit'>
                                <FontAwesomeIcon icon={faEdit} size='lg'/>
                            </a>
                            
                        </td>
                    </tr>
                    <tr className=''>
                        <td className='text-sm space-x-3 py-5 '>
                                                <span className='border border-gray-500 p-3 text-gray-500 rounded-full'><FontAwesomeIcon icon={faCheck} size='lg' /></span>

                            <span className='text-[16px]'>Design de la page de mot de passe oublie</span>
                        </td>
                        <td className='text-sm'> 
                            <div className="avatar ">
                                <div className="w-24 rounded-full w-9">
                                    <img src="https://www.nautiljon.com/images/manga_persos/00/57/ri_shin_6475.webp" />
                                </div>
                            </div>
                        </td>
                        <td className='text-sm'> 25 June 2025</td>
                        <td className='text-sm'><span className='bg-green-600 px-3 py-1 text-white rounded-full'>Done</span> </td>
                        <td className='space-x-8 p-3'>
                            <a href='#' className='text-red-500 tooltip' data-tip='delete'>
                                <FontAwesomeIcon icon={faTrash} size='lg' />
                            </a>
                            <a href='#' className='text-black tooltip' data-tip='edit'>
                                <FontAwesomeIcon icon={faEdit} size='lg'/>
                            </a>
                        
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

          
      </div>
     <AddTaskForm active={showAddTask} setActive={setShowAddTask} />
    </div>
  )
}
