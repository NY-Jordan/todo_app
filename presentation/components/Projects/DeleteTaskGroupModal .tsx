import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CustomButton from '../button/CustomButton'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { deleteProjectInit, resetDeleteProjectState } from '@/app/Actions/ProjectsActions'
import { deleteProject, FetchAllProjects } from '@/Infrastructure/Services/projects/ProjectsService'
import toast from 'react-hot-toast'
import { deleteTaskGroupInit, deleteTaskGroupReset } from '@/app/Actions/TaskGroupActions'
import { deleteTaskGroup } from '@/Infrastructure/Services/TaskGroup/TaskGroupService'
import { ITaskGroup } from '@/domain/entities/task.group.entities'

export default function DeleteTaskGroupModal ({active, setActive, taskGroup} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, taskGroup : ITaskGroup }) {
  const dispatch = useAppDispatch();
  const deleteTaskGroupState = useAppSelector(state => state.taskGroup).delete;
  const handleProjectDeleteAction = () => {
    dispatch(deleteTaskGroupInit());
    deleteTaskGroup(taskGroup.id);
  }

  useEffect(() => {
    if (deleteTaskGroupState.status === 'succeeded') {
      toast.success('The task group has been deleted successfully.');
      dispatch(deleteTaskGroupReset());
      setActive(false);
    }
    if (deleteTaskGroupState.status === 'failure') {
      toast.error('task group deletion failed. Please try again.');
      setActive(false)
    }
  }, [deleteTaskGroupState.status])

  return (
    <>
       <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
              <div className="modal" role="dialog">
              <div className="modal-box">
                 <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-bold text-red-600">Delete Task Group</h3>
                    <a onClick={() => setActive(false)}>
                        <FontAwesomeIcon icon={faClose}  />
                    </a>
                 </div>
      
                 <p className='my-4'>Are you sure you want to delete this Task Group?</p>

                 <div className="form-control justify-start">
                  <label className="label cursor-pointer justify-start space-x-3">
                    <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
                    <span className="label-text text-sm font-bold">Delete also associated tasks</span>
                  </label>
                </div>
      
                  <div className="modal-action justify-between">
                    <CustomButton  type="submit" btnClassName="w-1/4"  text="Cancel" onClick={() => setActive(false)} size='lg'  variant='dark'  />
                    <CustomButton  type="submit" btnClassName="w-1/4"onClick={() => handleProjectDeleteAction()}  loader={deleteTaskGroupState.status === 'loading'}  text="Yes" size='lg'  variant='primary'  />
                  </div>
              </div>
              </div>
    </>
  )
}
