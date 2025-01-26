import { createProjectInit, resetCreateProjectState } from "@/app/Actions/ProjectsActions";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { CreateProject, FetchAllProjects, getProjectCollaborators } from "@/Infrastructure/Services/projects/ProjectsService";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, useForm } from "react-hook-form";
import CustomButton from "../button/CustomButton";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { createTaskGroup, fecthTaskGroupsProject } from "@/Infrastructure/Services/TaskGroup/TaskGroupService";
import { useRouter } from "next/router";
import { createTaskGroupInit, createTaskGroupReset } from "@/app/Actions/TaskGroupActions";
import { QueryKey, useQuery } from "@tanstack/react-query";
import CollaboratorLoaderSkelleton from "../Loader/CollaboratorLoaderSkelleton";
import { IUser, UserDetailsEntitie } from "@/domain/entities/user.entities";
import { ICollaborator } from "@/domain/entities/project.entities";
import useAuth from "@/Infrastructure/hooks/useAuth";
import { ITask } from "@/domain/entities/task.entities";
import { assignTaskToUsers, fetchCollaborators } from "@/Infrastructure/Services/Task/TaskService";
import { initAssignTaskToUser, resetAssignTaskToUserState } from "@/app/Actions/TaskActions";

export default function ViewTaskModal({active, setActive, task} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>> , task : ITask}) {

  const dispatch = useAppDispatch();
  const router  = useRouter();


  

  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box max-w-none w-[44%] max-h-[50%] rounded-md">
           <div className="w-full flex justify-btween items-center">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <a onClick={() => setActive(false)} className="hover:cursor-pointer">
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>
            <div className="space-y-6 mt-6">
                <div>
                    <span className="font-bold text-sm">Breifing :</span>
                    <div>{task.breifing}</div>
                </div>

                <div>
                    <span className="font-bold text-sm">Details :</span>
                    <div>{task.details}</div>
                </div>
              
            </div>
            <div className="modal-action">
              <CustomButton onClick={() => setActive(false)}    type="button" btnClassName="w-1/4" text={`Close` } size='lg'  variant='dark'  />
            </div>
        </div>
        </div>
    </>
  )
}




