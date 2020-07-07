const express = require('express');

const router = express.Router();
const Middlewares = require('./middlewares');

const OrderListModel = require('../models/model-order-list');
const SushiOrderListSchema = require('../models/sushi-order-list-schema');


router.get('/', Middlewares.authenticateToken, async (req, res) => {
  try {
    const orderList = await OrderListModel.find(
      { completed: req.query.completed || false, canceled: req.query.canceled || false },
    );

    let response = orderList;
    if (req.query.sort || req.query.filter) {
      response = sortAndFilterWithQueries(req.query, orderList);
    }

    const paginatedResponse = paginateOrderlist(response, req.query.page || 1, req.query.limit || 3);
    res.json(paginatedResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send GET request to /orderlist/:id to READ a orderlist info
router.get('/:id', getOrderById, (req, res) => {
  res.json(res.orderlistFound);
});

// Send POST request to /orderlist to CREATE a new order
router.post('/', async (req, res) => {
  const newOrderObject = {};

  for (const key in SushiOrderListSchema) {
    if (SushiOrderListSchema.hasOwnProperty(key) && req.body[key]) {
      newOrderObject[key] = req.body[key];
    }
  }

  // Check if order is in the past
  const pickUpTime = new Date(newOrderObject.pickUpTime);
  const compareOrderDateToPresent = pickUpTime - new Date();
  if (compareOrderDateToPresent < 0) {
    res.status(400).json({ message: `Cannot set order: ${pickUpTime.toLocaleString('en-en')} ${pickUpTime.toLocaleString('en-en')} is an invalid date.` });
  } else {
    const newOrderListModel = new OrderListModel(newOrderObject);
    try {
      const newOrderPreset = await newOrderListModel.save();
      res.status(201).json(newOrderPreset);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

// PATCH request using id
router.patch('/:id', [Middlewares.authenticateToken, getOrderById], async (req, res) => {
  for (const key in SushiOrderListSchema) {
    if (SushiOrderListSchema.hasOwnProperty(key)) {
      if (req.body[key] && req.body[key] !== null) {
        res.orderlistFound[key] = req.body[key];
      }
    }
  }
  try {
    const newOrderList = await res.orderlistFound.save();
    console.log(newOrderList);
    res.status(200).json(newOrderList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Send DELETE request to /recipes/:id to DELETE an order
router.delete('/:id', getOrderById, async (req, res) => {
  try {
    await res.orderlistFound.remove();
    res.json({ message: 'Deleted Order' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to find orders by id in database
async function getOrderById(req, res, next) {
  let order;
  try {
    order = await OrderListModel.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order with that ID' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.orderlistFound = order;
  next();
}

function paginateOrderlist(model, queryPage, queryLimit) {
  const page = parseInt(queryPage);
  const limit = parseInt(queryLimit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  // remove prev and next for start and end
  if (endIndex < model.length) {
    results.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }

  results.content = model.slice(startIndex, endIndex);
  return results;
}
const SortQueries = {
  newestSentDate: 'sent-date',
  newestOrderDate: 'order-date',
};
const FilterQueries = {
  noPassedOrderDate: 'no-passed-order-date',
  canceledOnly: 'canceled-only',
};

function sortAndFilterWithQueries(query, orderList) {
  let responseOrderList = orderList;

  switch (query.sort) {
    case SortQueries.newestSentDate:
      responseOrderList = orderList.reverse();
      break;
    case SortQueries.newestOrderDate:
      responseOrderList = orderList.sort((a, b) => new Date(a.pickUpTime) - new Date(b.pickUpTime));
      break;
    default:
  }

  switch (query.filter) {
    case FilterQueries.noPassedOrderDate:
      responseOrderList = orderList.filter((order) => new Date(order.pickUpTime) >= new Date());
      break;
    case FilterQueries.canceledOnly:
      responseOrderList = orderList.filter((order) => order.cancelNote);
      break;
    default:
  }

  return (responseOrderList);
}

module.exports = router;
