const mongoose = require('mongoose');

const tokens = {
  refreshToken: {
    type: String,
    required: true,
  },
};

const tokenSchema = new mongoose.Schema(tokens);

module.exports = mongoose.model('Token', tokenSchema);
