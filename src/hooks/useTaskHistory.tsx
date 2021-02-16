import { TaskHistory } from "../consts/index"

// useTaskHistory is a custom hook helping to implemet application logic
// besed on requested state transition the previous and the next value of a change must be tracked
// so base on our state transition diagram, we return an array of prev and next value plus state itself.
// it can help us to fill the dropdown in EditTask Component

const useTaskHistory = (status: string): string[] => {

    const { Todo, InProgress, Blocked, InQA, Done, Deployed } = TaskHistory;

    switch (status) {
        case Todo:
            return [Todo, InProgress];
        case InProgress:
            return [InProgress, Blocked, InQA];
        case Blocked:
            return [Blocked, Todo];
        case InQA:
            return [InQA, Todo, Done];
        case Done:
            return [Done, Deployed];
        case Deployed:
            return [Done];
        default:
            return [];
    }
}

export default useTaskHistory;