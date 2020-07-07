import { Endpoints } from './endpoints';
import { ActionType } from './action-types';
import { sushiData, sushiBoxData, sushiPresetList } from '../assets/data/sushi';
import {
  createCookie, readCookie, removeCookie, removeAllCookies,
} from '../assets/helpers/cookies';
import { sendRequestWithAccessToken } from './token-requests';


const axios = require('axios');

const loggedInUserInfo = JSON.parse(readCookie('LOGGED_IN_USER_INFO'));

export async function fetchSushiPresetList(dispatch) {
  const response = await axios.get(Endpoints.sushiPresetList());
  return dispatch(
    {
      type: ActionType.FETCH_SUSHI_PRESET_LIST,
      payload: response.data,
    },
  );
}

export function fetchOrderList(dispatch, configParamObject) {
  const {
    query, successHandler, failureHandler, loadingCallback, isFetchMore,
  } = configParamObject;

  loadingCallback && loadingCallback(true);

  const requestConfig = {
    method: 'get',
    url: query ? `${Endpoints.sushiOrderList()}?${query}` : Endpoints.sushiOrderList(),
    successHandler: (response) => {
      loadingCallback && loadingCallback(false);
      dispatch(
        {
          type: isFetchMore ? ActionType.FETCH_MORE_ORDER_LIST : ActionType.FETCH_ORDER_LIST,
          payload: response.data,
        },
      );
    },
    failureHandler: (error) => {
      console.log(error);
      loadingCallback && loadingCallback(false);
    },
  };

  return sendRequestWithAccessToken(requestConfig, false);
}

export function fetchSushiMenu(dispatch) {
  return dispatch(
    {
      type: ActionType.FETCH_SUSHI_MENU,
      payload: sushiData,
    },
  );
}

export function fetchSushiBox(dispatch) {
  return dispatch(
    {
      type: ActionType.FETCH_SUSHI_BOX,
      payload: sushiBoxData,
    },
  );
}

export async function fetchSushiItemById(dispatch, id) {
  const response = await axios.get(Endpoints.sushiById(id));
  return dispatch(
    {
      type: ActionType.FETCH_SUSHI_ITEM,
      payload: response.data,
    },
  );
}

export async function postNewSushiPreset(dispatch, newSushiObject, successHandler) {
  const request = axios({
    method: 'post',
    url: Endpoints.sushiPresetList(),
    data: newSushiObject,
  });
  try {
    const response = await request;
    fetchSushiPresetList(dispatch);
    successHandler && successHandler();
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error);
      window.alert(error.response.data.message);
    }
  }
}

export async function editSushiWithId(dispatch, id, newSushiObject, successHandler) {
  const request = axios({
    method: 'patch',
    url: Endpoints.sushiById(id),
    data: newSushiObject,
  });
  try {
    const response = await request;
    fetchSushiList(dispatch);
    successHandler && successHandler();
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error);
      window.alert(error.response.data.message);
    }
  }
}

export async function deleteSushiById(dispatch, id, successHandler) {
  const confirmDelete = confirm('Are you sure you want to delete this sushi?');
  if (confirmDelete) {
    const response = await axios.delete(
      Endpoints.sushiById(id),
    ).then((response) => {
      successHandler && successHandler();
    }).catch((error) => {
      if (error.response && error.response.data) {
        console.log(error);
        window.alert(error.response.data.message);
      }
    });
    return dispatch(
      {
        type: ActionType.DELETE_SUSHI,
        payload: id,
      },
    );
  }
}

export async function deleteOrderById(dispatch, id, successHandler) {
  const confirmDelete = confirm('Are you sure you want to delete this order?');
  if (confirmDelete) {
    const response = await axios.delete(
      Endpoints.orderById(id),
    ).then((response) => {
      successHandler && successHandler();
      return dispatch(
        {
          type: ActionType.REMOVE_ORDER_FROM_SCREEN,
          payload: id,
        },
      );
    }).catch((error) => {
      if (error.response && error.response.data) {
        console.log(error);
        window.alert(error.response.data.message);
      }
    });
  }
}

export function removeItemFromCart(dispatch, id) {
  return dispatch(
    {
      type: ActionType.REMOVE_ITEM_IN_CART_BY_ID,
      payload: id,
    },
  );
}

export function addPresetToCart(dispatch, orderNumber, presetObject) {
  return dispatch(
    {
      type: ActionType.ADD_PRESET_TO_CART,
      payload: { orderNumber, presetObject },
    },
  );
}

export function setPickUpTime(dispatch, time) {
  return dispatch(
    {
      type: ActionType.SET_PICKUP_TIME,
      payload: time,
    },
  );
}

export function clearCurrentOrder(dispatch) {
  return dispatch(
    {
      type: ActionType.CLEAR_CURRENT_ORDER,
      payload: '',
    },
  );
}

export async function postNewOrder(dispatch, configParamObject) {
  const {
    newOrderObject, setPostingStateFunction, successHandler, failureHandler,
  } = configParamObject;

  setPostingStateFunction(true);

  const request = axios({
    method: 'post',
    url: Endpoints.sushiOrderList(),
    data: newOrderObject,
  }).then((response) => {
    successHandler && successHandler(response);
    setPostingStateFunction(false);
    return dispatch(
      {
        type: ActionType.SAVE_LATEST_ORDER_SENT,
        payload: response.data,
      },
    );
  })
    .catch((error) => {
      if (error.response && error.response.data) {
        failureHandler && failureHandler(error);
        console.log(error);
        setPostingStateFunction(false);
        console.log(error.response.data.message);
      }
    });
}

export async function updateOrderData(dispatch, configParamObject) {
  const {
    data, successHandler, failureHandler, loadingCallback, updateStore, id,
  } = configParamObject;

  loadingCallback && loadingCallback(true);

  const requestConfig = {
    method: 'patch',
    url: Endpoints.orderById(id),
    data,
    successHandler: (response) => {
      successHandler && successHandler(response);
      loadingCallback && loadingCallback(false);
      if (updateStore) {
        return dispatch(
          {
            type: ActionType.REMOVE_ORDER_FROM_SCREEN,
            payload: id,
          },
        );
      }
    },
    failureHandler: (error) => {
      if (error.response && error.response.data) {
        console.log(error);
      }
      failureHandler && failureHandler(response);
      loadingCallback && loadingCallback(false);
    },
  };

  return sendRequestWithAccessToken(requestConfig);
}

export async function submitLoginInfo(dispatch, loginInfoObject, successHandler) {
  const request = axios({
    method: 'post',
    url: Endpoints.userLogin(),
    data: {
      username: loginInfoObject.usernameInputValue,
      password: loginInfoObject.passwordInputValue,
    },
  }).then((response) => {
    createCookie('LOGGED_IN_USER_INFO', JSON.stringify(response.data));
    successHandler && successHandler(response);

    return dispatch(
      {
        type: ActionType.SET_LOGIN_INFO,
        payload: userInfoObject,
      },
    );
  })
    .catch((error) => {
      if (error.response && error.response.data) {
        console.log(error);
        window.alert(error.response.data.message);
      }
    });
}
