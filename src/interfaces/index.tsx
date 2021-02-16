import { ActionTypes } from '../consts/index';


// Each task have 4 properties. 
export interface ITaskItem {
    id: string;
    title: string;
    description: string;
    status: string
}

// Our state should be an array of task items.  
export type ITasksState = ITaskItem[];


// to control the action of our application we define 
// 4 actions for fetching data from localStorage, Adding, Editing
// and Deleting
export type ITaskAction =
    { type: ActionTypes.Fetch, tasks: ITaskItem[] } |
    { type: ActionTypes.Add, payload: ITaskItem } |
    { type: ActionTypes.Edit, id: string, updates: ITaskItem } |
    { type: ActionTypes.Delete, id: string }


// Our context shpuld have to property
// state which is a array of task items
// and dispatch which is a react dispatch
export interface IContextModel {
    state: ITasksState;
    dispatch: React.Dispatch<ITaskAction>
}



// to filter our task in TasksList component we define an
// interface to filter our tasks. 
// text can help to filter tasks based on their title and description 
// and status will filter based on their status
export interface IFilterTask {
    text: string;
    status: string;
    
}

