import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment'; 
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { capitalizeFirstLetter } from '../../assets/helpers/helper-functions-index';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '95%',
    margin: '20px auto',
    display: 'block',
    flexWrap: 'wrap',
    paddingBottom: '50px',
  },
  textField: {
    margin: '10px 0 20px',
    width: '100%',
  },
  pickUpTime: {
    margin: '15px 0 15px',
    textAlign: 'center',
  },
}));

export default function TimeSelectPanel(props) {
  const {
    itemsInCart, pickUpTime, setPickUpTimeMethod,
  } = props;
  const classes = useStyles();
  const [dateHelperText, setDateHelperText] = React.useState(null);
  const [timeHelperText, setTimeHelperText] = React.useState(null);

  React.useEffect(() => {
    handleDateChange(pickUpTime);
  }, []);

  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
  };

  const handleDateChange = (date) => {
    const inputDate = new Date(date);
    const inputDateHour = inputDate.getHours();
    const isInOpenHours = Boolean(inputDateHour > 11 && inputDateHour < 19);
    const currentMoment = new Date();
    const dayAfterCurrentMoment = new Date(currentMoment.setDate(currentMoment.getDate() + 1));

    if (inputDate.getDate() < dayAfterCurrentMoment.getDate()) {
      setDateHelperText('Pick up date must be at least 1 day in advance');
      setTimeout(() => {
        setDateHelperText(null);
      }, 2000);
      return;
    }
    if (!isInOpenHours) {
      setTimeHelperText('Pick up time must be within opening hours.');
      setTimeout(() => {
        setTimeHelperText(null);
      }, 2000);
      return;
    }
    setTimeHelperText(null);
    setDateHelperText(null);
    setPickUpTimeMethod(new Date(date));
  };

  return (
    <div className={classes.displayContainer}>
      <h4>2. Valitse toimitusapa </h4>
      <i>Pick up time must be at least 1 day in advance. Available pick up time: 12:00 - 19:00 </i>

      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            margin="normal"
            id="date-picker"
            label="Select Date"
            value={pickUpTime}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            error={Boolean(dateHelperText)}
            helperText={dateHelperText}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Select Time"
            value={pickUpTime}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            error={Boolean(timeHelperText)}
            helperText={timeHelperText}
          />
        </Grid>

        <h5 className={classes.pickUpTime}>
          {` ${capitalizeFirstLetter(pickUpTime.toLocaleString('fi-FI', options))}`}
        </h5>


      </MuiPickersUtilsProvider>
    </div>
  );
}
