import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../button/CustomButton'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { deleteProjectInit, resetDeleteProjectState } from '@/app/Actions/ProjectsActions'
import { deleteProject, FetchAllProjects } from '@/Infrastructure/Services/projects/ProjectsService'
import toast from 'react-hot-toast'
import { deleteDailyTaskInit, resetDeleteDailyTask } from '@/app/Actions/DailyTaskActions'
import { deleteDailyTask } from '@/Infrastructure/Services/Task/DailyTaskService'
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum'
import { fetchStats } from '@/Infrastructure/Services/AppService'

export default function DeleteDailyTaskModal({active, setActive, taskId} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, taskId : number }) {
  const dispatch = useAppDispatch();
  const deleteTaskState = useAppSelector(state => state.dailyTask).delete
  const [processedTaskId, setProcessedTaskId] = useState<number>();

  const handleTaskDeleteAction = () => {
    dispatch(deleteDailyTaskInit());
    setProcessedTaskId(taskId)
    deleteDailyTask(taskId);
  }


  useEffect(() => {
   
      if (processedTaskId &&  deleteTaskState.taskId === processedTaskId) {
        if (deleteTaskState.status === StatusStateEnum.success) {
          toast.success('The Task has been deleted successfully.');
          dispatch(resetDeleteDailyTask());
          fetchStats();
          setActive(false);
        }
        if (deleteTaskState.status === StatusStateEnum.failure) {
          toast.error('Task deletion failed. Please try again.');
          setActive(false)
        }
      }
      if (deleteTaskState.status === StatusStateEnum.idle) {
        setProcessedTaskId(undefined);
      }
  }, [deleteTaskState.status, deleteTaskState.taskId])

  return (
    <>
       <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
              <div className="modal" role="dialog">
              <div className="modal-box">
                 <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-bold text-red-600">Delete Task</h3>
                    <a onClick={() => setActive(false)}>
                        <FontAwesomeIcon icon={faClose}  />
                    </a>
                 </div>
      
                 <p className='my-4'>Are you sure you want to delete this task?</p>
      
                  <div className="modal-action justify-between">
                    <CustomButton  type="submit" btnClassName="w-1/4"  text="Cancel" onClick={() => setActive(false)} size='lg'  variant='dark'  />
                    <CustomButton  type="submit" btnClassName="w-1/4"onClick={() => handleTaskDeleteAction()}  loader={deleteTaskState.status === StatusStateEnum.loading}  text="Yes" size='lg'  variant='primary'  />
                  </div>
              </div>
              </div>
    </>
  )
}
