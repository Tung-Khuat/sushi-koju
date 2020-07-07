const express = require('express');


const router = express.Router();

const UserModel = require('../models/model-user');
const UserSchema = require('../models/user-schema');


router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getUserById, (req, res) => {
  res.json(res.userFound);
});

router.post('/', async (req, res) => {
  const newUserObject = {};

  for (const key in UserSchema) {
    if (UserSchema.hasOwnProperty(key) && req.body[key]) {
      newUserObject[key] = req.body[key];
    }
  }

  const newUserModel = new UserModel(newUserObject);

  try {
    const newUserPreset = await newUserModel.save();
    res.status(201).json(newUserPreset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getUserById, async (req, res) => {
  try {
    await res.userFound.remove();
    res.json({ message: 'Deleted User' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to find user by id in database
async function getUserById(req, res, next) {
  let user;
  try {
    user = await UserModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user with that ID' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.userFound = user;
  next();
}


module.exports = router;
