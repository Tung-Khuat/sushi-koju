const express = require('express');


const router = express.Router();

const SushiModel = require('../models/model-sushi');
const SushiPresetSchema = require('../models/sushi-preset-schema');


router.get('/', async (req, res) => {
  try {
    const sushi = await SushiModel.find();
    res.json(sushi.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send GET request to /sushi/:id to READ a sushi info
router.get('/:id', getSushiById, (req, res) => {
  res.json(res.sushiFound);
});

// Send POST request to /sushi to CREATE a new sushi
router.post('/', async (req, res) => {
  const newSushiObject = {};

  for (const key in SushiPresetSchema) {
    if (SushiPresetSchema.hasOwnProperty(key) && req.body[key]) {
      newSushiObject[key] = req.body[key];
    }
  }

  const newSushiModel = new SushiModel(newSushiObject);

  try {
    const newSushiPreset = await newSushiModel.save();
    res.status(201).json(newSushiPreset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Send DELETE request to /recipes/:id to DELETE a sushi preset
router.delete('/:id', getSushiById, async (req, res) => {
  try {
    await res.sushiFound.remove();
    res.json({ message: 'Deleted Sushi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to find sushi by id in database
async function getSushiById(req, res, next) {
  let sushi;
  try {
    sushi = await SushiModel.findById(req.params.id);
    if (sushi == null) {
      return res.status(404).json({ message: 'Cannot find sushi with that ID' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.sushiFound = sushi;
  next();
}


module.exports = router;
