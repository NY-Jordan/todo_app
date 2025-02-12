import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CustomButton from '../button/CustomButton'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { deleteProjectInit, InitCancelProjectInvitation, resetCancelProjectInvitationState, resetDeleteProjectState } from '@/app/Actions/ProjectsActions'
import { cancelProjectInvitation, deleteProject, FetchAllProjects, getInvitations } from '@/Infrastructure/Services/projects/ProjectsService'
import toast from 'react-hot-toast'
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum'

export default function CancelProjectInvitationConfirmation({active, setActive, uuid, projectId} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, uuid : string, projectId : number|undefined }) {
  const dispatch = useAppDispatch();
  const deleteProjectState = useAppSelector(state => state.projects).delete
  const cancelInvitationsState  = useAppSelector(state => state.projects).cancel_invitation;

  const handleCancelProjectInvitationAction = () => {
    dispatch(InitCancelProjectInvitation());
    cancelProjectInvitation(uuid);
  }

  
    useEffect(() => {
      if (cancelInvitationsState.status === StatusStateEnum.success) {
        toast.success('operation sucess ');
        if (projectId) {
          getInvitations(projectId)
        }
        setActive(false);
        dispatch(resetCancelProjectInvitationState())
      }
      if (cancelInvitationsState.status === 'sucess') {
        toast.error('Process Failed ');
        dispatch(resetCancelProjectInvitationState())
      }
    }, [cancelInvitationsState.status]);

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
      
                 <p className='my-4'>Are you sure you want to cancel this invitation?</p>
      
                  <div className="modal-action justify-between">
                    <CustomButton  type="submit" btnClassName="w-1/4"  text="Cancel" onClick={() => setActive(false)} size='lg'  variant='dark'  />
                    <CustomButton  type="submit" btnClassName="w-1/4"onClick={() => handleCancelProjectInvitationAction()}  loader={cancelInvitationsState.status === StatusStateEnum.loading}  text="Yes" size='lg'  variant='primary'  />
                  </div>
              </div>
              </div>
    </>
  )
}
