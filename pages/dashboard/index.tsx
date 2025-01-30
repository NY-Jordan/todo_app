import Layout from "@/presentation/layout/Layout";
import Card from "@/presentation/components/Card/Card";
import ProjectsTable from "@/presentation/components/ProjectsTable";
import DailyTodoCard from "@/presentation/components/DailyTodoCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faNoteSticky, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useResponsive} from "@/Infrastructure/hooks/useResponsive";
import { useEffect } from "react";
import { FetchAllProjects } from "@/Infrastructure/Services/projects/ProjectsService";
import { FetchAllDailyTasks } from "@/Infrastructure/Services/Task/DailyTaskService";
import CustomDatePicker from "@/presentation/components/Calendar/CustomDatePicker";

export default function index() {
  const { isSM} = useResponsive();

  useEffect(() => {
    FetchAllProjects();
  }, [])



  return (
  <Layout pageTitle="Dashboard">
    <div className='w-full flex justify-end mb-2'>
      <button className="btn  bg-indigo-500 hover:bg-indigo-700 text-white"><FontAwesomeIcon icon={faPlus}/> New Note</button>
    </div>
    <div className='w-full flex h-[50%]  '>
      <DailyTodoCard/>
      <div className='w-1/3 ml-5'>
        <div className={'mt-2 ' + (isSM ? "grid mb-6 grid-cols-2 gap-6 " : "grid mb-6 grid-cols-2 gap-6 ")} style={{ width : '100%',  }}>
            <Card title='Projects'   percent='04' />
            <Card  title='Tasks'   percent='40'/>
            <Card title='links'   percent='60' />
          </div>
      </div>
    </div>
    <ProjectsTable />
  </Layout>
  );
}


