import { createProjectInit, resetCreateProjectState } from "@/app/Actions/ProjectsActions";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { CreateProject, FetchAllProjects, getProjectCollaborators } from "@/Infrastructure/Services/projects/ProjectsService";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { createTaskGroup, fecthTaskGroupsProject } from "@/Infrastructure/Services/TaskGroup/TaskGroupService";
import { useRouter } from "next/router";
import { createTaskGroupInit, createTaskGroupReset } from "@/app/Actions/TaskGroupActions";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { IUser, UserDetailsEntitie } from "@/domain/entities/user.entities";
import { ICollaborator } from "@/domain/entities/project.entities";
import useAuth from "@/Infrastructure/hooks/useAuth";
import { ITask } from "@/domain/entities/task.entities";
import { assignTaskToUsers, fetchCollaborators } from "@/Infrastructure/Services/Task/TaskService";
import { initAssignTaskToUser, resetAssignTaskToUserState } from "@/app/Actions/TaskActions";
import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";
import AssignTaskPresenter from "@/Infrastructure/presenter/AssignTaskPresenter";
import CustomButton from "../../button/CustomButton";

export default function TaskTicketManagement({active, setActive, task} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>> , task : ITask}) {

  const { handleSubmit, register, watch, reset } = useForm();
  const dispatch = useAppDispatch();
  const router  = useRouter();
  const {id} = router.query;
  const {user} = useAuth();
  const assignTaskState = useAppSelector(state => state.task).assign_task
  const users = useMemo(() => task.assigned_user?.map((item) => item.id) as number[], [task.assigned_user]);



  

  

  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal modal-top flex justify-center" role="dialog">
        <div className="modal-box max-w-none w-[60%] mt-[5%]  rounded-md">
           <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-bold">{'Tickets Management'}</h3>
              <a onClick={() => setActive(false)} className="hover:cursor-pointer">
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>
            <div className="space-y-6 mt-6">
                <div></div>
            </div>
            <div className="modal-action">
            </div>
        </div>
        </div>
    </>
  )
}




const  CollaboratorsIem = ({user} : {user : UserDetailsEntitie}) => {
    return  <div className="flex items-center gap-3">
    <div className="avatar">
      <div className="mask mask-squircle h-12 w-12">
        <img
          src={user.picture}
          alt="Avatar Tailwind CSS Component" />
      </div>
    </div>
    <div>
      <div className="font-bold">{user.username}</div>
      <div className="text-sm opacity-50">{user.email}</div>
    </div>
  </div>
}