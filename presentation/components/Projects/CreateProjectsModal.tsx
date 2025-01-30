import { createProjectInit, resetCreateProjectState } from "@/app/Actions/ProjectsActions";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { CreateProject, FetchAllProjects } from "@/Infrastructure/Services/projects/ProjectsService";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, useForm } from "react-hook-form";
import CustomButton from "../button/CustomButton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";

export default function CreateProjectsModal({active, setActive} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>> }) {

  const { handleSubmit, register, watch, reset } = useForm();
  const dispatch = useAppDispatch();
  const createProjectState = useAppSelector(state => state.projects).create

  const handleCreateProject = (data : FieldValues) => {
   
    const formData = new FormData();
    formData.append('name', data.name); 
    if (data.logo[0] ) {
      formData.append('logo', data.logo[0]); 
    }
    dispatch(createProjectInit())
    setTimeout(() => {
      CreateProject(formData);
    }, 1000);
  }

  
  useEffect(() => {
    if (createProjectState.status ===  StatusStateEnum.success) {
        toast.success('Project created successfully 🎉🎉')
        setActive(false);
        FetchAllProjects();
        dispatch(resetCreateProjectState());
        reset();

    }
    if (createProjectState.status === StatusStateEnum.failure) {
      toast.error('Process Failed');
      dispatch(resetCreateProjectState());
    }
  },[createProjectState.status])

  const name = watch('name');

  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box">
           <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-bold">{(name && name.length) ? name :  'New Project'}</h3>
              <a onClick={() => setActive(false)}>
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>

           <div className="w-full my-4">
              <form   className="w-full" id="create-project-form" onSubmit={handleSubmit(handleCreateProject)}>
                  <label className="form-control w-full my-2 ">
                      <div className="label">
                        <span className="label-text font-medium ">Name<span className="text-red-800">*</span></span>
                      </div>
                      <input type="text" {...register('name', {
                        required : true
                      })} placeholder="" className="input input-bordered w-full " />
                  </label>

                  <label className="form-control w-full my-2">
                      <div className="label">
                        <span className="label-text">Logo</span>
                      </div>
                      <input type="file" {...register('logo', {
                      })} className="file-input file-input-bordered file-input-md w-full " />
                  </label>
              </form>
           </div>

            <div className="modal-action">
              <CustomButton form="create-project-form" type="submit" btnClassName="w-1/4" loader={createProjectState.status === StatusStateEnum.loading ? true : false} text="Submit" size='lg'  variant='primary'  />
            </div>
        </div>
        </div>
    </>
  )
}
