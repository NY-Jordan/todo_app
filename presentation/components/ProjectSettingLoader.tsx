import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { deleteProjectInit, resetDeleteProjectState } from '@/app/Actions/ProjectsActions'
import { deleteProject, FetchAllProjects } from '@/Infrastructure/Services/projects/ProjectsService'
import toast from 'react-hot-toast'

export default function ProjectSettingLoader({active} : {active : boolean }) {
 

  return (
    <>
       <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
              <div className="modal backdrop-blur-sm" role="dialog">
              <div className="modal-box flex justify-center shadow-none bg-transparent">
                 <div className="w-full flex justify-between items-center">
                 </div>
      
                 <span className="loading loading-bars loading-lg"></span>

      
              </div>
              </div>
    </>
  )
}
