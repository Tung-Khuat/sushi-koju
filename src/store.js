import React from 'react';
import { ActionType } from './actions/action-types';

export const Store = React.createContext();

const sessionStorageCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
const sessionStoragePickUpTime = JSON.parse(sessionStorage.getItem('pickUpTime'));
const currentMoment = new Date();
const dayAfterCurrentMoment = new Date(currentMoment.setDate(currentMoment.getDate() + 1));
const defaultPickupTime = dayAfterCurrentMoment.setHours(12, 0, 0);

const initialState = {
  sushiMenu: [],
  sushiBox: [],
  sushiPresetList: [],
  currentPresetInfo: null,
  favourites: [],
  itemsInCart: sessionStorageCart || [],
  pickUpTime: sessionStoragePickUpTime ? new Date(sessionStoragePickUpTime) : defaultPickupTime,
  orderList: null,
  latestOrderSent: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ActionType.FETCH_SUSHI_MENU:
      return { ...state, sushiMenu: action.payload };
    case ActionType.FETCH_SUSHI_BOX:
      return { ...state, sushiBox: action.payload };
    case ActionType.FETCH_SUSHI_PRESET_LIST:
      return { ...state, sushiPresetList: action.payload };
    case ActionType.FETCH_ORDER_LIST:
      return { ...state, orderList: action.payload };
    case ActionType.SAVE_LATEST_ORDER_SENT:
      return { ...state, latestOrderSent: action.payload };
    case ActionType.FETCH_MORE_ORDER_LIST:
      return {
        ...state,
        orderList: {
          next: action.payload.next,
          previous: action.payload.previous,
          content: state.orderList ? state.orderList.content.concat(action.payload.content) : action.payload.content,
        },
      };
    case ActionType.FETCH_SUSHI_ITEM:
      return { ...state, currentPresetInfo: action.payload };
    case ActionType.SET_PICKUP_TIME:
      const stringifiedTimeObject = JSON.stringify(action.payload);
      // session storage to keep pick up time on refresh
      sessionStorage.setItem('pickUpTime', stringifiedTimeObject);
      return { ...state, pickUpTime: action.payload };
    case ActionType.ADD_PRESET_TO_CART:
      const updatedCart = addPresetToCart(state.itemsInCart, action.payload);
      // session storage to keep cart on refresh
      const stringifiedItemsInCart = JSON.stringify(updatedCart);
      sessionStorage.setItem('itemsInCart', stringifiedItemsInCart);
      return { ...state, itemsInCart: updatedCart };
    case ActionType.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case ActionType.REMOVE_ORDER_FROM_SCREEN:
      return {
        ...state,
        orderList: {
          next: state.orderList.next,
          previous: state.orderList.previous,
          content: state.orderList.content.filter((order) => order._id != action.payload),
        },
      };
    case ActionType.REMOVE_ITEM_IN_CART_BY_ID:
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter((item) => item.presetObject._id != action.payload),
      };
    case ActionType.CLEAR_CURRENT_ORDER:
      sessionStorage.removeItem('itemsInCart');
      sessionStorage.removeItem('pickUpTime');
      return {
        ...state, itemsInCart: initialState.itemsInCart, pickUpTime: initialState.pickUpTime,
      };
    default:
      return state;
  }
}

function addPresetToCart(currentItemsInCart, newItemAdded) {
  // check if preset is already in cart
  const presetInCartIndex = currentItemsInCart.findIndex((order) => order.presetObject._id === newItemAdded.presetObject._id);
  // if not in cart, add new preset
  if (presetInCartIndex < 0) {
    return ([...currentItemsInCart, newItemAdded]);
  }
  // if in cart, update order number
  const updatedOrderObject = {
    orderNumber: currentItemsInCart[presetInCartIndex].orderNumber + newItemAdded.orderNumber,
    presetObject: newItemAdded.presetObject,
  };
  currentItemsInCart[presetInCartIndex] = updatedOrderObject;
  return currentItemsInCart;
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Store.Provider value={value}>{props.children}</Store.Provider>
  );
}
