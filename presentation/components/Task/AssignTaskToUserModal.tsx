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

export default function AssignTaskToUserModal({active, setActive, task} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>> , task : ITask}) {

  const { handleSubmit, register, watch, reset } = useForm();
  const dispatch = useAppDispatch();
  const router  = useRouter();
  const {id} = router.query;
  const {user} = useAuth();
  const assignTaskState = useAppSelector(state => state.task).assign_task
  const users = useMemo(() => task.assigned_user?.map((item) => item.id) as number[], [task.assigned_user]);
  const [userSelected, setUserSelected] = useState<number[]>(users);



  const { data, error, isLoading } = useQuery({
    queryKey: ['collaborators', id],
    queryFn: fetchCollaborators,
    staleTime: 10*(60*1000), // 10 mins
  });

  const collaborators  = data as ICollaborator[];


  const handleAssignTaskAction = () => {
    if (id && typeof id === 'string'  && userSelected.length) {
      dispatch(initAssignTaskToUser())
      assignTaskToUsers(parseInt(id), {
        task_id : task.id,
        users : userSelected
      })
    }
  }
  useEffect(() => {
    if (assignTaskState.status === 'success') {
      toast.success('Task Successfully Assigned');
      dispatch(resetAssignTaskToUserState());
      setActive(false);
    }
    if (assignTaskState.status === 'failure') {
      toast.error('Process Failed');
      dispatch(resetAssignTaskToUserState());
    }
  }, [assignTaskState.status])

  

  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box max-h-[50%] rounded-md">
           <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-bold">{'Assign a Task'}</h3>
              <a onClick={() => setActive(false)} className="hover:cursor-pointer">
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>
            <div className="space-y-6 mt-6">
              {
                (isLoading  && !error && active)? <CollaboratorLoaderSkelleton /> : collaborators.map((collaborator : ICollaborator, key : number) => {
                  const isSelected = users.includes(collaborator.user.id);
                  return  <div className="flex items-center gap-4" key={key}>
                        <label>
                          <input  key={task.id+key} defaultChecked={isSelected} onChange={(e) => {
                          if (e.target.checked) {
                            setUserSelected((prev) => [...prev, collaborator.user.id]);
                          } else {
                            setUserSelected((prev) => prev.filter((id) => id !== collaborator.user.id));
                          }
                    }} type="checkbox" className="checkbox" />
                        </label>
                        <CollaboratorsIem user={collaborator.user} />
                  </div>
                })
              }
            </div>
            <div className="modal-action">
              <CustomButton onClick={handleAssignTaskAction}  loader={assignTaskState.status === 'loading'} form="create-task-group-form" type="submit" btnClassName="w-1/4" isDisabled={userSelected.length ==0} text={`Assign  (${userSelected.length})` } size='lg'  variant='primary'  />
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