import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import { mdiClose } from '@mdi/js'
import Tag from '../Tag'
import Icon from '@mdi/react'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { ITaskGroup } from '@/domain/entities/task.group.entities'
import { FieldValues, useForm } from 'react-hook-form'
import { createTaskInit, createTaskReset } from '@/app/Actions/TaskActions'
import { createTask } from '@/Infrastructure/Services/Task/TaskService'
import { CreateTaskType } from '@/domain/entities/task.entities'
import CustomButton from '../button/CustomButton'
import toast from 'react-hot-toast'
export default function AddTaskForm({active, setActive} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>}) {

    const fetchTaskGroupsState = useAppSelector(state  => state.taskGroup);
    const { handleSubmit, register, watch, reset } = useForm();
    const dispatch  = useAppDispatch();
    const createTaskState  = useAppSelector(state => state.task).create;

    const handleCreateTask = (data  : FieldValues) => {
        dispatch(createTaskInit())
        const options  = data as CreateTaskType;
        createTask(options);
    }

    useEffect(() => {
        if (createTaskState.status == 'succeeded') {
            toast.success('Task created successfully.')
            dispatch(createTaskReset());
            reset();
        }
        if (createTaskState.status == 'failed') {
            toast.error('Task creation failed.')
            dispatch(createTaskReset());
        }
    }, [createTaskState.status])

    
  return (
    <>
       <div className="divider  lg:divider-horizontal"></div>
            <motion.div animate={{ width : active ? '50%': '0%', display : active ? 'block' : 'none', opacity :  active ? 1 : 0 }} className='w-2/3'>
                <div className='p-2 dark:bg-black flex flex-row justify-between  items-center rounded-t-xl ' >
                    <div className='flex flex-row  items-center space-x-2 '>
                        <h5 className='text-lg  font-bold text-indigo-800'>Add a new Task</h5>
                    </div>
                    <button onClick={() => setActive(false)} className='btn text-gray-500 hover:bg-gray-100  bg-white dark:bg-slate-800 dark:hover:bg-slate-600 dark:text-white dark:border-black' >
                        <Icon path={mdiClose} size={1} />
                    </button>
                </div>
                <div className=' bg-gray-100/40  dark:bg-slate-800 w-full rounded-b-xl p-2'>
                    
                    <form className='px-4 w-full mt-2' onSubmit={handleSubmit(handleCreateTask)}>
                        
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold dark:text-white">Task Group <small className='text-red-800'>*</small></span>
                                <span className="label-text-alt"></span>
                            </div>
                            <select  {...register('task_group_id', {
                                required : true
                            })} className="select select-bordered w-full  ">
                                    <option value={undefined} disabled selected>------</option>
                                    {
                                        fetchTaskGroupsState.taskGroups && fetchTaskGroupsState.taskGroups.map((taskGroup : ITaskGroup) => {
                                            return <option value={taskGroup.id}>{taskGroup.name}</option>
                                        })  
                                    }
                            </select>
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold dark:text-white">Title of your task? <small className='text-red-800'>*</small></span>
                                <span className="label-text-alt"></span>
                            </div>
                            <input type="text" {...register('title', {
                                required : true
                            })} placeholder="title of the task" className="input input-bordered w-full dark:bg-slate-600" />
                            
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <div>
                                    <span className="label-text font-bold dark:text-white">What ? <small className='text-red-800'>*</small></span>
                                    <div className='text-red-800 text-xs '>briefy describe for your team</div>
                                </div>
                                <span className="label-text-alt"></span>
                            </div>
                            <input type="text" {...register('breifing', {
                                required : true
                            })} placeholder="what about the task" className="input input-bordered w-full dark:bg-slate-600" />
                            
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold dark:text-white">Details </span>
                                <span className="label-text-alt"></span>
                            </div>
                            <textarea rows={6}  {...register('details', {
                            })} className="textarea textarea-bordered dark:bg-slate-600" placeholder="more details"></textarea>
                            
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

                        <CustomButton variant='submit' type='submit' text='Submit' loader={createTaskState.status === 'loading'} />
                        {/* end add tools */}
                    </form>
                
                </div>
            </motion.div>
    </>
  )
}
