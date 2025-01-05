import { NotificationInterface, NotificationInvitationInterface } from '@/domain/entities/notifications.entities';
import { ProjectInvitationInterface } from '@/domain/entities/project.entities';
import { getProjectInvitation } from '@/Infrastructure/Services/projects/ProjectsService';
import React, { useEffect, useState } from 'react'


const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3FoTTUAqf4eBIuMo4rE45GWh-TjwI66eSUA&usqp=CAU'

export default function NotificationInvitation({notification} : { notification: NotificationInvitationInterface}) {

  return (
    <>
    {
       <>
          <div className='my-2 flex space-x-2 hover:bg-slate-200 p-2 dark:bg-gray-900 rounded-md'>
          <div  className="btn btn-ghost btn-circle avatar w-18">
            <div className=" rounded-full">
              <img alt="Tailwind CSS Navbar component"  src={defaultImage} />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-sm'> 
            You have successfully invited 
            <strong> {notification.content.receiver.name} </strong>
            to join the 
          <strong> {notification.content.project.name} </strong> project</p>
          </div>
      </div>
      <div className='divider'></div> 
  </>
    }

    </>
    
  )
}
