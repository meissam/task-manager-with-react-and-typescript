import React from 'react';
import { Link } from 'react-router-dom';
import { globalStyles } from "../styles/globalStyles"
import Typography from '@material-ui/core/Typography';




const NotFoundPage = () => {

  // using globale state for styling main page
  const classes = globalStyles();


  return (
    <main className={classes.content}>
      <div className={classes.drawerHeader} />
      <Typography variant="h1" component="h2" align="center">
        404 Not Found
       </Typography>
      <Typography variant="h5" component="p" align="center">
        <Link to="/">Go home</Link>
      </Typography>
    </main>
  )
};

export default NotFoundPage;
