import { faDownload, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CreateTaskGroupModal from '../Projects/CreateTaskGroupModal'
import { fecthTaskGroupsProject } from '@/Infrastructure/Services/TaskGroup/TaskGroupService';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/app/store/hook';
import { ITaskGroup } from '@/domain/entities/task.group.entities';
import { updateTaskGroup } from '../../../Infrastructure/Services/TaskGroup/TaskGroupService';
import UpdateTaskGroupModal from '../Projects/UpdateTaskGroupModal';
import DeleteTaskGroupModal from '../Projects/DeleteTaskGroupModal ';

export default function TaskGroups() {
    const [createModal, setCreateModal]  = useState<boolean>(false);
    const fetchTaskGroupState = useAppSelector(state  => state.taskGroup).taskGroups
    const router  = useRouter();
    const [taskGroupToUpdate, setTaskGroupToUpdate]   = useState<ITaskGroup|undefined>();
    const [taskGroupToDelete, setTaskGroupToDelete]   = useState<ITaskGroup|undefined>();
    const [updateModal, setUpdateModal]   = useState<boolean>(false);
    const [deleteModal, setDeleteModal]   = useState<boolean>(false);
    const {id} = router.query;
    useEffect(() => {
        if (id && typeof id  === 'string') {
            fecthTaskGroupsProject(parseInt(id))
        }
    }, [id])
  return (
  <>
      <div>
      <div className='mb-4'>
        <button onClick={() => setCreateModal(true)} className='btn bg-indigo-500 hover:bg-indigo-700 text-white'><FontAwesomeIcon icon={faPlus} />  Add Task Group</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead>
            <tr>
                <th>Name</th>
                <th>Created At</th>
                <th>Backlog</th>
                <th>Started</th>
                <th>In Review</th>
                <th>Done</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
{ (fetchTaskGroupState && fetchTaskGroupState.length)    ? fetchTaskGroupState.map((taskGroup : ITaskGroup, key : number) => {
    return  <tr key={key}>
    <th className='text-sm'>{taskGroup.name}</th>
    <td className='text-sm'> 25 June 2025</td>
    <td className='text-sm'>{taskGroup.backlog}</td>
    <td className='text-sm'>{taskGroup.started}</td>
    <td className='text-sm'>{taskGroup.in_review}</td>
    <td className='text-sm'>{taskGroup.done}</td>
    <td className='space-x-8 p-3'>
        
        <a href='#' onClick={() => {
            setUpdateModal(true);
            setTaskGroupToUpdate(taskGroup);
        }} className='text-indigo-500 tooltip' data-tip='edit'>
            <FontAwesomeIcon icon={faEdit} size='lg'/>
        </a>
        <a href='#' onClick={() => {
            setDeleteModal(true);
            setTaskGroupToDelete(taskGroup);
        }}  className='text-red-500 tooltip' data-tip='delete'>
            <FontAwesomeIcon icon={faTrash} size='lg' />
        </a>
    </td>
</tr>
})          :  <tr>
                <td></td>
                <td></td>
                <td><div className='w-full text-red-600 text-center'>No entries found</div></td>
                <td></td>
              </tr>}
              
            </tbody>
        </table>
    </div>
    </div>
    <CreateTaskGroupModal active={createModal} setActive={setCreateModal} />
   {taskGroupToUpdate && <UpdateTaskGroupModal active={updateModal} setActive={setUpdateModal} TaskGroup={taskGroupToUpdate} />}
   {taskGroupToDelete && <DeleteTaskGroupModal active={deleteModal} setActive={setDeleteModal} taskGroup={taskGroupToDelete} />}
  </>
  )
}
