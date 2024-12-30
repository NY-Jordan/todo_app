import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CustomButton from '../button/CustomButton'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { deleteProjectInit, resetDeleteProjectState } from '@/app/Actions/ProjectsSctions'
import { deleteProject, FetchAllProjects } from '@/Infrastructure/Services/projects/ProjectsService'
import toast from 'react-hot-toast'

export default function DeleteProjectModal({active, setActive, projectId} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, projectId : number }) {
  const dispatch = useAppDispatch();
  const deleteProjectState = useAppSelector(state => state.projects).delete
  const handleProjectDeleteAction = () => {
    dispatch(deleteProjectInit());
    deleteProject(projectId);
  }

  useEffect(() => {
    if (deleteProjectState.status === 'success') {
      toast.success('The project has been deleted successfully.');
      dispatch(resetDeleteProjectState());
      FetchAllProjects();
      setActive(false);
    }
    if (deleteProjectState.status === 'failure') {
      toast.error('Project deletion failed. Please try again.');
      setActive(false)
    }
  }, [deleteProjectState.status])

  return (
    <>
       <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
              <div className="modal" role="dialog">
              <div className="modal-box">
                 <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-bold text-red-600">Delete Project</h3>
                    <a onClick={() => setActive(false)}>
                        <FontAwesomeIcon icon={faClose}  />
                    </a>
                 </div>
      
                 <p className='my-4'>Are you sure you want to delete this project?</p>
      
                  <div className="modal-action justify-between">
                    <CustomButton  type="submit" btnClassName="w-1/4"  text="Cancel" onClick={() => setActive(false)} size='lg'  variant='dark'  />
                    <CustomButton  type="submit" btnClassName="w-1/4"onClick={() => handleProjectDeleteAction()}  loader={deleteProjectState.status === 'loading'}  text="Yes" size='lg'  variant='primary'  />
                  </div>
              </div>
              </div>
    </>
  )
}
