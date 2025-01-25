import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import CustomButton from '../../button/CustomButton'
import { FieldValues, useForm } from 'react-hook-form';
import { createNewDailyTasks, updateDailyTasks } from '@/Infrastructure/Services/Task/DailyTaskService';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hook';
import { createDailyTaskInit, editDailyTaskInit, resetCreateDailyTask, resetEditDailyTask } from '@/app/Actions/DailyTaskActions';
import toast from 'react-hot-toast';
import { ITask } from '@/domain/entities/task.entities';

export default function UpdateDailyTaskModal({active, setActive, task} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, task : ITask}) {
    const { handleSubmit, register, watch , reset} = useForm();
    const dispatch = useAppDispatch();
    const updateDailyTaskState = useAppSelector(state => state.dailyTask).edit; 
 
    const handleUpdateDailyTask = (data : FieldValues) => {
        dispatch(editDailyTaskInit());
        updateDailyTasks({
          title : data.title,
          breifing : data.breifing
        }, task.id)
    }

    useEffect(() => {
        const defaultValues : {
            title : string | undefined,
            breifing : string | undefined,
        } = {
            title : undefined,
            breifing : undefined,
        }

        defaultValues.title = task.title;
        defaultValues.breifing = task.breifing;
        reset({...defaultValues})
    }, [task])

    useEffect(() => {
      if (updateDailyTaskState.taskId === task.id) {
        if (updateDailyTaskState.status === "success") {
          toast.success('Task updated successfully.')
          setActive(false);
          dispatch(resetEditDailyTask());
          reset();
  
        }
        if (updateDailyTaskState.status === "failure") {
          toast.error('Process Failed');
          dispatch(resetCreateDailyTask());
        }
      }
    },[updateDailyTaskState.status])
  
  return (
    <>
         <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
              <div className="modal  ml-0" role="dialog">
              <div className="modal-box max-w-none w-[30%]">
                 <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-bold">{'New Task'}</h3>
                    <a className='hover:cursor-pointer' onClick={() => setActive(false)}>
                        <FontAwesomeIcon icon={faClose}  />
                    </a>
                 </div>
      
                 <div className="w-full my-4">
                    <form id={`update-daily-task-form${task.id}`} onSubmit={handleSubmit(handleUpdateDailyTask)} className="w-full"  >
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
                                <span className="label-text font-bold dark:text-white">Details <small className='text-red-800'>*</small></span>
                                <span className="label-text-alt"></span>
                            </div>
                            <textarea   {...register('breifing', {
                              required : true
                            })}className="textarea textarea-bordered dark:bg-slate-600" placeholder="more details"></textarea>
                            
                        </label>
                    </form>
                 </div>
      
                  <div className="modal-action">
                    <CustomButton loader={updateDailyTaskState.status === 'loading'} form={`update-daily-task-form${task.id}`} type="submit" btnClassName="w-1/4"  text="Update" size='lg'  variant='primary'  />
                  </div>
              </div>
              </div>
    </>
  )
}
