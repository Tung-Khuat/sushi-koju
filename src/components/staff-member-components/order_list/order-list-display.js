import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  ButtonBase, Button, Grid, Card,
} from '@material-ui/core';
import {
  Delete, ClearRounded, AccountBox, Mail, PhoneIphoneRounded,
} from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ModalPrompt from '../../modals/modal-prompt';
import ModalTimeDateInput from '../../modals/modal-time-date-input';
import SenderInfoDisplay from './sender-info-display';
import OrderItemActionButtons from './order-item-action-buttons';
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
  orderItemSection: {
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

export default function OrderListDisplay(props) {
  const {
    orderList, deleteOrderMethod, updateOrderDataMethod, fetchMoreMethod, listChanged, isSummary,
  } = props;
  const classes = useStyles();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [fetchingMore, setFetchingMore] = React.useState(false);

  React.useEffect(() => {
    if (pageNumber > 1) fetchMoreMethod(pageNumber, setFetchingMore);
  }, [pageNumber]);

  // For infinite scroller
  const observer = React.useRef();
  const lastItemElementRef = React.useCallback((node) => {
    if (fetchingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && orderList.next) {
        setPageNumber(pageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [fetchingMore, orderList.next]);


  const localStringOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
  };

  function countTotalPrice(order) {
    let totalPriceCounter = 0;
    order.map((item) => {
      totalPriceCounter += (item.presetObject.price * item.orderNumber);
    });
    setTotalPrice(totalPriceCounter);
  }


  function setColorTheme(item) {
    const isPickupTimePassed = new Date(item.pickUpTime) < new Date();
    if (item.canceled) {
      return 'canceled-order-color-theme';
    }
    if (item.completed) {
      return 'completed-order-color-theme';
    }
    if (isPickupTimePassed) {
      return 'passed-order-color-theme';
    }
    return '';
  }

  return (
    <div>
      {
        orderList && (
          orderList.content.map((orderItem, index) => {
            const pickUpTime = new Date(orderItem.pickUpTime);
            let totalPriceCounter = 0;
            const itemRef = orderList.content.length === index + 1 ? lastItemElementRef : null;
            return (
              <div className={`${setColorTheme(orderItem)} receipt-card-borders-and-shadow`} ref={itemRef} key={index}>
                <header className="receipt-header">
                  {pickUpTime.toLocaleString('fi-FI', localStringOptions)}
                  {
                    !isSummary && (
                      <span className={classes.deleteButton}><ButtonBase onClick={() => { deleteOrderMethod(orderItem._id); }}><ClearRounded /></ButtonBase></span>
                    )
                  }
                </header>

                <SenderInfoDisplay user={orderItem.senderInfo} />

                {
                  orderItem && (
                    <div>
                      {
                        orderItem.order.map((item, i) => {
                          totalPriceCounter += item.presetObject.price * item.orderNumber;
                          return (
                            <div className={classes.orderItemSection} key={i}>
                              <div className={classes.orderItemName}>{`${item.orderNumber} x ${item.presetObject.name}`}</div>
                              <div className={classes.orderItemPrice}>{`${(item.presetObject.price * item.orderNumber).toFixed(2)} €`}</div>
                            </div>
                          );
                        })
                      }
                      <hr className={classes.hrLine} />
                      <div className={classes.orderItemSection}>
                        Kokonaissumma
                        <h5>{`${totalPriceCounter.toFixed(2)} €`}</h5>
                      </div>

                      <div className={classes.orderItemSection}>
                        Pick up time
                        <h5>{pickUpTime.toLocaleString('fi-FI', localStringOptions)}</h5>
                      </div>
                      <div className={classes.orderItemSection}>
                        Message
                        <h5>{orderItem.message || 'No message'}</h5>
                      </div>

                      {
                        orderItem.note && (
                          <div className={classes.orderItemSection}>
                            Note
                            <h5>{orderItem.note}</h5>
                          </div>
                        )
                      }

                      {
                        !isSummary && (
                          <OrderItemActionButtons orderItem={orderItem} updateOrderDataMethod={updateOrderDataMethod} />
                        )
                      }

                    </div>
                  )
                }
              </div>
            );
          })
        )
      }
      {
        fetchingMore && (
          <LoadingPlaceholder />
        )
      }

    </div>
  );
}
