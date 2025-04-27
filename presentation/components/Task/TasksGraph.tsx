import { ITask, ITaskBoard } from '@/domain/entities/task.entities'
import { TaskPhasesEnum } from '@/domain/enum/TaskEnum'
import React from 'react'
import SectionTask from '../SectionTask/SectionTask'
import { useResponsive } from '@/Infrastructure/hooks/useResponsive';
import {DndContext, DragEndEvent} from '@dnd-kit/core'
import { useAppDispatch } from '@/app/store/hook';
import { initChangeTaskPhaseState } from '@/app/Actions/TaskActions';
import { changeTaskPhase } from '@/Infrastructure/Services/Task/TaskService';


export default function TasksGraph({tasks, showTaskFooter =false} : {tasks : ITaskBoard, showTaskFooter? : boolean}) {
      const {isTabletOrMobile, isSM} = useResponsive();
      const dispatch = useAppDispatch();

      function  handleDragEnd (event : DragEndEvent) {
        const {over, active } = event;
         if (!over) return ; 
         const taskId = active.id as number ;
         const previousPhase = active.data.current?.previousPhase as TaskPhasesEnum ;
         const newStatus = over.id as TaskPhasesEnum ;
         dispatch(initChangeTaskPhaseState());
         changeTaskPhase(taskId,previousPhase, newStatus);
      }

  return (
   <DndContext onDragEnd={handleDragEnd}>
      <div className={'flex w-full overflow-x-hidden h-full overflow-y-hidden    space-x-8  '+(isSM ? 'flex-col' : 'flex-row')} > 
              <div className=' lg:w-1/4 xs:w-full sm:w-1/2'>
                {(tasks && tasks[TaskPhasesEnum.Backlog] ) ? <SectionTask id={TaskPhasesEnum.Backlog}  showTaskFooter={showTaskFooter} name='Backlog'  tasks={tasks[TaskPhasesEnum.Backlog]} /> :  <SectionTask id={TaskPhasesEnum.Backlog} name='Backlog'  tasks={[]} /> }
              </div>
              <div className=' lg:w-1/4 xs:w-full sm:w-1/2'>
              {(tasks && tasks[TaskPhasesEnum.Started] ) ? <SectionTask id={TaskPhasesEnum.Started} showTaskFooter={showTaskFooter}  name='Started'  tasks={tasks[TaskPhasesEnum.Started]} /> :  <SectionTask id={TaskPhasesEnum.Started}   name='Started'  tasks={[]} /> }

              </div>
              <div className=' lg:w-1/4 xs:w-full sm:w-1/2'>
              {(tasks && tasks[TaskPhasesEnum.InReview] ) ? <SectionTask  id={TaskPhasesEnum.InReview} showTaskFooter={showTaskFooter} name='In Review'  tasks={tasks[TaskPhasesEnum.InReview]} /> : <SectionTask id={TaskPhasesEnum.InReview}  name='In Review'  tasks={[]} /> }

              </div>
              <div className=' lg:w-1/4 xs:w-full sm:w-1/2'>
              {(tasks && tasks[TaskPhasesEnum.Done] ) ? <SectionTask id={TaskPhasesEnum.Done} showTaskFooter={showTaskFooter}   name='Done'  tasks={tasks[TaskPhasesEnum.Done]} /> : <SectionTask  id={TaskPhasesEnum.Done} name='Done'  tasks={[]} /> }

              </div>

      </div>
   </DndContext>
  )
}
