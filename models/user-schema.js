const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: true,
  },
};

module.exports = userSchema;
