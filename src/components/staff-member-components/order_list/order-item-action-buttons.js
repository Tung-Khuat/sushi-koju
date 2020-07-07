import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  ButtonBase, Button, Grid, Card,
} from '@material-ui/core';
import {
  Delete,
} from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ModalPrompt from '../../modals/modal-prompt';
import ModalTimeDateInput from '../../modals/modal-time-date-input';
import SenderInfoDisplay from './sender-info-display';
import { capitalizeFirstLetter } from '../../../assets/helpers/helper-functions-index';
import LoadingPlaceholder from '../../loading_placeholders/loading-placeholders';


const useStyles = makeStyles((theme) => ({
  orderItemName: {
    maxWidth: '70%',
    float: 'left',
  },
  orderItemPrice: {
    float: 'right',
    textAlign: 'right',
    width: '30%',
  },
  orderItem: {
    width: '100%',
    overflow: 'auto',
    padding: '10px',
  },
  hrLine: {
    border: '0.5px solid #c3c3c3',
    width: '97%',
  },
  userInfoContainer: {
    paddingBottom: '5px',
    borderBottom: '1px solid #c3c3c3',
  },
  userInfoItem: {
    paddingBottom: '5px',
    paddingLeft: '10px',
  },
}));

export default function OrderItemActionButtons(props) {
  const {
    orderItem, updateOrderDataMethod,
  } = props;
  const classes = useStyles();
  const [newPickupTime, setNewPickupTime] = React.useState(null);
  const pickUpTime = new Date(orderItem.pickUpTime);

  function renderCompleteActionButton() {
    if (!orderItem.canceled) {
      return (
        <Button
          className="completed-order-color-theme"
          variant="contained"
          onClick={() => { updateOrderDataMethod(orderItem._id, { completed: !orderItem.completed }); }}
        >
          {
            orderItem.completed ? 'Mark as Incomplete' : 'Completed'
          }
        </Button>
      );
    }
  }

  function renderChangePickupTimeActionButton() {
    if (!orderItem.canceled) {
      return (
        <ModalTimeDateInput
          currentOrderTime={pickUpTime}
          buttonLabel="Change Pickup Time"
          buttonProps={{ variant: 'contained', className: 'order-receipt-modal-button' }}
          dialogTitle="Change pick up time"
          dialogContentText="Please enter a new pick up time"
          handleConfirm={(date) => { updateOrderDataMethod(orderItem._id, { pickUpTime: date }); }}
          required
        />
      );
    }
  }

  function renderCancelActionButton() {
    if (orderItem.canceled) {
      return (
        <Button
          className="completed-order-color-theme"
          variant="contained"
          onClick={() => { updateOrderDataMethod(orderItem._id, { canceled: false, note: null }); }}
        >
          Restore Order
        </Button>
      );
    }
    return (
      <ModalPrompt
        buttonLabel="Cancel Order"
        buttonProps={{ variant: 'contained', className: 'order-receipt-modal-button' }}
        dialogTitle="Confirm Cancel"
        dialogContentText="Please enter the reason why this order is canceled"
        inputLabel="Reason of cancelation"
        handleConfirm={(note) => { updateOrderDataMethod(orderItem._id, { canceled: true, note }); }}
        required
      />
    );
  }

  return (
    <div className="order-receipt-button-container">
      {renderCompleteActionButton()}
      {renderCancelActionButton()}
    </div>
  );
}
