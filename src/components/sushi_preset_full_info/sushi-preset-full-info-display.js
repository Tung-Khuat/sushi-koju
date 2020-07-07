import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Button, TextField, ButtonBase, Grid, Breadcrumbs,
} from '@material-ui/core';
import {
  ShoppingCart, ArrowBackRounded, Edit, Add, Remove,
} from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PlusMinusInputButton from '../buttons/plus-minus-input-button';
import ThumbnailImageCrop from '../image_components/thumbnail-image-crop';
import { capitalizeFirstLetter } from '../../assets/helpers/helper-functions-index';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '95%',
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    display: 'inline-block',
    width: 350,
  },
  platterName: {
    maxWidth: '40vw',
  },
  displayFlex: {
    display: 'flex',
    margin: '15px 0 15px',
  },
  displayInlineFlex: {
    display: 'inline-flex',
  },
  ingredientSection: {
    width: '90%',
    margin: 'auto',
  },
  blackText: {
    color: '#212529',
  },
  marginBottom: {
    marginBottom: '2rem',
  },
}));

export default function SushiPresetFullInfoDisplay(props) {
  const { preset, addPresetToCartMethod, itemsInCart } = props;
  const classes = useStyles();
  const [orderNumber, setOrderNumber] = React.useState(1);

  function renderColumnInfo(info) {
    if (info) {
      return (
        <Grid item sm={12} md={6}>
          <strong>{capitalizeFirstLetter(info.label)}</strong>
          {
            info.content.map((item, i) => (
              <div key={i}>{`${item.amount} kpl - ${item.name}`}</div>
            ))
          }
        </Grid>
      );
    }
  }


  function handleOnClick() {
    addPresetToCartMethod(orderNumber, preset);
  }

  return (
    <div className="platter-full-info-container">
      {
        preset && (
          <>
            <Breadcrumbs aria-label="breadcrumb">
              <span className={classes.blackText}>Olet täällää: </span>
              <Link color="inherit" to="/">
                  Etusivu
              </Link>
              <Link color="inherit" to="/platterit">
                  Platterit
              </Link>
              <strong className={classes.blackText}>{preset.name}</strong>
            </Breadcrumbs>
            <Grid container spacing={2} className={classes.marginBottom}>
              <Grid item sm={6} lg={5}>
                <ThumbnailImageCrop src={preset.image} alt={preset.name} customClass="cover-cropped" size="100" unit="%" minWidth="280px" />
              </Grid>
              <Grid item className="platter-info" sm={6} lg={6}>
                <h1 className={classes.platterName}>{capitalizeFirstLetter(preset.name)}</h1>
                <h4>
                  {
                    preset.numberOfPieces && (
                      <span>{`${preset.numberOfPieces} kpl - `}</span>
                    )
                  }
                  {`Hinta ${preset.price.toFixed(2)} €`}
                </h4>
                <Typography variant="caption">{`Product code: ${preset._id}`}</Typography>
                <div className="add-to-cart-group-container">
                  <PlusMinusInputButton
                    defaultInput={orderNumber}
                    inputUnit="kpl"
                    onInputChange={setOrderNumber}
                    customClass={classes.displayInlineFlex}
                  />
                  <Button variant="contained" color="primary" className="add-to-cart-button" onClick={handleOnClick}>
                    <ShoppingCart />
                    {' '}
                    Add to Cart
                  </Button>
                </div>
                <Grid container spacing={2}>
                  {renderColumnInfo(preset.leftInfo)}
                  {renderColumnInfo(preset.rightInfo)}
                </Grid>
              </Grid>
            </Grid>
            {
              preset.sushiPieceIngredients.length > 0 && (
                <div className="ingredient-section">
                  <h3>Ingredients</h3>
                  {preset.sushiPieceIngredients.map((piece, i) => (
                    <div key={i}>
                      <strong>{piece.name}</strong>
                      <p>{`Ingredients: ${piece.ingredients}`}</p>
                    </div>
                  ))}
                </div>
              )
            }
          </>
        )
      }
    </div>
  );
}
