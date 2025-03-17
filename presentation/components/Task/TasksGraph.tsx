import { ITask, ITaskBoard } from '@/domain/entities/task.entities'
import { TaskPhasesEnum } from '@/domain/enum/TaskEnum'
import React from 'react'
import SectionTask from '../SectionTask/SectionTask'
import { useResponsive } from '@/Infrastructure/hooks/useResponsive';

export default function TasksGraph({tasks, showTaskFooter =false} : {tasks : ITaskBoard, showTaskFooter? : boolean}) {
      const {isTabletOrMobile, isSM} = useResponsive();
    
  return (
   <div className={'flex w-full overflow-x-hidden h-full overflow-y-hidden    space-x-8  '+(isSM ? 'flex-col' : 'flex-row')} > 
             <div className=' lg:w-1/4 xs:w-full sm:w-1/2'>
              {(tasks && tasks[TaskPhasesEnum.Backlog] ) ? <SectionTask  showTaskFooter={showTaskFooter} name='Backlog'  data={tasks[TaskPhasesEnum.Backlog]} /> :  <SectionTask  name='Backlog'  data={[]} /> }
             </div>
             <div className=' lg:w-1/4 xs:w-full sm:w-1/2'>
             {(tasks && tasks[TaskPhasesEnum.Started] ) ? <SectionTask showTaskFooter={showTaskFooter}  name='Started'  data={tasks[TaskPhasesEnum.Started]} /> :  <SectionTask  name='Started'  data={[]} /> }

             </div>
             <div className=' lg:w-1/4 xs:w-full sm:w-1/2'>
             {(tasks && tasks[TaskPhasesEnum.InReview] ) ? <SectionTask  showTaskFooter={showTaskFooter} name='In Review'  data={tasks[TaskPhasesEnum.InReview]} /> : <SectionTask  name='In Review'  data={[]} /> }

             </div>
             <div className=' lg:w-1/4 xs:w-full sm:w-1/2'>
             {(tasks && tasks[TaskPhasesEnum.Done] ) ? <SectionTask showTaskFooter={showTaskFooter}   name='Done'  data={tasks[TaskPhasesEnum.Done]} /> : <SectionTask  name='Done'  data={[]} /> }

             </div>

     </div>
  )
}
