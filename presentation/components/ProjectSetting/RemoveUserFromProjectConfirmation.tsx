import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CustomButton from '../button/CustomButton'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { deleteProjectInit, InitCancelProjectInvitation, initRemoveUserFromProject, resetCancelProjectInvitationState, resetDeleteProjectState, resetRemoveUserFromProjectState } from '@/app/Actions/ProjectsActions'
import { cancelProjectInvitation, deleteProject, FetchAllProjects, getInvitations, removeUserOfProject } from '@/Infrastructure/Services/projects/ProjectsService'
import toast from 'react-hot-toast'

export default function RemoveUserFromProjectConfirmation({active, setActive, userId, projectId, invitationId} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, userId : number, projectId : number|undefined , invitationId : number}) {
  const dispatch = useAppDispatch();
  const removeUserFromProjectState  = useAppSelector(state => state.projects).remove_user;

  const handleRemoveUserFromProjectAction = () => {
    dispatch(initRemoveUserFromProject());
    if (projectId) {
      removeUserOfProject(userId, projectId, invitationId);
    }
  }

  
    useEffect(() => {
      if (removeUserFromProjectState.status === StatusStateEnum.success) {
        toast.success('operation sucess ');
        setActive(false);
        dispatch(resetRemoveUserFromProjectState())
      }
      if (removeUserFromProjectState.status === 'sucess') {
        toast.error('Process Failed ');
        dispatch(resetRemoveUserFromProjectState())
      }
    }, [removeUserFromProjectState.status]);

  return (
    <>
       <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
              <div className="modal" role="dialog">
              <div className="modal-box">
                 <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-bold text-red-600">Cancel Invitation</h3>
                    <a onClick={() => setActive(false)}>
                        <FontAwesomeIcon icon={faClose}  />
                    </a>
                 </div>
      
                 <p className='my-4'>Are you sure you want to remove this user from this project?</p>
      
                  <div className="modal-action justify-between">
                    <CustomButton  type="submit" btnClassName="w-1/4"  text="Cancel" onClick={() => setActive(false)} size='lg'  variant='dark'  />
                    <CustomButton  type="submit" btnClassName="w-1/4"onClick={() => handleRemoveUserFromProjectAction()}  loader={removeUserFromProjectState.status === StatusStateEnum.loading}  text="Yes" size='lg'  variant='primary'  />
                  </div>
              </div>
              </div>
    </>
  )
}
