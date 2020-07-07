import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Store } from '../../../store';
import {
  addPresetToCart, removeItemFromCart, setPickUpTime, updateMessage, fetchOrderList, deleteOrderById, updateOrderData,
} from '../../../actions/action-sushi';
import OrderListDisplay from './order-list-display';
import LoadingPlaceholder from '../../loading_placeholders/loading-placeholders';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '95%',
    margin: '50px auto',
  },
}));

const defaultQuery = 'sort=order-date&filter=no-passed-order-date&completed=false';

export default function OrderListIndex() {
  const { state, dispatch } = React.useContext(Store);
  const classes = useStyles();
  const [isLoading, setLoadingState] = React.useState(false);
  const [currentQuery, setCurrentQuery] = React.useState(null);

  React.useEffect(() => {
    if (!state.orderList) {
      setCurrentQuery(defaultQuery);
      fetchOrderList(dispatch, { query: defaultQuery, loadingCallback: setLoadingState });
    }
  }, []);

  function renderFetchOrderListButton(buttonLabel, query, index) {
    return (
      <Button key={index} variant="contained" onClick={() => { handleButtonOnClick(query); }}>{buttonLabel}</Button>
    );
  }
  function handleButtonOnClick(query) {
    setCurrentQuery(query);
    fetchOrderList(dispatch, { query, loadingCallback: setLoadingState });
  }
  const orderListButtons = [
    {
      label: 'Upcoming',
      orderQuery: 'sort=order-date&filter=no-passed-order-date&completed=false&canceled=false',
    },
    {
      label: 'Completed',
      orderQuery: 'sort=order-date&completed=true&canceled=false',
    },
    {
      label: 'Incomplete',
      orderQuery: 'sort=order-date&completed=false&canceled=false',
    },
    {
      label: 'Canceled',
      orderQuery: 'sort=order-date&canceled=true',
    },
  ];

  return (
    <div className={classes.displayContainer}>
      <div className="order-receipt-button-container">
        {
          orderListButtons.map((button, index) => renderFetchOrderListButton(button.label, button.orderQuery, index))
        }
      </div>
      {
        (state.orderList && !isLoading) && (
        <OrderListDisplay
          orderList={state.orderList}
          deleteOrderMethod={(id) => { deleteOrderById(dispatch, id); }}
          updateOrderDataMethod={(id, data) => { updateOrderData(dispatch, { id, data, updateStore: true }); }}
          fetchMoreMethod={(pageNumber, setFetchingMore) => { fetchOrderList(dispatch, { query: `${currentQuery}&page=${pageNumber}`, loadingCallback: setFetchingMore, isFetchMore: true }); }}
        />
        )
      }
      {
        isLoading && (
          <LoadingPlaceholder />
        )
      }
      {
        (!state.orderList && !isLoading) && (
          <h3>No matching orders found.</h3>
        )
      }
      {
        (state.orderList && state.orderList.content.length < 1) && (
          <h3>No Upcoming Orders.</h3>
        )
      }
    </div>
  );
}
