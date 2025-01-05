import React, { useEffect } from 'react'
import NotificationInvitation from './Invitations/NotificationInvitation';
import NotificationInvitationConfirmation from './Invitations/NotificationInvitationConfirmation';
import NotificationInvitationAccepted from './Invitations/NotificationInvitationAccepted';
import NotificationInvitationRefused from './Invitations/NotificationInvitationRefused';
import { useAppSelector } from '@/app/store/hook';
import { NotificationEnum } from '@/domain/enum/NotificationEnums';
import { NotificationInterface, NotificationInvitationInterface } from '@/domain/entities/notifications.entities';
import { getAllNotification } from '@/Infrastructure/Services/NotificationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function Notification({active, setActive} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>}) {
    const notificationState = useAppSelector(state => state.notifications);
    useEffect(() => {
        setTimeout(() => {
          getAllNotification();
        }, 1000);
    }, []);

    const notifications = notificationState.notifications;

    return (
    <>
            <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
            <div className="modal modal-top backdrop-blur-sm " role="dialog">
            <div className=" mt-10 w-full flex   justify-center">
              <div className="modal-box w-[50%] h-fit rounded-md ">
              <div className="w-full flex justify-between items-center">
                  <h3 className="text-lg font-bold">{'Notifications'}</h3>
                  <a className="hover:cursor-pointer" onClick={() => setActive(false)}>
                      <FontAwesomeIcon icon={faClose}  />
                  </a>
               </div>
    
                <div className='w-full flex flex-col'>
                    <div className='mt-8'>
                      {notifications ? 
                         notifications.length ? notifications.map((notification : NotificationInvitationInterface) =>   {
                          
                          if (notification.type === NotificationEnum.invitation) {
                              return <NotificationInvitation notification={notification} />
                          }
                          if (notification.type === NotificationEnum.invitation_confirmation) {
                            return <NotificationInvitationConfirmation notification={notification} />
                          }
                          if (notification.type === NotificationEnum.invitation_accepted) {
                            return <NotificationInvitationAccepted notification={notification} />
                          }
                          if (notification.type === NotificationEnum.invitation_refused) {
                            return <NotificationInvitationRefused notification={notification} />
                          }
                        }) : <div className='text-xl'>Not found</div>
                      : <>

                        <div className='text-xl my-4 pb-3 w-full border-b space-y-2'>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-1/2"></div>
                        </div>
                        <div className='text-xl pb-3 my-4 w-full border-b space-y-2'>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-1/2"></div>
                        </div>
                      </>}

                    </div>
                    </div>
             
              </div>
            </div>
            </div>
        </>
  )
}



