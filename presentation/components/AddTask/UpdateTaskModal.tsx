import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import { mdiClose } from '@mdi/js'
import Tag from '../Tag'
import Icon from '@mdi/react'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { ITaskGroup } from '@/domain/entities/task.group.entities'
import { FieldValues, useForm } from 'react-hook-form'
import { createTaskInit, createTaskReset, updateTaskReset } from '@/app/Actions/TaskActions'
import { createTask, updateTask } from '@/Infrastructure/Services/Task/TaskService'
import { CreateTaskType, ITask } from '@/domain/entities/task.entities'
import CustomButton from '../button/CustomButton'
import toast from 'react-hot-toast'
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum'
export default function UpdateTaskModal({active, setActive, task} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, task : ITask}) {

    const fetchTaskGroupsState = useAppSelector(state  => state.taskGroup);
    const { handleSubmit, register, watch, reset } = useForm();
    const dispatch  = useAppDispatch();
    const updateTaskState  = useAppSelector(state => state.task).update;

    const handleUpdateTask = (data  : FieldValues) => {
        dispatch(createTaskInit())
        const options  = data as CreateTaskType;
        updateTask(options, task.id);
    }

    useEffect(() => {
        if (updateTaskState.status == StatusStateEnum.success) {
            toast.success('Task updated successfully.')
            dispatch(updateTaskReset());
            setActive(false);
            reset();
        }
        if (updateTaskState.status == StatusStateEnum.failure) {
            toast.error('Task update failed.')
            dispatch(updateTaskReset());
        }
    }, [updateTaskState.status]);

    useEffect(() => {
        const defaultValues : {
            task_group_id : number|undefined,
            title : string|undefined,
            breifing : string|undefined,
            details : string|undefined,
        }  = {
            task_group_id : undefined,
            title : undefined,
            breifing : undefined,
            details : undefined
        }   

        defaultValues.task_group_id = task.taskgroup_id ?? undefined;
        defaultValues.title = task.title;
        defaultValues.breifing = task.breifing; 
        defaultValues.details = task.details ? task.details : ''; 
        
        reset({...defaultValues})
    }, [task]);

    
  return (
    <>
           <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
              <div className="modal" role="dialog">
              <div className="modal-box max-w-none w-[40%]">
                <div className='p-2 dark:bg-black flex flex-row justify-between  items-center rounded-t-xl ' >
                    <div className='flex flex-row  items-center space-x-2 '>
                        <h5 className='text-lg  font-bold text-indigo-800'>Update Task</h5>
                    </div>
                    <button onClick={() => setActive(false)} className='btn text-gray-500 hover:bg-gray-100  bg-white dark:bg-slate-800 dark:hover:bg-slate-600 dark:text-white dark:border-black' >
                        <Icon path={mdiClose} size={1} />
                    </button>
                </div>
                <div className=' dark:bg-slate-800 w-full rounded-b-xl p-2'>
                    
                    <form className='px-4 w-full mt-2' onSubmit={handleSubmit(handleUpdateTask)}>
                        
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold dark:text-white">Task Group <small className='text-red-800'>*</small></span>
                                <span className="label-text-alt"></span>
                            </div>
                            <select  {...register('task_group_id', {
                                required : true
                            })} className="select select-bordered w-full  ">
                                    <option value={undefined} disabled >------</option>
                                    {
                                        fetchTaskGroupsState.taskGroups && fetchTaskGroupsState.taskGroups.map((taskGroup : ITaskGroup) => {
                                            return <option value={taskGroup.id} selected={taskGroup.id === task.taskgroup_id}>{taskGroup.name}</option>
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
                            <textarea rows={6} {...register('details', {
                            })}  className="textarea textarea-bordered dark:bg-slate-600" placeholder="more details"></textarea>
                            
                        </label>

                       

                        <CustomButton variant='submit' type='submit' text='Submit' loader={updateTaskState.status === StatusStateEnum.loading} />
                        {/* end add tools */}
                    </form>
                
                </div>
            </div>
            </div>
    </>
  )
}
