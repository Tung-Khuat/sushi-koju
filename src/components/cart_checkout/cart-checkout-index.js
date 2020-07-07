import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Breadcrumbs, Button, Snackbar,
} from '@material-ui/core';
import { Error, CheckCircleOutline } from '@material-ui/icons';
import {
  BrowserRouter, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import { Store } from '../../store';
import {
  addPresetToCart, removeItemFromCart, setPickUpTime, postNewOrder, clearCurrentOrder, dispatchUserInfo,
} from '../../actions/action-sushi';
import CartItemList from './cart-item-list';
import UserInfoPanel from './user-info-panel';
import ReceiptCard from './receipt-card';
import TimeSelectPanel from './time-select-panel';
import SushiPanel from '../navigation/sushi-panel';
import ModalOrderSubmitReview from '../modals/modal-order-submit-review';
import LoadingPlaceholder from '../loading_placeholders/loading-placeholders';
import OrderListDisplay from '../staff-member-components/order_list/order-list-display';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '95%',
    margin: '50px auto',
  },
}));

export default function CartCheckoutIndex(props) {
  const { state, dispatch } = React.useContext(Store);
  const classes = useStyles();
  const [numberOfFormSent, addNumberOfFormSent] = React.useState(0);
  const [orderSubmitInProgress, setOrderSubmitInProgress] = React.useState(false);
  const [responseObject, setResponseObject] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    const stringifiedItemsInCart = JSON.stringify(state.itemsInCart);
    sessionStorage.setItem('itemsInCart', stringifiedItemsInCart);
  }, [state.itemsInCart]);

  function addPresetToCartMethod(orderNumber, preset) {
    addPresetToCart(dispatch, orderNumber, preset);
  }

  function removeItemFromCartMethod(id) {
    removeItemFromCart(dispatch, id);
  }

  function handleOnSubmitClick() {
    addNumberOfFormSent(numberOfFormSent + 1);
  }

  function postNewOrderSuccessHandler(response) {
    setResponseObject({
      type: 'success', title: 'Success!', contentText: 'Order successfully sent!', summary: <OrderListDisplay orderList={{ content: [response.data] }} isSummary />,
    });
    setOpenModal(true);
    clearCurrentOrder(dispatch);
  }
  function postNewOrderFailureHandler(error) {
    setResponseObject({ type: 'error', title: 'Error', contentText: error.response.data.message });
    setOpenModal(true);
  }

  function checkConditions() {
    if (orderSubmitInProgress) {
      return true;
    }
    if (state.itemsInCart.length < 1) {
      return true;
    }
    return false;
  }

  function renderSubmitButtonLabel() {
    if (orderSubmitInProgress) {
      return <LoadingPlaceholder />;
    }
    if (state.itemsInCart.length < 1) {
      return 'Cart is currently empty. Please add an item to cart';
    }
    return 'Proceed to Checkout';
  }

  function submitOrder(senderInfo) {
    const newOrderObject = {
      order: state.itemsInCart,
      pickUpTime: state.pickUpTime,
      message: senderInfo.message,
      senderInfo,
      completed: false,
    };
    if (senderInfo.name && senderInfo.email && senderInfo.phoneNumber) {
      const configParamObject = {
        newOrderObject,
        setPostingStateFunction: setOrderSubmitInProgress,
        successHandler: postNewOrderSuccessHandler,
        failureHandler: postNewOrderFailureHandler,
      };
      postNewOrder(dispatch, configParamObject);
    }
  }

  return (
    <>
      <SushiPanel hasNavItems />
      <div className={`${classes.displayContainer} container`}>
        <div className="row">
          <div className="col-xl-8 col-lg-12">
            <CartItemList
              itemsInCart={state.itemsInCart}
              addPresetToCartMethod={addPresetToCartMethod}
              removeItemFromCartMethod={removeItemFromCartMethod}
            />
            <TimeSelectPanel
              pickUpTime={state.pickUpTime}
              setPickUpTimeMethod={(time) => { setPickUpTime(dispatch, time); }}
              message={state.message}
            />
            <UserInfoPanel
              returnUserInfoObject={(userInfoObject) => { setSenderInfoFromInput(userInfoObject); }}
              submitOrderMethod={(senderInfo) => { submitOrder(senderInfo); }}
              numberOfFormSent={numberOfFormSent}
            />
          </div>
          <div className="col-xl-4 col-lg-12">
            <ReceiptCard itemsInCart={state.itemsInCart} totalPrice={state.totalPrice} />
          </div>
        </div>

        <Button disabled={checkConditions()} fullWidth variant="contained" color="primary" onClick={handleOnSubmitClick}>
          {renderSubmitButtonLabel()}
        </Button>

        <ModalOrderSubmitReview
          open={openModal}
          setOpen={setOpenModal}
          dialogTitle={responseObject.title}
          dialogContentText={responseObject.contentText}
          context={responseObject}
          summary={responseObject.summary}
          handleOnCloseClick={() => { props.history.push('/'); }}
        />
      </div>
    </>
  );
}
