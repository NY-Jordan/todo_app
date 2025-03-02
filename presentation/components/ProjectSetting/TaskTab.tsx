import { faArrowTrendUp, faCheck, faClose, faDownload, faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useMemo, useState } from 'react'
import { mdiClose, mdiFileEdit } from '@mdi/js'
import Icon from '@mdi/react'
import Tag from '../Tag'
import { motion } from "framer-motion"
import AddTaskForm from '../AddTask/AddTaskForm'
import AssignTaskToUserModal from '../Task/AssignTaskToUserModal'
import { assignTaskToUsers, FetchAllTasks, fetchCollaborators } from '@/Infrastructure/Services/Task/TaskService'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
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
import ViewTaskModal from '../Task/ViewTaskModal'
import UpdateTaskForm from '../AddTask/UpdateTaskModal'
import UpdateTaskModal from '../AddTask/UpdateTaskModal'
import Pagination from '../Pagination/Pagination'
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum'
import FetchTasksPresenter from '@/Infrastructure/presenter/FetchTasksPresenter'
import { initAssignTaskToUser, resetAssignTaskToUserState } from '@/app/Actions/TaskActions'
import toast from 'react-hot-toast'
import AssignTaskPresenter from '@/Infrastructure/presenter/AssignTaskPresenter'
import RescheduleTask from '../Task/RescheduleTaskModal'
import RescheduleTaskModal from '../Task/RescheduleTaskModal'
import { convertToLocalDate } from '@/Infrastructure/helpers/utils'


export default function TaskTab() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [RescheduleModal, setRescheduleModal] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState<number>();
    const [viewTask, setViewTask] = useState<ITask|undefined>(undefined);
    const [viewModal, setViewModal] = useState<boolean>(false);

    const [RescheduleTask, setRescheduleTask] = useState<ITask|undefined>(undefined);
    const [updateTask, setUpdateTask] = useState<ITask|undefined>(undefined);
    const router = useRouter();
    const {id} = router.query;
    const fecthTasksState = useAppSelector(state => state.task).fetch.data;
    const tasksGroupState = useAppSelector(state => state.taskGroup).taskGroups as ITaskGroup[]
    const dispatch = useAppDispatch();
    const assignTaskState = useAppSelector(state => state.task).assign_task

    
    const  {
        setAssignTask,
        setPhaseSelected,
        setCollaboratorId,
        setAssignModal,
        collaboratorId,
        assignTask,
        setTaskGroupSelected,
        collaborators,
        fecthTasksPagination,
        currentPage,
        setCurrentPage, 
        assignModal
    
      } = FetchTasksPresenter(id)


      const { handleAssignTaskAction } = AssignTaskPresenter();

    useEffect(() => {
        if (assignTaskState.status === StatusStateEnum.success && !assignTaskState.task.assigned_user.length) {
            toast.success('Task Successfully Unassigned');
          }
    }, [assignTaskState.status])
    
  return (
    <div className='flex justify-between lg:flex-row md:flex-col'>
      <div className='w-full'>
            <div className='mb-7 flex justify-between '>
                <button onClick={() => {setShowAddTask(true); setUpdateModal(false)}} className='btn  bg-indigo-500 hover:bg-indigo-700 text-white'><FontAwesomeIcon icon={faPlus} />  New Task</button>
               <div className='flex w-[80%] gap-4 flex-wrap justify-end space-x-3'>
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
                    title='-- Choose a team mate --'
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
                        <th>Schedule at</th>
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
                    <td className='text-sm flex group items-center space-x-5'> 
                        <div className=" -space-x-4   rtl:space-x-reverse ">

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
                        {(task.assigned_user && task.assigned_user.length) ? <a onClick={() => {
                            if (id && typeof id === 'string') {
                                handleAssignTaskAction(task.id, parseInt(id), [])
                            }
                        }} data-tip='Unassign this task' className=' hover:cursor-pointer tooltip tooltip-right invisible group-hover:visible '><FontAwesomeIcon icon={faClose} size='sm' /></a> :<></>}

                    </td>
                    <td className='text-sm'>{task.assigned_user.length ?  convertToLocalDate(task.assigned_user[0].schedule_at, 'DD MMMM  YYYY') : '-'}</td>

                  {task.task_phase.name === TaskPhasesEnum.Backlog ?  <td className='text-sm'><span className='bg-gray-600 px-3 py-1 text-white rounded-full'>{task.task_phase.name}</span> </td> :
                    (task.task_phase.name === TaskPhasesEnum.Started  ?<td className='text-sm'><span className='bg-blue-600 px-3 py-1 text-white rounded-full'>{task.task_phase.name}</span> </td> :
                    (task.task_phase.name === TaskPhasesEnum.Done ?<td className='text-sm'><span className='bg-green-600 px-3 py-1 text-white rounded-full'>{task.task_phase.name}</span> </td> :
                    <td className='text-sm'><span className='bg-orange-600 px-3 py-1 text-white rounded-full'>{task.task_phase.name}</span> </td>))}
                    <td className='space-x-8 p-3'>
                        <a href='#' onClick={() => {
                            setDeleteTaskId(task.id);
                            setDeleteModal(true)
                        }} className='text-red-500 tooltip' data-tip='Delete'>
                            <FontAwesomeIcon icon={faTrash} size='lg' />
                        </a>
                        <a href='#' onClick={() => {setShowAddTask(false);setUpdateTask(task); setUpdateModal(true)}}  className='text-black tooltip' data-tip='Edit'>
                            <FontAwesomeIcon icon={faEdit} size='lg'/>
                        </a>
                        <a href='#'  onClick={() => {setViewTask(task); setViewModal(true)}} className='text-indigo-600 tooltip' data-tip='View'>
                            <FontAwesomeIcon icon={faEye} size='lg'/>
                        </a>
                       {task.assigned_user.length ? <a href='#'  onClick={() => {setRescheduleTask(task); setRescheduleModal(true)}} className='text-black tooltip' data-tip='Reschedule'>
                            <FontAwesomeIcon icon={faArrowTrendUp} size='lg'/>
                        </a> : <></>}
                        
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
            name='tasks'
            onChange={(page : number) => setCurrentPage(page)} 
            totalPages={fecthTasksPagination.total_pages} 
            currentPage={currentPage} /> }
      </div>
      
     <AddTaskForm active={showAddTask} setActive={setShowAddTask} />
    {updateTask ? <UpdateTaskModal task={updateTask} active={updateModal} setActive={setUpdateModal} /> : <></>}
    {assignTask ? <AssignTaskToUserModal task={assignTask} active={assignModal} setActive={setAssignModal} /> : <></>}
     {deleteTaskId && <DeleteTaskModal taskId={deleteTaskId} active={deleteModal} setActive={setDeleteModal} />}
     {viewTask && <ViewTaskModal task={viewTask} active={viewModal} setActive={setViewModal} />}
     {RescheduleTask && <RescheduleTaskModal task={RescheduleTask} active={RescheduleModal} setActive={setRescheduleModal} />}
    </div>
  )
}
