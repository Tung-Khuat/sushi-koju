import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalPrompt(props) {
  const {
    buttonLabel, buttonProps, inputLabel, dialogTitle, handleConfirm, dialogContentText, promptButtonLabel, required,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [helperText, showHelperText] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    showHelperText(false);
    setOpen(false);
  }

  function handlePromptConfirm() {
    if (required && !inputValue) {
      return showHelperText(true);
    }
    showHelperText(false);
    setOpen(false);
    handleConfirm(inputValue);
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
            autoFocus
            margin="dense"
            id="prompt"
            label={inputLabel}
            onChange={(e) => { setInputValue(e.target.value); }}
            fullWidth
          />
          {helperText && 'A reason must be provided to cancel an order'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePromptConfirm} color="primary" disabled={!!((required && inputValue.length < 1))}>
            {promptButtonLabel || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
