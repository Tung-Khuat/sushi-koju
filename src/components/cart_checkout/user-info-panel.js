import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import validator from 'validator';
import ThumbnailImageCrop from '../image_components/thumbnail-image-crop';
import { capitalizeFirstLetter } from '../../assets/helpers/helper-functions-index';


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
  halfWidth: {
    width: '49%',
  },
}));

export default function UserInfoPanel(props) {
  const {
    returnUserInfoObject, numberOfFormSent, submitOrderMethod,
  } = props;
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [nameInputHelperText, setNameInputHelperText] = React.useState(null);
  const [emailInputHelperText, setEmailInputHelperText] = React.useState(null);
  const [phoneNumberInputHelperText, setPhoneNumberInputHelperText] = React.useState(null);

  React.useEffect(() => {
    if (numberOfFormSent > 0) {
      const validCheck = validateSenderInfoInputValues();
      if (validCheck) {
        submitOrderMethod({
          name,
          email,
          phoneNumber,
        });
      }
    }
  }, [numberOfFormSent]);

  function validateSenderInfoInputValues() {
    let isValidSenderInfo = false;

    const isValidEmail = validator.isEmail(email);
    const isValidPhoneNumber = validator.isMobilePhone(phoneNumber);
    const isValidName = Boolean(name.length > 0 && name.length < 30);

    if (name.length < 1) {
      setNameInputHelperText('Please enter your name');
    } else if (name.length > 30) {
      setNameInputHelperText('Given name is too long');
    } else {
      setNameInputHelperText(null);
    }

    isValidEmail ? setEmailInputHelperText(null) : setEmailInputHelperText('Invalid Email');
    isValidPhoneNumber ? setPhoneNumberInputHelperText(null) : setPhoneNumberInputHelperText('Invalid Phone Number');

    if (isValidName && isValidEmail && isValidPhoneNumber) {
      isValidSenderInfo = true;
    }
    return isValidSenderInfo;
  }

  return (
    <div className={classes.displayContainer}>
      <h4>3. Viimeistele ja vahvista tilaus </h4>
      <div>Name</div>
      <TextField
        id="name-field"
        label="Name"
        className={classes.inputField}
        value={name}
        onChange={(e) => { setName(e.target.value); setNameInputHelperText(null); }}
        margin="normal"
        variant="outlined"
        required
        fullWidth
        error={Boolean(nameInputHelperText)}
        helperText={nameInputHelperText}
      />

      <div className="user-email-phone-input-container">
        <div className={classes.halfWidth}>
          <div>Email</div>
          <TextField
            id="email-field"
            label="Email"
            className={classes.inputField}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailInputHelperText(null); }}
            margin="normal"
            variant="outlined"
            type="email"
            required
            fullWidth
            error={Boolean(emailInputHelperText)}
            helperText={emailInputHelperText}
          />
        </div>
        <div className={classes.halfWidth}>
          <div>Phone Number</div>
          <TextField
            id="phone-number-field"
            label="Phone Number"
            className={classes.inputField}
            value={phoneNumber}
            onChange={(e) => { setPhoneNumber(e.target.value); setPhoneNumberInputHelperText(null); }}
            margin="normal"
            variant="outlined"
            required
            fullWidth
            error={Boolean(phoneNumberInputHelperText)}
            helperText={phoneNumberInputHelperText}
          />
        </div>
      </div>

      <div>Additional Info</div>
      <TextField
        id="additional-info-field"
        label="Message"
        multiline
        rows="5"
        className={classes.inputField}
        value={message}
        onChange={(e) => {
          message.length < 500 ? setMessage(e.target.value) : setMessage(message.substring(0, 499));
        }}
        margin="normal"
        variant="outlined"
        maxLength="280"
        fullWidth
        error={Boolean(message.length >= 500)}
        helperText="Maximum 400 characters."
      />
    </div>
  );
}
