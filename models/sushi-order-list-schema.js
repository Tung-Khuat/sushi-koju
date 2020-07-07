const sushiOrderList = {
  order: {
    type: Array,
    required: true,
  },
  pickUpTime: {
    type: Object,
    required: true,
  },
  senderInfo: {
    type: Object,
    required: true,
  },
  message: {
    type: String,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  canceled: {
    type: Boolean,
    required: true,
    default: false,
  },
  note: {
    type: String,
  },
};

module.exports = sushiOrderList;
