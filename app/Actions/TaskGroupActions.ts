import { IPagination } from "@/domain/entities/task.entities";
import { ITaskGroup } from "@/domain/entities/task.group.entities";

export const TaskGroupActions = {
  CREATE_TASKGROUP_INIT: "CREATE_TASKGROUP_INIT",
  CREATE_TASKGROUP_SUCCESS: "CREATE_TASKGROUP_SUCCESS",
  CREATE_TASKGROUP_FAILURE: "CREATE_TASKGROUP_FAILURE",
  CREATE_TASKGROUP_RESET: "CREATE_TASKGROUP_RESET",

  FETCH_TASKGROUPS_INIT: "FETCH_TASKGROUPS_INIT",
  FETCH_TASKGROUPS_SUCCESS: "FETCH_TASKGROUPS_SUCCESS",
  FETCH_TASKGROUPS_FAILURE: "FETCH_TASKGROUPS_FAILURE",
  FETCH_TASKGROUPS_RESET: "FETCH_TASKGROUPS_RESET",

  UPDATE_TASKGROUP_INIT: "UPDATE_TASKGROUP_INIT",
  UPDATE_TASKGROUP_SUCCESS: "UPDATE_TASKGROUP_SUCCESS",
  UPDATE_TASKGROUP_FAILURE: "UPDATE_TASKGROUP_FAILURE",
  UPDATE_TASKGROUP_RESET: "UPDATE_TASKGROUP_RESET",

  DELETE_TASKGROUP_INIT: "DELETE_TASKGROUP_INIT",
  DELETE_TASKGROUP_SUCCESS: "DELETE_TASKGROUP_SUCCESS",
  DELETE_TASKGROUP_FAILURE: "DELETE_TASKGROUP_FAILURE",
  DELETE_TASKGROUP_RESET: "DELETE_TASKGROUP_RESET",
};

// Action Creators
// Create TaskGroup
export const createTaskGroupInit = () => ({
  type: TaskGroupActions.CREATE_TASKGROUP_INIT,
});

export const createTaskGroupSuccess = () => ({
  type: TaskGroupActions.CREATE_TASKGROUP_SUCCESS,
});

export const createTaskGroupFailure = (error : any) => ({
  type: TaskGroupActions.CREATE_TASKGROUP_FAILURE,
  payload: error,
});

export const createTaskGroupReset = () => ({
  type: TaskGroupActions.CREATE_TASKGROUP_RESET,
});

// Fetch TaskGroups
export const fetchTaskGroupsInit = () => ({
  type: TaskGroupActions.FETCH_TASKGROUPS_INIT,
});

export const fetchTaskGroupsSuccess = (taskGroups : ITaskGroup[], pagination : IPagination) => ({
  type: TaskGroupActions.FETCH_TASKGROUPS_SUCCESS,
  payload: {taskGroups : taskGroups, pagination : pagination},
});

export const fetchTaskGroupsFailure = (error : any) => ({
  type: TaskGroupActions.FETCH_TASKGROUPS_FAILURE,
  payload: error,
});

export const fetchTaskGroupsReset = () => ({
  type: TaskGroupActions.FETCH_TASKGROUPS_RESET,
});

// Update TaskGroup
export const updateTaskGroupInit = () => ({
  type: TaskGroupActions.UPDATE_TASKGROUP_INIT,
});

export const updateTaskGroupSuccess = (updatedTaskGroup : ITaskGroup) => ({
  type: TaskGroupActions.UPDATE_TASKGROUP_SUCCESS,
  payload: updatedTaskGroup,
});

export const updateTaskGroupFailure = (error : any) => ({
  type: TaskGroupActions.UPDATE_TASKGROUP_FAILURE,
  payload: error,
});

export const updateTaskGroupReset = () => ({
  type: TaskGroupActions.UPDATE_TASKGROUP_RESET,
});

// Delete TaskGroup
export const deleteTaskGroupInit = () => ({
  type: TaskGroupActions.DELETE_TASKGROUP_INIT,
});

export const deleteTaskGroupSuccess = (taskGroupId : number) => ({
  type: TaskGroupActions.DELETE_TASKGROUP_SUCCESS,
  payload: taskGroupId,
});

export const deleteTaskGroupFailure = (error : any) => ({
  type: TaskGroupActions.DELETE_TASKGROUP_FAILURE,
  payload: error,
});

export const deleteTaskGroupReset = () => ({
  type: TaskGroupActions.DELETE_TASKGROUP_RESET,
});
