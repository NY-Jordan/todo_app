import { initAssignTaskToUser, resetAssignTaskToUserState } from '@/app/Actions/TaskActions';
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import React, { useEffect } from 'react'
import { assignTaskToUsers } from '../Services/Task/TaskService';
import toast from 'react-hot-toast';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';
import { ITask } from '@/domain/entities/task.entities';

export default function AssignTaskPresenter() {
        const dispatch = useAppDispatch();
          const assignTaskState = useAppSelector(state => state.task).assign_task
        const task  = assignTaskState.task as ITask;

      const handleAssignTaskAction = (taskId : number, projectId : number, userSelected : Array<number>) => {
          dispatch(initAssignTaskToUser())
          assignTaskToUsers(projectId, {
            task_id : taskId,
            users : userSelected
          })
      }


      useEffect(() => {
        if (assignTaskState.status === StatusStateEnum.success && task.assigned_user.length) {
          dispatch(resetAssignTaskToUserState());
          return ;
        }
        if (assignTaskState.status === StatusStateEnum.success && !task.assigned_user.length) {
            dispatch(resetAssignTaskToUserState());
            return ;

          }
        if (assignTaskState.status === StatusStateEnum.failure) {
          toast.error('Process Failed');
          dispatch(resetAssignTaskToUserState());
          return ;

        }
      }, [assignTaskState.status])


  return {
    handleAssignTaskAction
  }
}
