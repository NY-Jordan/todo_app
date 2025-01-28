import { createProjectInit, resetCreateProjectState } from "@/app/Actions/ProjectsActions";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { CreateProject, FetchAllProjects } from "@/Infrastructure/Services/projects/ProjectsService";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, useForm } from "react-hook-form";
import CustomButton from "../button/CustomButton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { createTaskGroup, fecthTaskGroupsProject } from "@/Infrastructure/Services/TaskGroup/TaskGroupService";
import { useRouter } from "next/router";
import { createTaskGroupInit, createTaskGroupReset } from "@/app/Actions/TaskGroupActions";

export default function CreateTaskGroupModal({active, setActive} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>> }) {

  const { handleSubmit, register, watch, reset } = useForm();
  const dispatch = useAppDispatch();
  const router  = useRouter();
  const {id} = router.query;
  const createTaskGroupState = useAppSelector(state => state.taskGroup).create

  const handleCreateTaskGroup = (data : FieldValues) => {
    if (id && typeof id === 'string') {
      dispatch(createTaskGroupInit());
      createTaskGroup({
        name : data.name, 
        project_id : parseInt(id)
      });
    }
  }



  useEffect(() => {
    if (createTaskGroupState.status === "succeeded") {
        toast.success('Task Group created successfully.')
        setActive(false);
        dispatch(createTaskGroupInit());
        reset();
    }
    if (createTaskGroupState.status === "failure") {
      toast.error('Process Failed');
      dispatch(createTaskGroupReset());
    }
  },[createTaskGroupState.status])
  
 

  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box">
           <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-bold">{'New  Task Group'}</h3>
              <a onClick={() => setActive(false)}>
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>

           <div className="w-full my-4">
              <form   className="w-full" id="create-task-group-form" onSubmit={handleSubmit(handleCreateTaskGroup)}>
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
              <CustomButton form="create-task-group-form" type="submit" btnClassName="w-1/4" loader={createTaskGroupState.status === "loading" ? true : false} text="Submit" size='lg'  variant='primary'  />
            </div>
        </div>
        </div>
    </>
  )
}
