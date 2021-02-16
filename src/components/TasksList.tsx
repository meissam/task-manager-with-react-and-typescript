import React, { FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SnoozeIcon from '@material-ui/icons/Snooze';

import { IFilterTask } from "../interfaces/index";
import Context from '../context/tasksContext'
import TaskItem from '../components/TaskItem';
import { TaskHistory } from "../consts/index"
import filterTasks from "../selectors/filterTasks"

// custom styles of this component 
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        select: {
            border: 0,
            fontSize: 16,
            color: "#656565",
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        horizontalDivider: {
            marginTop: 15,
            marginBottom: 30,
        },
    }),
);



// TaskList Component show all tasks in dashboard page
const TasksList: React.FC = () => {
    
    // define classes as a const filled bu useSyles of Material UI
    // now we can use defined classed in oue elements
    const classes = useStyles();


    // we retrieved the state from our Context
    const { state } = useContext(Context);


    // in dashboard page we have 2 filter (filter by text) and (filter by status)
    // we need 2 states to handle this filter
    // then in order to use filterTasks(state, filter: IFilterTask) we define a filer 
    // const and assign an object to it.
    let [textFilter, setTextFilter] = useState("");
    let [statusFilter, setStatusFilter] = useState("All");
    const filter: IFilterTask = { text: textFilter, status: statusFilter };




    // handle Filter Textbox for text
    const handleTextFilter = (e: FormEvent) => {
        setTextFilter(textFilter = (e.target as HTMLInputElement).value);
    }

    // handle Filter Droptdown for status
    const handleSelectFilter = (e: FormEvent) => {
        setStatusFilter(statusFilter = (e.target as HTMLSelectElement).value);
    }

    // this handler fill the initial values of our status selectElement
    const handleViewOfFilterDropDown = (): string[] => {
        const setOfStatusTexts: string[] = Object.values(TaskHistory).filter(value => typeof value === 'string')
        return setOfStatusTexts;
    }




    // we check the state comming from useContext.
    // if there there is not any task we should print proper message

    if (state.length === 0) {
        return (
            <>
                <Typography variant="h6" component="p" align="center">
                    <SnoozeIcon style={{ fontSize: 100 }} /> <br />
                    You Have Nothing to Do <br />
                    Go and Get Some Sleep <br />
                    <br />
                    OR <br />
                    <br />
                    <Button size="small" variant="contained" component={Link} to={"/create"} color="primary"  >
                        Create a New Task
                    </Button>
                </Typography>
            </>

        );
    }

    // when state has value means that we have some taks in our local storage. 
    // so we can show it on the our list
    // first we render our filer menu 
    // then we show our tasks.
    return (
        <>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={6}>
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            onChange={handleTextFilter}
                            className={classes.input}
                            placeholder="Type to Filter Tasks"
                        />
                        <Divider className={classes.divider} orientation="vertical" />
                        <select onChange={handleSelectFilter} className={classes.select}>
                            {/* 
                                Pay attention to this extra option
                                This option is required to show all task in first render and 
                                clean the status Filter
                            */}
                            <option>All</option>
                            {handleViewOfFilterDropDown().map((status: string, index) => (<option key={index}>{status}</option>))}
                        </select>
                    </Paper>
                </Grid>
            </Grid>
            <Divider light className={classes.horizontalDivider} />
            <Grid container spacing={3} >
                {
                    filterTasks(state, filter).map((task, index) => {
                        return (<Grid key={index} item xs={12} sm={6} md={3}><TaskItem {...task} /></Grid>);
                    })
                }
            </Grid>
        </>
    );
}


export default TasksList;


