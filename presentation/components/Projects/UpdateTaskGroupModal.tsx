import { createProjectInit, resetCreateProjectState } from "@/app/Actions/ProjectsActions";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { CreateProject, FetchAllProjects } from "@/Infrastructure/Services/projects/ProjectsService";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, useForm } from "react-hook-form";
import CustomButton from "../button/CustomButton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { createTaskGroup, fecthTaskGroupsProject, updateTaskGroup } from "@/Infrastructure/Services/TaskGroup/TaskGroupService";
import { useRouter } from "next/router";
import { createTaskGroupInit, createTaskGroupReset, updateTaskGroupReset } from "@/app/Actions/TaskGroupActions";
import TaskGroups from '../ProjectSetting/TaskGroups';
import { ITaskGroup } from "@/domain/entities/task.group.entities";
import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";

export default function UpdateTaskGroupModal({active, setActive, TaskGroup} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, TaskGroup : ITaskGroup }) {

  const { handleSubmit, register, watch, reset } = useForm();
  const dispatch = useAppDispatch();
  const router  = useRouter();
  const {id} = router.query;
  const updateTaskGroupState = useAppSelector(state => state.taskGroup).update

  const handleUpdateTaskGroup = (data : FieldValues) => {
    if (id && typeof id === 'string') {
      dispatch(createTaskGroupInit());
      updateTaskGroup(TaskGroup.id, data.name);
    }
  }



  useEffect(() => {
    if (updateTaskGroupState.status === StatusStateEnum.success) {
        toast.success('Task Group updated successfully.')
        setActive(false);
        dispatch(updateTaskGroupReset());
    }
    if (updateTaskGroupState.status ===  StatusStateEnum.failure) {
      toast.error('Process Failed');
      dispatch(updateTaskGroupReset());
    }
  },[updateTaskGroupState.status])

  useEffect(() => {
    const defautValues : {
      name : string | undefined
    } = {
      name : undefined
    }

    defautValues.name = TaskGroup.name
    reset({...defautValues})
  }, [TaskGroup])
  
 

  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box">
           <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-bold">{TaskGroup.name}</h3>
              <a onClick={() => setActive(false)} className="hover:cursor-pointer">
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>

           <div className="w-full my-4">
              <form   className="w-full" id="update-task-group-form" onSubmit={handleSubmit(handleUpdateTaskGroup)}>
                  <label className="form-control w-full my-2 ">
                      <div className="label">
                        <span className="label-text font-medium ">Name<span className="text-red-800">*</span></span>
                      </div>
                      <input type="text" {...register('name', {
                        required : true
                      })} placeholder="" className="input input-bordered w-full " />
                  </label>

                 
              </form>
           </div>

            <div className="modal-action">
              <CustomButton form="update-task-group-form" type="submit" btnClassName="w-1/4" loader={updateTaskGroupState.status ===  StatusStateEnum.loading ? true : false} text="Submit" size='lg'  variant='primary'  />
            </div>
        </div>
        </div>
    </>
  )
}
