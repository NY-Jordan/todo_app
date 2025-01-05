import { createProjectInit, resetCreateProjectState } from "@/app/Actions/ProjectsActions";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { CreateProject, FetchAllProjects, searchUser } from "@/Infrastructure/Services/projects/ProjectsService";
import { faArrowCircleLeft, faClose, faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, useForm } from "react-hook-form";
import CustomButton from "../button/CustomButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CollaboratorSearchItem from "./CollaboratorSearchItem";
import { IUser, UserDetailsEntitie } from "@/domain/entities/user.entities";
import { useRouter } from "next/router";

export default function CollaboratorsSearchModal({active, setActive} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>> }) {

  const { handleSubmit, register, watch, reset } = useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {id} = router.query;
   const [search, setSearch] = useState<string|undefined>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string|undefined>(search);
  const [result, setResult] = useState<Array<IUser>>([]);
 
  async function reSearch(projectId : number, debouncedSearch : string) {
    let result = await searchUser(projectId, debouncedSearch)
    setResult(result);
  }

  useEffect(() => {
    if (id && typeof id == 'string' && debouncedSearch) {
      reSearch(parseInt(id), debouncedSearch)
    }
  }, [debouncedSearch]);

   useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(search);
      }, 500); 
  
      return () => {
        clearTimeout(handler); 
      };
    }, [search]);


   
  
  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal modal-top" role="dialog">
        <div className=" mt-10 w-full flex   justify-center">
          <div className="modal-box w-[50%] h-fit rounded-md">
          <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-bold">{'New Collaborators'}</h3>
              <a className="hover:cursor-pointer" onClick={() => setActive(false)}>
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>

           <div className="w-full my-4">
              <form   className="w-full" id="create-project-form">
                  <label className="form-control flex  flex-row items-center w-full my-2 ">
                      <div className="relative left-8 ">
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                      </div>
                      <input type="text" onChange={(e) => setSearch(e.target.value)}  placeholder="Search for collaborators by name or email..." className="input pl-10 input-bordered w-full " />
                  </label>
              </form>
           </div>

           <div className=" border shadow-md w-full h-fit py-3 px-2 ">
              {result && result.map((item) => {
                  return <CollaboratorSearchItem user={item}/>
              }) }
               
                
           </div>

         
          </div>
        </div>
        </div>
    </>
  )
}
