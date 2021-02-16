

// to avoid typos when writing actions
// we define ActionTypes as an enum
export enum ActionTypes {
    Fetch = "POPULATE_TASKS",
    Add = 'ADD_TASK',
    Edit = 'EDIT_TASK',
    Delete = 'REMOVE_TASK',
}


// to avoid typos when writing our custom hook "useTaskHistory"
// we define task history as an enum
export enum TaskHistory {
    Todo = "To Do",
    InProgress = "In Progress",
    Blocked = "Blocked",
    InQA = "In QA",
    Done = "Done",
    Deployed = "Deployed",
}



// to make our *TaskForm* component more reusable, 
// we decided to use this form to implement both 
// Add and Edit functionality. So we define an enum
// to handle modes 

export enum TaskFormMode {
    Create = "create",
    Edit = 'edit',
}

