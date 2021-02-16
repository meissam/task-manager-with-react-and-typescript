import React from 'react';
import TasksList from "./TasksList";
import { globalStyles } from "../styles/globalStyles"


const TaskDashboard = () => {


   // using globale state for styling main page
  const classes = globalStyles();

  
  return (
    <main className={classes.content}>
      <div className={classes.drawerHeader} />
      <TasksList />
    </main>
  )
};

export default TaskDashboard;