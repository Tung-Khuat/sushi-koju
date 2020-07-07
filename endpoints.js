const ROOT_URL = 'http://13.48.123.80:3001/api';

export const Endpoints = {
  /*
  ---------RECIPES---------
  */
  // Get a list of all sushi presets
  sushiPresetList() {
    return `${ROOT_URL}/sushi`;
  },
  // Root of sushi orders
  sushiOrderList() {
    return `${ROOT_URL}/orderlist`;
  },
  // Get order by ID
  orderById(id) {
    return `${ROOT_URL}/orderlist/${id}`;
  },
  // Get sushi by ID
  sushiById(id) {
    return `${ROOT_URL}/sushi/${id}`;
  },
  basic(ep) {
    return ROOT_URL + ep;
  },
};
