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
import { assignTaskToUsers, fetchCollaborators, reScheduleTaskAssignment } from "@/Infrastructure/Services/Task/TaskService";
import { initAssignTaskToUser, rescheduleTaskInit, resetAssignTaskToUserState, ResetRescheduleTask } from "@/app/Actions/TaskActions";
import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";
import AssignTaskPresenter from "@/Infrastructure/presenter/AssignTaskPresenter";
import moment from "moment";
import { convertToISO, convertToLocalDate } from "@/Infrastructure/helpers/utils";
import CustomButton from "../../button/CustomButton";
import { rescheduleDailyTask } from "@/Infrastructure/Services/Task/DailyTaskService";
import { rescheduleDailyTaskInit, resetRescheduleDailyTask } from "@/app/Actions/DailyTaskActions";

export default function RescheduleDailyTaskModal({active, setActive, task} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>> , task : ITask}) {

  const { handleSubmit, register, watch, reset } = useForm();
  const dispatch = useAppDispatch();
  const router  = useRouter();
  const {id} = router.query;
  const {user} = useAuth();
  const assignTaskState = useAppSelector(state => state.task).assign_task
  const rescheduleUsersTaskState = useAppSelector(state => state.dailyTask).reschedule
  const users = useMemo(() => task.assigned_user?.map((item) => item.id) as number[], [task.assigned_user]);
  const [userSelected, setUserSelected] = useState<number[]>(users);




  useEffect(() => {
    const defaultValue : {
      date : undefined|string
    } = {  date : undefined }
    const date = convertToLocalDate(task.updated_at, 'YYYY-MM-DDTHH:mm') ;
    defaultValue.date = date
    
    reset({...defaultValue});
  }, [task]);

  const handleSubmitForm = (data : FieldValues) => {
      dispatch(rescheduleDailyTaskInit())
      rescheduleDailyTask(task.id, convertToISO(data.date))
  }

 
  

  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box max-h-[50%] rounded-md">
           <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-bold">{'Reschedule Task Assignment Date'}</h3>
              <a onClick={() => setActive(false)} className="hover:cursor-pointer">
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>
           <form  onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="space-y-6 mt-6">
              <label className="form-control w-full ">
                  <div className="label">
                      <div>
                          <span className="label-text font-bold dark:text-white">Pick a datetime<small className='text-red-800'>*</small></span>
                      </div>
                      <span className="label-text-alt"></span>
                  </div>
                  <input type="datetime-local"  min={Date()}  {...register('date', {
                      required : true
                  })} className="input input-bordered w-full dark:bg-slate-600" />
                  
              </label>
              </div>
              <div className="modal-action">
                <CustomButton   loader={rescheduleUsersTaskState.status === StatusStateEnum.loading}  type="submit" btnClassName="w-1/4"  text={`Submit` } size='md'  variant='primary'  />
              </div>
           </form>
        </div>
        </div>
    </>
  )
}




