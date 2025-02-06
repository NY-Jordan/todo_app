import Layout from "@/presentation/layout/Layout";
import Card from "@/presentation/components/Card/Card";
import ProjectsTable from "@/presentation/components/ProjectsTable";
import DailyTodoCard from "@/presentation/components/DailyTodoCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faNoteSticky, faPlus, faProcedures} from "@fortawesome/free-solid-svg-icons";
import {useResponsive} from "@/Infrastructure/hooks/useResponsive";
import { useEffect, useLayoutEffect } from "react";
import { FetchAllProjects } from "@/Infrastructure/Services/projects/ProjectsService";
import { FetchAllDailyTasks } from "@/Infrastructure/Services/Task/DailyTaskService";
import CustomDatePicker from "@/presentation/components/Calendar/CustomDatePicker";
import { Chart } from "react-google-charts";
import { getDaysOfYear, getMonthsOfYear } from "@/Infrastructure/helpers/utils";
import Day from "react-datepicker/dist/day";
import { useAppSelector } from "@/app/store/hook";
import { fetchCollaborators } from "@/Infrastructure/Services/Task/TaskService";
import { useQuery } from "@tanstack/react-query";
import { ICollaborator } from "@/domain/entities/project.entities";
import { fetchStats, fetUserschCollaborators } from "@/Infrastructure/Services/AppService";
import { IUserStats } from "@/domain/entities/user.entities";
import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";
import CardStats from "@/presentation/components/CardStats";

export default function index() {
  const { isSM} = useResponsive();
    const fecthProjectsState = useAppSelector(state => state.projects).fetch
    const appStatsState = useAppSelector(state => state.app).stats
    const appCollaboratorsState = useAppSelector(state => state.app).collaborators ;

  useLayoutEffect(() => {
    FetchAllProjects();
    fetUserschCollaborators();
  }, [])


  const days = getDaysOfYear(2025);
  const months = getMonthsOfYear();


  return (
  <Layout pageTitle="Dashboard">
   
    <div className='w-full flex gap-3 min-h-[30%] pb-4 max-h-[30%] '>
      <div className="w-1/2 max-h-[30%] ">
        <DailyTodoCard/>
      </div>
      <div className="w-1/2 min-h-[30%] border border-stroke bg-white p-3">
        <div className="mb-2">
          <p className="text-lg font-semibold">Tasks Tracking</p>
          <p></p>
        </div>
        <div className="flex justify-center gap-10">
          {
            months.map((month : string) => {
              return <span>{month}</span>
            })
          }
        </div>
        <div className="w-full   flex  gap-1 justify-center">
          {
            days.reduce((acc : Array<Array<string>>, day : string, index : number) => {
              const columnIndex = Math.floor(index / 10);
                
              if (!acc[columnIndex]) {
                acc[columnIndex] = [];
              }
              acc[columnIndex].push(day);
            
              return acc;
              }, []).map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-1">
                  {
                    column.map((day, dayIndex) => (
                      <div key={dayIndex} className="w-4 h-4 bg-gray-100  border rounded-md tooltip tooltip-top" data-tip={day}>
                      </div>
                    ))
                  }
                </div>
              ))
          }
        </div>
        <div className="w-full flex justify-between mt-5">
          <div className="flex gap-2 items-center">
            <div  className="w-4 h-4 bg-yellow-400  border rounded-md tooltip tooltip-top" ></div>
            <span className="text-sm font-semibold">Activities</span>
          </div>

          <div className="flex items-center gap-2">

              <div className="flex gap-2 items-center">
                <div  className="w-4 h-4 bg-gray-400  border rounded-md tooltip tooltip-top" ></div>
                <span className="text-sm font-semibold">Backlog</span>
              </div>

              <div className="flex gap-2 items-center">
                <div  className="w-4 h-4 bg-blue-400  border rounded-md tooltip tooltip-top" ></div>
                <span className="text-sm font-semibold">Started</span>
              </div>

              <div className="flex gap-2 items-center">
                <div  className="w-4 h-4 bg-orange-400  border rounded-md tooltip tooltip-top" ></div>
                <span className="text-sm font-semibold">In Review</span>
              </div>

              <div className="flex gap-2 items-center">
                <div  className="w-4 h-4 bg-green-400  border rounded-md tooltip tooltip-top" ></div>
                <span className="text-sm font-semibold">Done</span>
              </div>


          </div>
        </div>
      </div>
    </div>
    <div className='mt-2  flex  space-x-4' style={{ width : '100%',  }}>
      <CardStats />
    </div>
   <div className="flex space-x-4 h-[50%]">
      <ProjectsTable />
      <div className="w-[50%] p-5 bg-white shadow-lg border border-stroke rounded-sm">
              <div>
                <span className="text-xl font-semibold">Collaborators</span>
              </div>

              <div className="flex flex-col  gap-7 mt-6 h-full ">
                  {(appCollaboratorsState.data?.collaborators  )  ? appCollaboratorsState.data?.collaborators.map((collaborator : ICollaborator) => {
                    return  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={collaborator.user.picture}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{collaborator.user.username}</div>
                      <div className="text-sm opacity-50">{collaborator.user.email}</div>
                    </div>
                  </div>
                  }) : <></>}
                </div>
      </div>
   </div>
  </Layout>
  );
}


