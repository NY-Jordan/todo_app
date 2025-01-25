import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CollaboratorsSearchModal from '../Collaborators/CollaboratorsSearchModal';
import { useRouter } from 'next/router';
import { cancelProjectInvitation, getInvitations, getProjectDetails } from '@/Infrastructure/Services/projects/ProjectsService';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { IInvitation, IProject } from '@/domain/entities/project.entities';
import { InvitationStatusEnum } from '@/domain/enum/InvitationStatusEnum';
import Icon from '@mdi/react';
import { mdiLockReset } from '@mdi/js';
import toast from 'react-hot-toast';
import { resetCancelProjectInvitationState } from '@/app/Actions/ProjectsActions';
import CancelProjectInvitationConfirmation from './CancelProjectInvitationConfirmation';
import removeUserFromProjectConfirmation from './RemoveUserFromProjectConfirmation';
import RemoveUserFromProjectConfirmation from './RemoveUserFromProjectConfirmation';
import { useQueryClient } from '@tanstack/react-query';

export default function CollaboratorsTab() {
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const router  = useRouter();
  const {id}  = router.query;
  const dispatch = useAppDispatch();
  const fetchInvitationsState  = useAppSelector(state => state.projects).invitations;
  const [uuid, setUuid]  = useState<string|undefined>();
  const [userId, setUserId]  = useState<number|undefined>();
  const [invitationId, setInvitationId]  = useState<number|undefined>();
  const [cancelInvitation, setCancelInvitation]  = useState<boolean>(false);
  const [removeUser, setRemoveUser]  = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [projectDetails, setProjectDetails] = useState<IProject|undefined>()

  useEffect(() => {
    if (id && typeof id  === 'string') {
      getInvitations(parseInt(id))
      setProjectDetails(queryClient.getQueryData(['projectDetails', id]) as IProject)
    }
  }, [id]);

 
 
  return (
    <div>
      <div>
{     (projectDetails && projectDetails.is_admin) &&   <button onClick={() => setSearchModal(true)} className='btn bg-indigo-500 hover:bg-indigo-700 text-white'><FontAwesomeIcon icon={faPlus} />  New Colaborator</button>
}      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Joint At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(fetchInvitationsState.invitations && fetchInvitationsState.invitations.length)?  fetchInvitationsState.invitations.map((invitation : IInvitation, key : number) => {
              return   <tr key={key}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={invitation.receiver.picture}
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{invitation.receiver.name}</div>
                    <div className="text-sm opacity-50">{invitation.receiver.email}</div>
                  </div>
                </div>
              </td>
              <td>
               {InvitationStatusEnum.accepted === invitation.status.name ? <span className='bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>{invitation.status.name}</span>
               : (InvitationStatusEnum.pending === invitation.status.name ? <span className='bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>{invitation.status.name}</span> :
                (InvitationStatusEnum.refused === invitation.status.name ? <span className='bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>{invitation.status.name}</span> : 
                  <span className='bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>{invitation.status.name}</span>
                ))}
              </td>
              <td>
                <span className="badge badge-ghost badge-sm">{invitation.updated_at}</span>
              </td>
              {(projectDetails && projectDetails.is_admin) && <th className='flex justify-center'>
               {InvitationStatusEnum.pending === invitation.status.name ? 
                    <button data-tip='cancel invitation' onClick={() => {setCancelInvitation(true);setUuid(invitation.uuid)}} className="btn tooltip btn-ghost btn-xs text-red-600">
                      <Icon path={mdiLockReset} size={1} />
                  </button> :
                  <button  onClick={() => {setRemoveUser(true);setUserId(invitation.receiver.id);setInvitationId(invitation.id)}}  data-tip='remove user' className="btn tooltip btn-ghost btn-xs text-red-600">
                      <FontAwesomeIcon icon={faTrash} size='lg' />
                  </button>
                }
              </th>}
            </tr>
            }) : <tr>
                <td></td>
                <td></td>
                <td><div className='w-full text-red-600 text-center'>No entries found</div></td>
                <td></td>
              </tr>}
          
           
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Join At</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
     
      <CollaboratorsSearchModal active={searchModal} setActive={setSearchModal} />
      {uuid && id &&  typeof id  === 'string' && <CancelProjectInvitationConfirmation uuid={uuid} projectId={parseInt(id)} active={cancelInvitation} setActive={setCancelInvitation} />}
      {userId && invitationId && id &&  typeof id  === 'string' && <RemoveUserFromProjectConfirmation invitationId={invitationId} userId={userId} projectId={parseInt(id)} active={removeUser} setActive={setRemoveUser} />}
    </div>
  )
}
