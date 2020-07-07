import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ThumbnailImageCrop from '../image_components/thumbnail-image-crop';
import PlusMinusInputButton from '../buttons/plus-minus-input-button';
import { capitalizeFirstLetter } from '../../assets/helpers/helper-functions-index';


const useStyles = makeStyles((theme) => ({
  receiptHeader: {
    color: '#fff',
    background: '#337ab7',
    padding: '10px',
  },
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
    border: '0.3px solid #c3c3c3',
    width: '97%',
  },
}));

export default function ReceiptCard(props) {
  const { itemsInCart } = props;
  const classes = useStyles();
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    countTotalPrice(itemsInCart);
  });

  function countTotalPrice(items) {
    let totalPriceCounter = 0;
    items.map((item) => {
      totalPriceCounter += (item.presetObject.price * item.orderNumber);
    });
    setTotalPrice(totalPriceCounter);
  }

  return (
    <div className="cart-receipt-card">
      <div className="receipt-card-borders-and-shadow">
        <h4 className="receipt-header">Yhteenveto</h4>
        {
          itemsInCart.length == 0 && (
            <div className={classes.orderItem}>No items in cart</div>
          )
        }
        {
        itemsInCart && (
          <div>
            {itemsInCart.map((item, i) => (
              <div className={classes.orderItem} key={i}>
                <div className={classes.orderItemName}>{`${item.orderNumber} x ${item.presetObject.name}`}</div>
                <div className={classes.orderItemPrice}>{`${(item.presetObject.price * item.orderNumber).toFixed(2)} €`}</div>
              </div>
            ))}
            <hr className={classes.hrLine} />
            <div className={classes.orderItem}>
              Kokonaissumma:
              <h5>{`${totalPrice.toFixed(2)} €`}</h5>
            </div>
          </div>
        )
      }
      </div>
    </div>
  );
}
