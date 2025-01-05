import { faGear, faPlus, faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import CreateProjectsModal from "./Projects/CreateProjectsModal";
import { useState } from "react";
import { useAppSelector } from "@/app/store/hook";
import { IProject } from "@/domain/entities/project.entities";
import DeleteProjectModal from "./Projects/DeleteProjectModal";


const ProjectsTable = () => {
    const router  = useRouter();
    const [createProjectModal, setCreateProjectModal] = useState<boolean>(false)
    const [deleteProjectModal, setDeleteProjectModal] = useState<boolean>(false);
    const [deleteProjectId, setDeleteProjectId] = useState<number>();
    const fecthProjectsState = useAppSelector(state => state.projects).fetch

 
  return (
    <>
         <div className="rounded-sm shadow-lg border border-stroke bg-white px-5 pb-2.5 pt-6  dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            My Projects
        </h4>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
           <button onClick={() => setCreateProjectModal(true)} className="btn bg-indigo-500 hover:bg-indigo-700 text-white"><FontAwesomeIcon icon={faPlus} /> New Project</button>
        </h4>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Project
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Collaborators
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tasks
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              files
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              
            </h5>
          </div>
        </div>

        {(fecthProjectsState.data?.projects && fecthProjectsState.data?.projects?.length) ? fecthProjectsState.data.projects.map((project : IProject, key : number) => (
          <div
            className={`grid grid-cols-3  sm:grid-cols-5 ${
              key === fecthProjectsState.data.projects.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
               {project.logo && <img src={project.logo} alt="Brand" width={68} height={68} />}
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {project.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{project.collaborators}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{project.tasks}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">00</p>
            </div>

            <div className="hidden items-center space-x-6 justify-center p-2.5 sm:flex xl:p-5">
              <a className="tooltip hover:cursor-pointer" onClick={() => router.push(`/projects/settings/${project.id}`)} data-tip='Settings'>
                <FontAwesomeIcon icon={faGear} />
              </a>
             {project.is_admin ? <a className="tooltip hover:cursor-pointer" onClick={() => {
                  setDeleteProjectModal(true);
                  setDeleteProjectId(project.id);
              }} data-tip='Delete'>
                <FontAwesomeIcon icon={faTrash} color="red" />
              </a> :
              <a className="tooltip hover:cursor-pointer" onClick={() => router.push(`/projects/settings/${project.id}`)} data-tip='Left  Project'>
                <FontAwesomeIcon icon={faUndo}  color="red" />
              </a>}
            </div>
          </div> 
          
          )) :  <div className="text-red-500 w-full text-center mb-4">No Project Yet</div>

        }
      </div>
    </div>
    <CreateProjectsModal active={createProjectModal} setActive={setCreateProjectModal} />
    {deleteProjectId  && <DeleteProjectModal active={deleteProjectModal} projectId={deleteProjectId} setActive={setDeleteProjectModal} />}
    </>
   
  );
};

export default ProjectsTable;
