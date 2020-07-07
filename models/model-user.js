const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = require('./user-schema');

const userSchema = new mongoose.Schema(UserSchema);
userSchema.plugin(uniqueValidator), { message: '{VALUE} already exist.' };

module.exports = mongoose.model('User', userSchema);
