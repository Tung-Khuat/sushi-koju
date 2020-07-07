import { Endpoints } from './endpoints';
import {
  createCookie, readCookie, removeCookie, removeAllCookies,
} from '../assets/helpers/cookies';

const axios = require('axios');

const errorCodes = {
  unauthorized: 401,
  forbidden: 403,
};
const loggedInUserInfo = JSON.parse(readCookie('LOGGED_IN_USER_INFO'));
let awaitingRequest = [];
let isRefreshingToken = false;

export function sendRequestWithAccessToken(config, queueRequests) {
  awaitingRequest.push(config);
  executeRequest(config, queueRequests);
}

async function executeRequest(config, queueRequests) {
  const {
    method, url, headers, successHandler, failureHandler, data,
  } = config;
  try {
    const response = await axios({
      method: method || 'get',
      url,
      headers: {
        Authorization: `Bearer ${loggedInUserInfo.accessToken}`,
        ...headers,
      },
      data,
    });
    successHandler && successHandler(response);
  } catch (error) {
    if (error.response) {
      if (error.response.status === errorCodes.unauthorized && loggedInUserInfo.refreshToken) {
        // If token is currently being refresh, put all other requests in a queue
        if (isRefreshingToken && queueRequests) {
          awaitingRequest.push(config);
        }
        refreshAccessToken();
      }
    }

    failureHandler && failureHandler(error);
  }
}

function refreshAccessToken() {
  isRefreshingToken = true;
  const requestConfig = {
    method: 'post',
    url: Endpoints.refreshAccessToken(),
    data: { refreshToken: loggedInUserInfo.refreshToken },
    successHandler: (response) => {
      loggedInUserInfo.accessToken = response.data.accessToken;
      createCookie('LOGGED_IN_USER_INFO', JSON.stringify(loggedInUserInfo));

      // execute all request on queue
      awaitingRequest.map((config) => {
        config.headers = {
          Authorization: `Bearer ${loggedInUserInfo.accessToken}`,
        };
        sendRequestWithAccessToken(config);
      });
      isRefreshingToken = false;
      awaitingRequest = [];
    },
    failureHandler: (error) => {
      alert(error);
      removeCookie('LOGGED_IN_USER_INFO');
      isRefreshingToken = false;

      location.href = '/login';
    },
  };
  executeRequest(requestConfig);
}
