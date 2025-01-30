import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { createNewDailyTasks } from '@/Infrastructure/Services/Task/DailyTaskService';
import { createDailyTaskInit, resetCreateDailyTask } from '@/app/Actions/DailyTaskActions';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import CustomButton from '../../button/CustomButton';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';

export default function CreateDailyTaskModal({active, setActive} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>}) {
    const { handleSubmit, register, watch , reset} = useForm();
    const dispatch = useAppDispatch();
    const createDailyTaskState = useAppSelector(state => state.dailyTask).create; 

    const handleCreateDailyTask = (data : FieldValues) => {
        dispatch(createDailyTaskInit());
        createNewDailyTasks({
          title : data.title,
          breifing : data.breifing
        })
    }

    useEffect(() => {
      if (createDailyTaskState.status ===  StatusStateEnum.success) {
          toast.success('task created successfully 🎉🎉')
          setActive(false);
          dispatch(resetCreateDailyTask());
          reset();
  
      }
      if (createDailyTaskState.status ===  StatusStateEnum.failure) {
        toast.error('Process Failed');
        dispatch(resetCreateDailyTask());
      }
    },[createDailyTaskState.status])
  
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
                    <form id='create-daily-task-form' onSubmit={handleSubmit(handleCreateDailyTask)} className="w-full"  >
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
                    <CustomButton loader={createDailyTaskState.status === StatusStateEnum.loading} form='create-daily-task-form' type="submit" btnClassName="w-1/4"  text="Submit" size='lg'  variant='primary'  />
                  </div>
              </div>
              </div>
    </>
  )
}
