// Task Actions define all action generators associeted with Tasks


// in order to prevent of typos all Action Type Strings saved as const
// in const module and import here
import { ActionTypes } from '../consts/index';
import { ITaskItem, ITaskAction } from "../interfaces/index"



// for adding a task we need task.
// So payload should be a task
export const addTask = (task: ITaskItem): ITaskAction => ({
  type: ActionTypes.Add,
  payload: task
});



// for editing a task we need task id and updates.
// So payload should be id and updates
export const editTask = (id: string, updates: ITaskItem): ITaskAction => ({
  type: ActionTypes.Edit,
  id,
  updates
});



// for editing a task we just need task the id of desired task.
// So payload should be id 
export const removeTask = (id: string): ITaskAction => ({
  type: ActionTypes.Delete,
  id
});

