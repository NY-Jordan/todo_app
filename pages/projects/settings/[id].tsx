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
import { useEffect } from "react";
import PageDataLoader from "@/presentation/components/PageDataLoader";

export default function index() {
    const {isTabletOrMobile, isSM} = useResponsive();
    const router  = useRouter();
    const {id} = router.query;
    const fecthProjectDetails = useQuery({
        queryKey: ['projectDetails', id],
        queryFn: () => getProjectDetails(Number(id)),
        enabled: !!id, 
        staleTime: Infinity, 
      });

    const projectDetails = fecthProjectDetails.data as IProject 
     
   
  return (
    <Layout pageTitle={`${projectDetails?.name} Settings`}>
        
    {!fecthProjectDetails.isLoading ? <div role="tablist" className="tabs tabs-bordered items-center dark:text-white">
        
            <input type="radio" name="my_tabs_1" role="tab" className="tab w-full dark:text-white" defaultChecked aria-label="Colaborators" />
            <div role="tabpanel" className="tab-content p-10">
                <CollaboratorsTab />
            </div>
            <input type="radio" name="my_tabs_1"  role="tab"  className="tab w-full dark:text-white"  aria-label="Project Document(s)"  />
            <div role="tabpanel" className="tab-content p-10">
                <FileTab />
            </div>
            <input type="radio" name="my_tabs_1"  role="tab"  className="tab w-full dark:text-white"  aria-label="Task Groups"  />
            <div role="tabpanel" className="tab-content p-10">
                <TaskGroups />
            </div>
            <input type="radio" name="my_tabs_1"  role="tab"  className="tab w-full dark:text-white"  aria-label="Tasks"  />
            <div role="tabpanel" className="tab-content p-10">
                <TaskTab />
            </div>
        </div> :
        <PageDataLoader active={fecthProjectDetails.isLoading} />}

    </Layout>
  );
}


