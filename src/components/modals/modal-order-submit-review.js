import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalOrderSubmitReview(props) {
  const {
    dialogTitle, dialogContentText, open, setOpen, context, summary, handleOnCloseClick,
  } = props;

  function handleClose() {
    (context.type == 'success' && handleOnCloseClick) && handleOnCloseClick();
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
      <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogContentText || 'Something went wrong. Please try again.'}
        </DialogContentText>
        {
            summary && (
              summary
            )
          }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {context.type == 'success' ? 'Return Home' : 'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
