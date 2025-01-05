import { InitInvitationStatus } from '@/app/Actions/ProjectsActions';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { IUser, UserDetailsEntitie } from '@/domain/entities/user.entities'
import { getInvitations, SendInvitationToUser } from '@/Infrastructure/Services/projects/ProjectsService';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mdiAlert, mdiArrowRightTop } from '@mdi/js';
import Icon from '@mdi/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function CollaboratorSearchItem({user} : {user : IUser}) {
  const router = useRouter();
  const [loader, setLoader] =useState<boolean>(false);
  const SendInvitationStatus = useAppSelector(state => state.projects).send_invitation_status;
  const dispatch = useAppDispatch();
  const {id} = router.query
  function SendInvitation(){
      if (id && typeof id === 'string') {
        setLoader(true);
        SendInvitationToUser(user.id , parseInt(id));
      }
  }

  function handleStatusInvitation(status:number) {
      if (status === 200) {
          setLoader(false);
          toast.success('Invitation was sent successfully.', {
              position: 'top-left',
          });
          if (id && typeof id === 'string') {
            getInvitations(parseInt(id))
          }
      }
      if (status === 400) {
          setLoader(false);
          toast.error('somethings went wrong.',{
              position: 'top-left',
          });
      }
      if (status === 412) {
          setLoader(false);
          if (id && typeof id === 'string') {
            setLoader(true);
            getInvitations(parseInt(id))
          }

          toast.custom(<div className='bg-amber-400 min-w-60  flex space-x-4 items-center text-white p-3 rounded-lg text-md font-bold'>
               <a className='rounded-full bg-white p-1'>
               <Icon path={mdiAlert} size={3/4} color={'#fbbf24'}  />
               </a>
              <span>Invitation already sent</span>
          </div>, {
              position: 'top-left',
          });
      }
  }
  
  useEffect(() => {
      if (SendInvitationStatus.user_id === user.id && SendInvitationStatus.project_id == id) {
          handleStatusInvitation(SendInvitationStatus.status);
          dispatch(InitInvitationStatus());
      }
  }, [SendInvitationStatus.status]); 


  return (
    <>
       <div className="flex flex-row justify-between my-3 items-center border-b gap-3 hover:bg-gray-100 py-2 px-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.picture}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                  <div>
                  {loader ? <span className="loading loading-spinner loading-md"></span> :
                <a href='#' onClick={SendInvitation}  className='dark:hover:text-black tooltip tooltip-left rounded-full hover:bg-slate-100 p-2' data-tip="send an invitation">
                    <Icon path={mdiArrowRightTop} size={1}  />
            </a>}
                  </div>
                </div>

    </>
  )
}
