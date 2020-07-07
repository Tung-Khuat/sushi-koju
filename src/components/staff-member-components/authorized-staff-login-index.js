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
import OrderListIndex from './order_list/order-list-index';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '85%',
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

export default function AuthorizedStaffLoginIndex(props) {
  const { state, dispatch } = React.useContext(Store);
  const classes = useStyles();

  React.useEffect(() => {
    if (!readCookie('LOGGED_IN_USER_INFO')) {
      props.history.push('/login');
    }
  });

  return (
    <div className={classes.displayContainer}>
      {
        readCookie('LOGGED_IN_USER_INFO')
        && <OrderListIndex />
      }
    </div>
  );
}
