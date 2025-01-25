import { faCheck, faDownload, faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { mdiClose, mdiFileEdit } from '@mdi/js'
import Icon from '@mdi/react'
import Tag from '../Tag'
import { motion } from "framer-motion"
import AddTaskForm from '../AddTask/AddTaskForm'
import AssignTaskToUserModal from '../Task/AssignTaskToUserModal'
import { FetchAllTasks, fetchCollaborators } from '@/Infrastructure/Services/Task/TaskService'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/app/store/hook'
import { IPagination, ITask } from '@/domain/entities/task.entities'
import { TaskPhases, TaskPhasesEnum } from '@/domain/enum/TaskEnum'
import moment, { now } from 'moment'
import DeleteTaskModal from '../Task/DeleteTaskModal'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProjectCollaborators } from '@/Infrastructure/Services/projects/ProjectsService'
import { IUser } from '@/domain/entities/user.entities'
import Dropdown from '../Dropdown'
import { data } from '@/Infrastructure/data/data'
import { ICollaborator, IProject } from '@/domain/entities/project.entities'
import useAuth from '@/Infrastructure/hooks/useAuth'
import { ITaskGroup } from '@/domain/entities/task.group.entities'
import Pagination from '../Pagination/Pagination'


export default function TaskTab() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [assignModal, setAssignModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState<number>();
    const [assignTask, setAssignTask] = useState<ITask>();
    const router = useRouter();
    const {id} = router.query;
    const fecthTasksState = useAppSelector(state => state.task).fetch.data;
    const fecthTasksPagination = useAppSelector(state => state.task).fetch.data.pagination as IPagination;
    const [collaboratorId, setCollaboratorId] = useState<string>();
    const {user} = useAuth();
    const queryClient = useQueryClient();
    const tasksGroupState = useAppSelector(state => state.taskGroup).taskGroups as ITaskGroup[]
    const [projectDetails, setProjectDetails] = useState<IProject|undefined>()
    const [taskGroupSelected, setTaskGroupSelected] = useState<number|undefined>()
    const [phaseSelected, setPhaseSelected] = useState<number|undefined>();
    const [currentPage, setCurrentPage] = useState<number>(fecthTasksPagination?.current_page ?? 1);
      
      useEffect(() => {
          if (id && typeof id  === 'string') {
            setProjectDetails(queryClient.getQueryData(['projectDetails', id]) as IProject)
          }
        }, [id]);
        
        
        useEffect(() => {
            if (id && typeof id === 'string') {
                FetchAllTasks(parseInt(id),collaboratorId, taskGroupSelected, phaseSelected, currentPage);
            }
        }, [id,currentPage, collaboratorId, taskGroupSelected, phaseSelected])


    const { data, error, isLoading } = useQuery({
        queryKey: ['collaborators', id],
        queryFn: fetchCollaborators,
        staleTime: 10*(60*1000), // 10 mins
      });
    
    const collaborators  = data as ICollaborator[];

    
   
    
  return (
    <div className='flex justify-between lg:flex-row md:flex-col'>
      <div className='w-full'>
            <div className='mb-7 flex justify-between '>
                <button onClick={() => setShowAddTask(true)} className='btn bg-indigo-500 hover:bg-indigo-700 text-white'><FontAwesomeIcon icon={faPlus} />  New Task</button>
               <div className='flex w-[80%] justify-end space-x-3'>
                <select onChange={(e) => setPhaseSelected(parseInt(e.target.value))} className="select select-bordered w-full max-w-xs">
                        <option  value={undefined} selected>All</option>
                        <option  value={TaskPhases.Backlog}>Backlog</option>
                        <option value={TaskPhases.Started}>Started</option>
                        <option value={TaskPhases.InProgress}>In Review</option>
                        <option value={TaskPhases.Done}>Done</option>
                    </select>
                    <select onChange={(e) => setTaskGroupSelected(parseInt(e.target.value))} className="select select-bordered w-full max-w-xs">
                        <option  value={undefined}selected>All</option>
                        {tasksGroupState && tasksGroupState.map((taskGroup) => {
                            return <option value={taskGroup.id} >{taskGroup.name}</option>
                        })}
                    </select>
                    {collaborators && <Dropdown
                    id='person'
                    title='--- please select your team mates ---- '
                    data={collaborators.map((collaborator : ICollaborator) => {
                        return {
                            id: collaborator.user.id.toString(),
                            name: collaborator.user.username,
                            imageUrl: collaborator.user.picture
                        }
                    })}
                    hasImage
                    style="bg-white"
                    /*  style='bg-white border-gray-300' */
                    selectedId={collaboratorId}
                    onSelect={(e) => { setCollaboratorId(e ? e : undefined) }}
                    />}
               </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Assignee</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                   {fecthTasksState.tasks && fecthTasksState.tasks.length ? fecthTasksState.tasks.map((task : ITask, key : number) => {
                    return  <tr className=''>
                    <td className='text-sm space-x-3 py-5 '>
                        <span className='border border-gray-500 p-2 text-gray-500 rounded-full'>{((fecthTasksPagination?.current_page - 1) * fecthTasksPagination?.per_page + (key + 1)).toString().padStart(2, '0')}</span>
                        <span className='text-[16px]'>{task.title}</span>
                    </td>
                    <td className='text-sm'> 
                        <div className=" -space-x-4 rtl:space-x-reverse">

                            {(task.assigned_user && task.assigned_user.length) ? task.assigned_user.map((user : IUser, key : number) => {
                                return <a onClick={() =>{ setAssignModal(true); setAssignTask(task)}}  href='#'  className={`avatar tooltip  tooltip-top`} data-tip={user.name}>
                                <div className=" rounded-full w-9">
                                    <img src={user.picture} />
                                </div>
                            </a>
                            }) : <a onClick={() =>{ setAssignModal(true); setAssignTask(task)}}  href='#'  className="avatar tooltip  tooltip-top" data-tip={'None...'}>
                                <div className=" rounded-full w-9">
                                    <img src={"/images/Default_pfp.svg.png"} />
                                </div>
                            </a>}
                        </div>
                    </td>
                    <td className='text-sm'>{moment(task.created_at).format('DD MMMM YYYY ')}</td>
                  {task.phase.name === TaskPhasesEnum.Backlog ?  <td className='text-sm'><span className='bg-gray-600 px-3 py-1 text-white rounded-full'>{task.phase.name}</span> </td> :
                    (task.phase.name === TaskPhasesEnum.Started  ?<td className='text-sm'><span className='bg-blue-600 px-3 py-1 text-white rounded-full'>{task.phase.name}</span> </td> :
                    (task.phase.name === TaskPhasesEnum.Done ?<td className='text-sm'><span className='bg-green-600 px-3 py-1 text-white rounded-full'>{task.phase.name}</span> </td> :
                    <td className='text-sm'><span className='bg-orange-600 px-3 py-1 text-white rounded-full'>{task.phase.name}</span> </td>))}
                    <td className='space-x-8 p-3'>
                        <a href='#' onClick={() => {
                            setDeleteTaskId(task.id);
                            setDeleteModal(true)
                        }} className='text-red-500 tooltip' data-tip='delete'>
                            <FontAwesomeIcon icon={faTrash} size='lg' />
                        </a>
                        <a href='#' className='text-black tooltip' data-tip='edit'>
                            <FontAwesomeIcon icon={faEdit} size='lg'/>
                        </a>
                        <a href='#' className='text-indigo-600 tooltip' data-tip='view'>
                            <FontAwesomeIcon icon={faEye} size='lg'/>
                        </a>
                        
                    </td>
                </tr>
                   }) : <tr>
                   <td></td>
                   <td></td>
                   <td><div className='w-full text-red-600 text-center'>No entries found</div></td>
                   <td></td>
                 </tr>}
                    </tbody>
                </table>
            </div>

            {fecthTasksPagination && fecthTasksPagination?.total_pages >1 && <Pagination 
            onChange={(page : number) => setCurrentPage(page)} 
            totalPages={11} 
            currentPage={fecthTasksPagination.current_page} /> }
      </div>
      
     <AddTaskForm active={showAddTask} setActive={setShowAddTask} />
    {assignTask && <AssignTaskToUserModal task={assignTask} active={assignModal} setActive={setAssignModal} />}
     {deleteTaskId && <DeleteTaskModal taskId={deleteTaskId} active={deleteModal} setActive={setDeleteModal} />}
    </div>
  )
}
