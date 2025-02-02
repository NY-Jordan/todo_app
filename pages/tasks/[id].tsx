import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/presentation/layout/Layout";
import { useResponsive } from "@/Infrastructure/hooks/useResponsive";
import SectionTask from "@/presentation/components/SectionTask/SectionTask";
import AddTask from "@/presentation/components/SectionTask/AddTask";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import {  tasks } from "@/Infrastructure/data/task";
import Dropdown from "@/presentation/components/Dropdown";
import { data } from "@/Infrastructure/data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Reorder } from "framer-motion";
import { useState } from "react";

export default function index() {
  const {isTabletOrMobile, isSM} = useResponsive();
  const handleSelect = (id: string) => {
    console.log(`Selected item with id ${id}`);
  };

  
  return (
  <Layout pageTitle="Manage Your Tasks">
    <div className='pt-4 px-4 dark:text-white'>
          
          <div className='flex justify-between items-center mb-3'>
              {/* filter by user team */}
              <div>
             
                <Dropdown
                  id='person'
                  title='--- please select your team mates ---- '
                  data={data}
                  hasImage
                  style="bg-white"
                 /*  style='bg-white border-gray-300' */
                  /* selectedId='3' */
                  onSelect={(e) => e ? handleSelect(e) : {}}
                />
              </div>

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
                <SectionTask  name='Backlog'  data={tasks.backlog} />
                <SectionTask name='Started' data={tasks.started} />
                <SectionTask  name='In Review'  data={tasks.progress} />
                <SectionTask  name='Done' data={tasks.done}/>          
        </div>
      </div>
       
  </Layout>
  );
}


