import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// this global style handle styles of pages 
// all pages should have these classes to render correctly
// becuase Appbar is sticked in top and these classes are 
// required to control padding and spacing
export const globalStyles = makeStyles((theme: Theme) =>
  createStyles({

    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      padding: theme.spacing(3),
      
    },

  }),
);

 
