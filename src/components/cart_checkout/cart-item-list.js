import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbnailImageCrop from '../image_components/thumbnail-image-crop';
import PlusMinusInputButton from '../buttons/plus-minus-input-button';
import { capitalizeFirstLetter } from '../../assets/helpers/helper-functions-index';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '95%',
    margin: 'auto',
    display: 'block',
    flexWrap: 'wrap',
    paddingBottom: '50px',
  },
  inlineFLex: {
    display: 'inline-flex',
  },
  deleteButtonContainer: {
    padding: '0 20px',
    textAlign: 'center',
    cursor: 'pointer',
    zIndex: 10,
  },
  orderBorder: {
    borderBottom: '1px solid #ddd',
    padding: '30px 0 20px',
  },
  platterName: {
    paddingLeft: '10px',
  },
}));

export default function CartItemList(props) {
  const { itemsInCart, addPresetToCartMethod, removeItemFromCartMethod } = props;
  const classes = useStyles();

  function handleOnInputChange(inputNumber, currentOrder) {
    // get differences between input and already existing orderNumber
    const newOrderNumber = inputNumber - currentOrder.orderNumber;
    addPresetToCartMethod(newOrderNumber, currentOrder.presetObject);
  }

  function renderTitle(index, title) {
    if (index == 0) {
      return <div className="sushiBorderTableTitle"><strong>{title}</strong></div>;
    }
  }

  function renderPlatterName2(order) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4" />
          <div className="col-xs-8">
            <div className={classes.platterName} />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={classes.displayContainer}>
      <h4>1. Ostoski </h4>
      {
        itemsInCart && (
          <div className="container">
            {
              itemsInCart.map((order, i) => (
                <div className={`${classes.orderBorder} row no-gutters`} spacing={2} key={order.presetObject._id}>
                  <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10">
                    {renderTitle(i, 'Tuote')}
                    <div className={classes.inlineFLex}>
                      <Link to={`/product/${order.presetObject._id}`}>
                        <ThumbnailImageCrop src={order.presetObject.image} alt={order.presetObject.name} customClass="cover-cropped" size={80} />
                      </Link>
                      <Link className={classes.platterName} to={`/product/${order.presetObject._id}`}>
                        <h5>{capitalizeFirstLetter(order.presetObject.name)}</h5>
                        {
                          order.presetObject.numberOfPieces && (
                            <p>
                              {`${order.presetObject.numberOfPieces} kpl`}
                            </p>
                          )
                        }
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    {renderTitle(i, 'Kpl-hinta')}
                    {`${order.presetObject.price.toFixed(2)} €`}
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    {renderTitle(i, 'Määrä / Yhteensä')}
                    <div className="add-to-cart-group-container">
                      <PlusMinusInputButton
                        defaultInput={order.orderNumber}
                        inputUnit="kpl"
                        onInputChange={(inputNumber) => handleOnInputChange(inputNumber, order)}
                      />
                      <div className="remove-icon-container" onClick={() => { removeItemFromCartMethod(order.presetObject._id); }}><DeleteIcon /></div>
                    </div>
                    <p>{`Yht. ${(order.presetObject.price * order.orderNumber).toFixed(2)} €`}</p>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
      {
        itemsInCart.length == 0 && (
          <div>No items in cart.</div>
        )
      }
    </div>
  );
}
