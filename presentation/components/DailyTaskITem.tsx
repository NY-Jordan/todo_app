import { faArrowTrendUp, faEdit , faEye, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import DeleteProjectModal from './Projects/DeleteProjectModal';
import { ITask } from '@/domain/entities/task.entities';
import DeleteDailyTaskModal from './Task/Daily/DeleteDailyTaskModal';
import UpdateDailyTaskModal from './Task/Daily/UpdateDailyTaskModal';
import { updateDailyTaskPhase } from '../../Infrastructure/Services/Task/DailyTaskService';
import { TaskPhases } from '@/domain/enum/TaskEnum';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import toast from 'react-hot-toast';
import { resetUpdateDailyTaskPhase } from '@/app/Actions/DailyTaskActions';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';
import ViewTaskModal from './Task/ViewTaskModal';
import RescheduleDailyTaskModal from './Task/Daily/RescheduleDailyTaskModal';

export default function DailyTaskITem({task} : {task :ITask}) {
  const dateFormat  = moment(task.updated_at).format('DD, MMMM YYYY');;
  const dateTime  = moment(task.updated_at).format('HH::mm');
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false); 
  const [updateTaskModal, setUpdateTaskModal] = useState<boolean>(false); 
  const [viewTask, setViewTask] = useState<ITask|undefined>(undefined);
  const [redescheduleTask, setRescheduleTask] = useState<ITask|undefined>(undefined);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [redescheduleModal, setRescheduleModal] = useState<boolean>(false);
  
  const updateTaskPhaseState = useAppSelector(state => state.dailyTask).updatePhase
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (updateTaskPhaseState.taskId  === task.id) {
      if (updateTaskPhaseState.status === StatusStateEnum.success) {
        toast.success('Your changes have been successfully made!');
        dispatch(resetUpdateDailyTaskPhase());
      }
      if (updateTaskPhaseState.status === StatusStateEnum.failure) {
        toast.error('Errors, Failed !!!');
        dispatch(resetUpdateDailyTaskPhase());
      }
    }
  }, [updateTaskPhaseState.status])

  return (
    <>
    <div className="border-t  mt-4  "></div>

    <div className='flex  h-10 justify-between items-center my-4 group '>
      <div className='flex items-center space-x-3'>
        <input type="checkbox"  className="checkbox border-indigo-400 checkbox-xs peer" defaultChecked={task.task_phase.id === TaskPhases.Done} onChange={() => updateDailyTaskPhase(task.task_phase.id === TaskPhases.Done ? TaskPhases.Started : TaskPhases.Done, task.id )} />
        <p className='text-sm text-gray-600  peer-checked:text-gray-400 peer-checked:line-through font-semibold'> {task.title}</p>
        <span className=' border border-blue-400 w-fit font-bold  text-blue-600 text-[8px] py-1 px-2'>
            {task.type.name.toUpperCase()}
        </span>
      </div>

      <div className='flex items-center  justify-end  h-full'>
        <span className='text-xs '>{dateFormat}</span>
        <div className="border-l w-1  border-gray-500 mx-4 h-[50%]  group-hover:hidden"></div>
        <span className='text-xs font-bold group-hover:hidden '>{dateTime}</span>
        <div className='space-x-1 mx-2 hidden group-hover:flex relative left-2 justify-end'>
            <a data-tip='Reschedule' onClick={() => {setRescheduleTask(task); setRescheduleModal(true)}} className='bg-slate-100 hover:cursor-pointer tooltip px-2 border rounded-md border-gray-300  text-gray-700 py-1/2'>
                <FontAwesomeIcon icon={faArrowTrendUp} size='xs' />
            </a>
            <a data-tip='View' onClick={() => {setViewTask(task); setViewModal(true)}} className='bg-slate-100 hover:cursor-pointer tooltip px-2 border rounded-md border-gray-300  text-gray-700 py-1/2'>
                <FontAwesomeIcon icon={faEye} size='xs' />
            </a>
            <a data-tip='Edit' onClick={() => setUpdateTaskModal(true)} className='bg-slate-100 hover:cursor-pointer tooltip px-2 border rounded-md border-gray-300  text-gray-700 py-1/2'>
                <FontAwesomeIcon icon={faEdit} size='xs' />
            </a>
            <a  data-tip='Delete'  onClick={() => setDeleteTaskModal(true)}  className='bg-slate-100 px-2 border tooltip tooltip-left hover:cursor-pointer  rounded-md border-gray-300  text-red-700 py-1/2'>
                <FontAwesomeIcon icon={faTrash} size='xs' />
            </a>
        </div>
      </div>
    </div>
     <DeleteDailyTaskModal taskId={task.id}  active={deleteTaskModal} setActive={setDeleteTaskModal}/>
     <UpdateDailyTaskModal task={task}  active={updateTaskModal} setActive={setUpdateTaskModal}/>
     {viewTask && <ViewTaskModal task={viewTask} active={viewModal} setActive={setViewModal} />}
     {redescheduleTask && <RescheduleDailyTaskModal task={redescheduleTask} active={redescheduleModal} setActive={setRescheduleModal} />}
    </>
  )
}
