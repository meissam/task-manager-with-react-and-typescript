import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//ICONS
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Dashboard from '@material-ui/icons/Dashboard';
import AddCircle from '@material-ui/icons/AddCircle';



// defining drawer width
const drawerWidth = 240;


// custom styles of this component 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },


  }),
);


// Header componet will render our header and drawer menu
const Header = () => {


  // define classes as a const filled bu useSyles of Material UI
  // now we can use defined classed in oue elements
  const classes = useStyles();
  const theme = useTheme();


  
  // this state will handle the state of our drawer menu
  const [open, setOpen] = useState(false);



  // these handlers will handle the openning and closing state of drawe menu
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };




  return (
    <header className={classes.root}>

      {/* 
          AppBar will handle header of application 
      */}

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
           Task Manager with React and TypeScript
          </Typography>


        </Toolbar>

      </AppBar>


      {/* Drawer will handle main Menu of application */}

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >


        {/* This Icon will handle closing a menu */}
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>


        <Divider />



        {/* Main menu links will handle here */}
        <List>
          <ListItem button key="Dashboard" component={NavLink} to="/" activeClassName="is-active" exact>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button key="Create" component={NavLink} to="/create" activeClassName="is-active">
            <ListItemIcon>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary="Create Task" />
          </ListItem>
        </List>



      </Drawer>
    </header>
  )
};

export default Header;