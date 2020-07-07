import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const defaultPickupTime = new Date();

export default function ModalTimeDateInput(props) {
  const {
    buttonLabel, buttonProps, inputLabel, dialogTitle, handleConfirm, dialogContentText, promptButtonLabel, currentOrderTime, required,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [timeInputValue, setTimeInputValue] = React.useState((currentOrderTime || defaultPickupTime).toISOString().substring(0, 16));

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handlePromptConfirm() {
    setOpen(false);
    handleConfirm(timeInputValue);
  }

  return (
    <div>
      <Button {...buttonProps} onClick={handleClickOpen}>
        {buttonLabel || dialogTitle || 'Open Dialog'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContentText}
          </DialogContentText>
          <TextField
            id="datetime-local"
            label={inputLabel}
            type="datetime-local"
            value={timeInputValue}
            onChange={(e) => { setTimeInputValue(e.target.value); }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePromptConfirm} color="primary" disabled={!!((required && !timeInputValue))}>
            {promptButtonLabel || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
