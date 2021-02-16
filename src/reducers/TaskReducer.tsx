import { ActionTypes } from '../consts/index';
import { ITasksState, ITaskAction } from "../interfaces/index"

const taskReducer = (state: ITasksState, action: ITaskAction): ITasksState => {

    // all action types destruced due to avoid typos
    const { Fetch, Add, Edit, Delete } = ActionTypes;


    switch (action.type) {
        case Fetch:
            return action.tasks;
        case Add:
            return [...state, action.payload];
        case Edit:
            // for edit we should check all states and find the task which
            // its ID is equal to our desied taks id. Then update its content
            // by new updates using ES6 spread feature.
            return state.map((task) => {
                if (task.id === action.id) {
                    return {
                        ...task,
                        ...action.updates
                    };
                } else {
                    return task;
                };
            });
        case Delete:
            // for delete we should use filter method. 
            // it will return new state array where item's ID is not equal to 
            // desired action.id
            return state.filter(({ id }) => id !== action.id);
        default:
            return state;
    }
}

export default taskReducer 