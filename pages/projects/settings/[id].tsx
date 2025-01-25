import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/presentation/layout/Layout";
import { useResponsive } from "@/Infrastructure/hooks/useResponsive";
import Card from "@/presentation/components/Card/Card";
import ProjectsTable from "@/presentation/components/ProjectsTable";
import CollaboratorsTab from "@/presentation/components/ProjectSetting/CollaboratorsTab";
import FileTab from "@/presentation/components/ProjectSetting/FileTab";
import TaskTab from "@/presentation/components/ProjectSetting/TaskTab";
import TaskGroups from "@/presentation/components/ProjectSetting/TaskGroups";
import { getProjectCollaborators, getProjectDetails } from "@/Infrastructure/Services/projects/ProjectsService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { type } from "node:os";
import { IProject } from "@/domain/entities/project.entities";
import ProjectSettingLoader from "@/presentation/components/ProjectSettingLoader";
import { useEffect } from "react";

export default function index() {
    const {isTabletOrMobile, isSM} = useResponsive();
    const router  = useRouter();
    const {id} = router.query;

    const fecthProjectDetails = useQuery({
        queryKey: ['projectDetails', id], 
        queryFn: ({ queryKey }) => {
        const [, id] = queryKey;
        if (typeof id === 'string') {
            return getProjectDetails(parseInt(id));
        }
        },
        staleTime: Infinity,
    });

    const projectDetails = fecthProjectDetails.data as IProject 
     
   
  return (
  <Layout pageTitle={`${projectDetails?.name} Settings`}>
    
   {!fecthProjectDetails.isLoading ? <div role="tablist" className="tabs tabs-bordered items-center">
       
        <input type="radio" name="my_tabs_1" role="tab" className="tab w-full" defaultChecked aria-label="Colaborators" />
        <div role="tabpanel" className="tab-content p-10">
            <CollaboratorsTab />
        </div>
        <input type="radio" name="my_tabs_1"  role="tab"  className="tab w-full"  aria-label="Project Document(s)"  />
        <div role="tabpanel" className="tab-content p-10">
            <FileTab />
        </div>
        <input type="radio" name="my_tabs_1"  role="tab"  className="tab w-full"  aria-label="Task Groups"  />
        <div role="tabpanel" className="tab-content p-10">
            <TaskGroups />
        </div>
        <input type="radio" name="my_tabs_1"  role="tab"  className="tab w-full"  aria-label="Tasks"  />
        <div role="tabpanel" className="tab-content p-10">
            <TaskTab />
        </div>

    </div> :
    <ProjectSettingLoader active={fecthProjectDetails.isLoading} />}

  </Layout>
  );
}


