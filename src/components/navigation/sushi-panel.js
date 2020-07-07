import React from 'react';
import {
  Favorite,
  ShoppingCart, ArrowBackRounded,
} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const defaultNavItems = [
  {
    label: 'Etusivu',
    href: '/',
  },
  {
    label: 'Platterit',
    href: '/platterit',
  },
];

const useStyles = makeStyles((theme) => ({
  sushiNav: {
    color: '#fff',
    background: '#ed8373',
    padding: '0.5rem 10% 0.5rem 10%',
    overflow: 'auto',
  },
  leftPanel: {
    float: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  rightPanel: {
    float: 'right',
    display: 'flex',
    alignItem: 'center',
  },
  addPadding: {
    padding: '0 1rem 0 1rem',
  },
}));


export default function SushiPanel(props) {
  const {
    left, right, hasLogo, hasNavItems, hasCart, hasBackButton,
  } = props;
  const classes = useStyles();
  const itemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart')) || null;

  function renderTotalCost() {
    let totalCost = 0;
    if (itemsInCart) {
      itemsInCart.map((item) => {
        totalCost += item.orderNumber * item.presetObject.price;
      });
    }
    return (
      <Link to="/kassa">
        {' '}
        <ShoppingCart />
        {' '}
        {` ${totalCost.toFixed(2)} €`}
      </Link>
    );
  }

  return (
    <div className={`${classes.sushiNav} navigation-panel`}>
      <div className={classes.leftPanel}>
        {hasLogo && <Link className={classes.addPadding} to="/"><h3>Sushi Koju</h3></Link>}
        {
          hasBackButton && (
            <Link className={classes.addPadding}>Takaisin</Link>
          )
        }
        {
          hasNavItems && (
            defaultNavItems.map((item, i) => (
              <Link className={classes.addPadding} to={item.href} key={i}>{item.label}</Link>
            ))
          )
        }
      </div>
      <div className={classes.rightPanel}>
        {right}
        {hasCart && renderTotalCost()}
      </div>
    </div>
  );
}
