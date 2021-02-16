import React, { FormEvent, useState } from "react";
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';


import { ITaskItem } from "../interfaces/index"
import { TaskFormMode, TaskHistory } from "../consts/index"
import useTaskHistory from "../hooks/useTaskHistory"





// custom styles of this component 
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            marginBottom: 30
        },
        select: {
            border: 0,
            fontSize: 16,
            color: "#000",
            display: "block",
            width: "100%",
            borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
            marginBottom: 30,
            paddingBottom: 5
        },
        floatRight: {
            float: "right",
        }

    }),
);


// defining custom interface for our components 
// task is optional. WHY? 
// because we call TaskForm component in 2 different situation:
// 1. for edit a task. in this situation task will pass to this component for editing
// 2. for add a new task. in this situation we dont need task to be passed. 
// but both of them will pass a onsubmit. one for edit and one for add
interface IComponentProps {
    task?: ITaskItem | undefined;
    onSubmit: (task: ITaskItem) => void;
}




// this Component will handle our task form which can be used for add or edit a task
const TaskForm: React.FC<IComponentProps> = (props) => {



    // define classes as a const filled bu useSyles of Material UI
    // now we can use defined classed in oue elements
    const classes = useStyles();



    // this error state will define to handle errors
    const [error, setError] = useState('');


    // this form can handle Edit of Add. So we first check the Mode
    const [mode] = useState(props.task ? 'edit' : 'create');



    // we distract the data to fill form elements in case of editing
    const [id] = useState(props.task ? props.task.id : '');
    const [title, setTitle] = useState(props.task ? props.task.title : '');
    const [description, setDescription] = useState(props.task ? props.task.description : '');
    const [status, setStatus] = useState(props.task ? props.task.status : TaskHistory.Todo);





    // when we will edit a task we need a hisory
    // this history will be generated bu useHistory hook. 
    // then we can fill the select element by its returned array
    // and we will be able to find the next and prev state of current status of Task
    const taskHistoryBasedStatus = useTaskHistory(status);



    // handler for chaning title 
    const onTitleChange = (e: FormEvent) => {
        const title = (e.target as HTMLInputElement).value;
        setTitle(title);
    }

    // handler for chaning description
    const onDescriptionChange = (e: FormEvent) => {
        const description = (e.target as HTMLTextAreaElement).value;
        setDescription(description);
    }

    // handler for chaning status
    const onStatusChange = (e: FormEvent) => {
        const status = (e.target as HTMLSelectElement).value;
        setStatus(status);
    }



    // handle the form submit
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();


        // first we will check the title and description. 
        // if it is empty we send a pessate to user
        if (title.trim() === "" || description.trim() === "") {
            setError("'Please fill Title and Description.'");
        }
        else {

            // when title and description are not empty 
            // we first clear error. 
            // and then check the mode. 
            // and based on mode we will send different submit parameters
            setError("");


            if (mode === TaskFormMode.Create) {
                props.onSubmit({
                    // we use nanoid library to create a unique id in case of adding a new item 
                    // this unique id will be used for editing and other purposes
                    id: nanoid(8),
                    title,
                    description,
                    status
                });
            }
            else {
                props.onSubmit({
                    id,
                    title,
                    description,
                    status
                });
            }
        }
    };


    return (
        <>

            {/* here we show our errors */}

            {error &&  
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => { setError(""); }} >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {error}
            </Alert>
            }



            <form onSubmit={submitHandler}>

                <TextField
                    fullWidth
                    placeholder="Title"
                    value={title}
                    onChange={onTitleChange}
                    className={classes.input} />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Description"
                    value={description}
                    onChange={onDescriptionChange}
                    className={classes.input} />


                {/* 
                    bases on mode (EDIT or ADD) we trigger the select element
                    this select element will be shown just when we are editing a task
                    it will be filled by task history which we got from our useHistoryHook                    
                */}

                {mode === TaskFormMode.Edit ?
                    <select value={status} onChange={onStatusChange} className={classes.select} >
                        {taskHistoryBasedStatus.map((status: string, index) => (<option key={index}>{status}</option>))}
                    </select>
                    :
                    undefined
                }




                {/* 
                    bases on mode (EDIT or ADD) we will show different buttons with different text
                */}
                {mode === TaskFormMode.Create ?
                    <Button size="small" variant="contained" color="primary" type="submit"> Add Task </Button> :
                    <Button size="small" variant="contained" color="primary" type="submit"> Edit Task </Button>}





                {/* 
                    and a cancel button for both Edit and Add situation                  
                */}
                <Button size="small" variant="contained" component={Link} to={"/"} className={classes.floatRight} >
                    Cancel
                </Button>
            </form>
        </>
    )
}

export default TaskForm