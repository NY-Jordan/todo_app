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

export default function index() {
  const {isTabletOrMobile, isSM} = useResponsive();

  return (
  <Layout pageTitle="isiQuest Settings">
    
    <div role="tablist" className="tabs tabs-bordered items-center">
        <input type="radio" name="my_tabs_1" role="tab" className="tab w-full " aria-label="About The Projects" defaultChecked />
        <div role="tabpanel" className="tab-content p-10">Tab content 1</div>
        <input type="radio" name="my_tabs_1" role="tab" className="tab w-full" aria-label="Basic Update"  />
        <div role="tabpanel" className="tab-content p-10">
                <form className="space-y-4  w-1/2">
                    <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" className="grow" placeholder="Daisy" />
                    </label>
                   
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text-alt">About</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </label>
                </form>
        </div>

        <input type="radio" name="my_tabs_1" role="tab" className="tab w-full" aria-label="Colaborators" />
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


    </div>
    
  </Layout>
  );
}


