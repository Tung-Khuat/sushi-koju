import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  loadingPlaceholderContainer: {
    display: 'block',
    margin: '0 auto',
    textAlign: 'center',
  },
}));

export default function LoadingPlaceholder() {
  const classes = useStyles();

  return (
    <div className={classes.loadingPlaceholderContainer}>
      <CircularProgress />
    </div>
  );
}
