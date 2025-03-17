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
import { useEffect, useMemo, useState } from "react";
import { fetchCollaboratorsTasks } from "@/Infrastructure/Services/Task/TaskService";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/Infrastructure/helpers/HelperUtils";
import { UserDetailsEntitie } from "@/domain/entities/user.entities";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import "react-datepicker/dist/react-datepicker.css";
import { ITaskBoard } from "@/domain/entities/task.entities";
import { TaskPhasesEnum } from "@/domain/enum/TaskEnum";
import { fetchCollaboratorsTasksFailure, fetchCollaboratorsTasksInit } from "@/app/Actions/TaskActions";
import { convertToISO } from "@/Infrastructure/helpers/utils";
import DatePicker from "react-datepicker";
import moment from "moment";
import TasksGraph from "@/presentation/components/Task/TasksGraph";

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
  const [assingedDate, setAssingedDate] = useState<Date|null>(new Date());
  const [keysWord, setKeysWord] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string|undefined>(keysWord);

  useEffect(() => {
    if (id && typeof id === 'string' && user) {
      dispatch(fetchCollaboratorsTasksInit());
      const date = moment(assingedDate?.toString()).format('YYYY-MM-DD');
     setTimeout(() => {
      fetchCollaboratorsTasks(parseInt(id), user.id, date, debouncedSearch)
     }, 1000);
    }
  }, [id, debouncedSearch, assingedDate]);

  useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(keysWord);
    }, 500); 
  
      return () => {
        clearTimeout(handler); 
      };
    }, [keysWord]);
  
  return (
  <Layout pageTitle="Manage Your Tasks">
    <div className='pt-4 px-4 dark:text-white'>
          
          <div className='flex justify-end items-center mb-3'>
              

              {/* research section tasks */}
              <div className='flex flex-row justify-end  mb-4 items-center'>
                <div className='flex flex-row items-center '>
                  <input type="text" placeholder="Search..." onChange={(e) => setKeysWord(e.target.value)} className="input   input-sm input-bordered rounded-xs w-full max-w-md" />
                  <a href='#' className='bg-white p-1 relative right-8 '>
                      <Icon path={mdiMagnify}  size={4/5}/>
                  </a> 
                </div>
                <div className='flex flex-row space-x-2'>
                   <div className='flex items-center justify-center'>
                      <DatePicker
                        selected={assingedDate}
                        onChange={(date) => setAssingedDate(date)}
                        className='btn btn-sm'
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a valid date"
                      />
                    </div>
                </div>
              </div>
           </div>

          {/*  <div className="flex justify-end space-x-4">
              
                <div className="tooltip" data-tip="Previous Page" >
                  <button className="btn"><FontAwesomeIcon icon={faChevronLeft} /></button>
                </div>
                <div className="tooltip" data-tip="Next Page">
                  <button className="btn"><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
           </div> */}


         {tasks && <TasksGraph tasks={tasks} />}
      </div>
       
  </Layout>
  );
}


