const sushiPresetObjectSchema = {
  name: {
    type: String,
    required: true,
  },
  numberOfPieces: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  leftInfo: {
    type: Object,
  },
  rightInfo: {
    type: Object,
  },
  sushiPieceIngredients: {
    type: Array,
  },
  additionalInfo: {
    type: String,
  },
};

module.exports = sushiPresetObjectSchema;
