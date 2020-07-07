import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Store } from '../../store';
import {
  submitLoginInfo,
} from '../../actions/action-sushi';
import {
  createCookie, readCookie, removeCookie, removeAllCookies,
} from '../../assets/helpers/cookies';
import LoginFieldDisplay from './login-field-display';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '100%',
    height: '100vh',
    margin: '0 auto',
    position: 'relative',
  },
  vcenteredLoginField: {
    width: '100%',
    display: 'block',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  loginField: {
    width: '500px',
    margin: '0 auto',
  },
}));

export default function LoginIndex(props) {
  const { state, dispatch } = React.useContext(Store);
  const classes = useStyles();

  React.useEffect(() => {
    if (readCookie('LOGGED_IN_USER_INFO')) {
      props.history.push('/staff');
    }
  });

  return (
    <div className={classes.displayContainer}>
      <div className={classes.vcenteredLoginField}>
        <LoginFieldDisplay
          submitLoginMethod={(loginInputForm) => { submitLoginInfo(dispatch, loginInputForm, () => { location.reload(); }); }}
        />
      </div>
    </div>
  );
}
