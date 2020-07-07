const mongoose = require('mongoose');
const SushiPresetSchema = require('./sushi-preset-schema');

const sushiSchema = new mongoose.Schema(SushiPresetSchema);

module.exports = mongoose.model('Sushi', sushiSchema);
