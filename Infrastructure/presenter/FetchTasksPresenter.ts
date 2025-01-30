import { useAppSelector } from '@/app/store/hook';
import { ICollaborator, IProject } from '@/domain/entities/project.entities';
import { IPagination, ITask } from '@/domain/entities/task.entities';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react'
import { FetchAllTasks, fetchCollaborators } from '../Services/Task/TaskService';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';

export default function FetchTasksPresenter(id : string | string[] | undefined) {

    const fecthTasksPagination = useAppSelector(state => state.task).fetch.data.pagination as IPagination;
    const [currentPage, setCurrentPage] = useState<number>(fecthTasksPagination?.current_page ?? 1);
    const queryClient = useQueryClient();
    const [projectDetails, setProjectDetails] = useState<IProject|undefined>()
    const [taskGroupSelected, setTaskGroupSelected] = useState<number|undefined>()
    const [phaseSelected, setPhaseSelected] = useState<number|undefined>();
    const createTaskState = useAppSelector(state => state.task).create
    const deleteTaskState = useAppSelector(state => state.task).delete
    const [collaboratorId, setCollaboratorId] = useState<string>();
    const [assignModal, setAssignModal] = useState(false);
    const [assignTask, setAssignTask] = useState<ITask|undefined>(undefined);
    const fecthTasksState = useAppSelector(state => state.task).fetch.data;
    
    
    
        assignTask
    useEffect(() => {
        if (id && typeof id  === 'string') {
          setProjectDetails(queryClient.getQueryData(['projectDetails', id]) as IProject)
        }
      }, [id]);
      
      
      useMemo(() => {
          if (id && typeof id === 'string') {
              FetchAllTasks(parseInt(id),collaboratorId, taskGroupSelected, phaseSelected, currentPage);
          }
      }, [id,currentPage, collaboratorId, taskGroupSelected, phaseSelected])

      useMemo(() => {
          if ((id && typeof id === 'string') ) {
                if ((createTaskState.status && createTaskState.status == StatusStateEnum.success )) {
                    FetchAllTasks(parseInt(id),collaboratorId, taskGroupSelected, phaseSelected, currentPage);

                }
                if (deleteTaskState.status && deleteTaskState.status === StatusStateEnum.success ) {
                    const page = fecthTasksState.tasks.length === 1 && currentPage !== 1 ? currentPage - 1  : currentPage
                    setCurrentPage(page);
                    FetchAllTasks(parseInt(id),collaboratorId, taskGroupSelected, phaseSelected, page);
                }
          }
      }, [id, createTaskState.status, deleteTaskState.status])



   





  const { data, error, isLoading } = useQuery({
      queryKey: ['collaborators', id],
      queryFn: fetchCollaborators,
      staleTime: 10*(60*1000), // 10 mins
    });
  
  const collaborators  = data as ICollaborator[];

  useEffect(() => {
      if (!assignModal) {
          setAssignTask(undefined);
      }
  }, [assignModal])
 
  
  return {
    setAssignTask,
    projectDetails,
    setPhaseSelected,
    setCollaboratorId,
    collaboratorId,
    setAssignModal,
    deleteTaskState,
    assignTask,
    setTaskGroupSelected,
    collaborators,
    fecthTasksPagination,
    currentPage,
    setCurrentPage, 
    assignModal

  }
}
