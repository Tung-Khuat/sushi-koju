import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField, FormControl, FormHelperText,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbnailImageCrop from '../image_components/thumbnail-image-crop';
import { capitalizeFirstLetter } from '../../assets/helpers/helper-functions-index';
import {
  createCookie, readCookie, removeCookie, removeAllCookies,
} from '../../assets/helpers/cookies';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '95%',
    margin: '20px auto',
    display: 'block',
    flexWrap: 'wrap',
  },
  inputField: {
    marginTop: '3px',
    marginBottom: '15px',
  },
}));

export default function LoginFieldDisplay(props) {
  const {
    submitLoginMethod,
  } = props;
  const classes = useStyles();
  const [usernameInputValue, setUsernameInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  function submitLogin() {
    const loginInputsObject = {
      usernameInputValue,
      passwordInputValue,
    };
    submitLoginMethod(loginInputsObject);
  }

  function handleOnEnterKeyPress(event) {
    if (event.keyCode == 13) {
      const invalidLoginInput = checkConditions();
      if (!invalidLoginInput) {
        submitLogin();
      }
    }
  }

  function checkConditions() {
    const validUsernameInputValue = Boolean(usernameInputValue && usernameInputValue.length > 3);
    const validPasswordInputValue = Boolean(passwordInputValue && passwordInputValue.length > 3);
    if (validUsernameInputValue && validPasswordInputValue) { return false; }
    return true;
  }
  return (
    <div className="login-input-field">
      <h4>Login </h4>
      <TextField
        id="username-input"
        label="Username"
        className={classes.inputField}
        value={usernameInputValue}
        onChange={(e) => { setUsernameInputValue(e.target.value); }}
        margin="normal"
        variant="outlined"
        fullWidth
        autoFocus
        autoComplete="new-username"
      />
      <TextField
        id="password"
        label="Password"
        className={classes.inputField}
        value={passwordInputValue}
        onChange={(e) => { setPasswordInputValue(e.target.value); }}
        margin="normal"
        variant="outlined"
        type="password"
        onKeyDown={(e) => { handleOnEnterKeyPress(e); }}
        fullWidth
        autoComplete="new-password"
      />
      <Button fullWidth disabled={checkConditions()} onClick={submitLogin}>Login</Button>
    </div>
  );
}
