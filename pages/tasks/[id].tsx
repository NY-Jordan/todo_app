import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/presentation/layout/Layout";
import { useResponsive } from "@/Infrastructure/hooks/useResponsive";
import SectionTask from "@/presentation/components/SectionTask/SectionTask";
import AddTask from "@/presentation/components/SectionTask/AddTask";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import {  items } from "@/Infrastructure/data/task";
import Dropdown from "@/presentation/components/Dropdown";
import { data } from "@/Infrastructure/data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchCollaboratorsTasks } from "@/Infrastructure/Services/Task/TaskService";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/Infrastructure/helpers/HelperUtils";
import { UserDetailsEntitie } from "@/domain/entities/user.entities";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { ITaskBoard } from "@/domain/entities/task.entities";
import { TaskPhasesEnum } from "@/domain/enum/TaskEnum";
import { fetchCollaboratorsTasksFailure, fetchCollaboratorsTasksInit } from "@/app/Actions/TaskActions";

export default function index() {
  const {isTabletOrMobile, isSM} = useResponsive();
  const handleSelect = (id: string) => {
    console.log(`Selected item with id ${id}`);
  };
  const router = useRouter();
  const {id}= router.query;
  const user = getCurrentUser()  as UserDetailsEntitie
  const CollaboratorTasksState  = useAppSelector(state => state.task).collaboratorsTasks
  const tasks = CollaboratorTasksState.data.tasks as  ITaskBoard;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id && typeof id === 'string' && user) {
      dispatch(fetchCollaboratorsTasksInit());
     setTimeout(() => {
      fetchCollaboratorsTasks(parseInt(id), user.id)
     }, 1000);
    }
  }, [id]);

  
 
  
  return (
  <Layout pageTitle="Manage Your Tasks">
    <div className='pt-4 px-4 dark:text-white'>
          
          <div className='flex justify-end items-center mb-3'>
              

              {/* research section tasks */}
              <div className='flex flex-row justify-end  mb-4 items-center'>
                <div className='flex flex-row items-center '>
                  <input type="text" placeholder="Search..." className="input   input-sm input-bordered w-full max-w-xs" />
                  <a href='#' className='bg-white p-1 relative right-8 '>
                      <Icon path={mdiMagnify}  size={4/5}/>
                  </a> 
                </div>
                <div className='flex flex-row space-x-2'>
                  <input type="date" placeholder="Search..." className="input   input-sm input-bordered w-full max-w-xs" />
                </div>
              </div>
           </div>

           <div className="flex justify-end space-x-4">
              
                <div className="tooltip" data-tip="Previous Page">
                  <button className="btn"><FontAwesomeIcon icon={faChevronLeft} /></button>
                </div>
                <div className="tooltip" data-tip="Next Page">
                  <button className="btn"><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
           </div>


          <div className={'flex   overflow-y-auto   space-x-8  '+(isSM ? 'flex-col' : 'flex-row')} > 
          {(tasks && tasks[TaskPhasesEnum.Backlog] ) ? <SectionTask  name='Backlog'  data={tasks[TaskPhasesEnum.Backlog]} /> :  <SectionTask  name='Backlog'  data={[]} /> }
          {(tasks && tasks[TaskPhasesEnum.Started] ) ? <SectionTask  name='Started'  data={tasks[TaskPhasesEnum.Started]} /> :  <SectionTask  name='Started'  data={[]} /> }
          {(tasks && tasks[TaskPhasesEnum.InReview] ) ? <SectionTask  name='In Review'  data={tasks[TaskPhasesEnum.InReview]} /> : <SectionTask  name='In Review'  data={[]} /> }
          {(tasks && tasks[TaskPhasesEnum.Done] ) ? <SectionTask  name='Done'  data={tasks[TaskPhasesEnum.Done]} /> : <SectionTask  name='Done'  data={[]} /> }
        </div>
      </div>
       
  </Layout>
  );
}


