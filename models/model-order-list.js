const mongoose = require('mongoose');
const SushiOrderListSchema = require('./sushi-order-list-schema');

const orderListSchema = new mongoose.Schema(SushiOrderListSchema);

module.exports = mongoose.model('OrderList', orderListSchema);
