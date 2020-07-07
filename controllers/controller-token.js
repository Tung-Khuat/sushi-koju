const express = require('express');


const router = express.Router();
const jwt = require('jsonwebtoken');

const UserModel = require('../models/model-user');
const UserSchema = require('../models/user-schema');

const TokenModel = require('../models/model-token');


router.post('/token', async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(404);

  const matchingRefreshToken = await TokenModel.find({ refreshToken });
  if (matchingRefreshToken.length < 1) return res.sendStatus(401);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

router.post('/login', async (req, res) => {
  const username = req.body.username.toLowerCase();
  const { password } = req.body;
  try {
    const matchedUsernames = await UserModel.find({ username });
    const matchedPasswords = await UserModel.find({ password });

    if (matchedUsernames.length < 1) {
      res.status(403).json({ message: 'Invalid username' });
    } else if (matchedPasswords.length < 1) {
      res.status(403).json({ message: 'Invalid password' });
    } else if (matchedUsernames.length > 0 && matchedPasswords.length > 0) {
      const user = { name: username };

      const accessToken = generateAccessToken(user);

      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2200h' });
      const newTokenModel = new TokenModel({ refreshToken });
      const newRefreshToken = await newTokenModel.save(refreshToken);

      res.json({
        accessToken, refreshToken, user: matchedUsernames[0].username, email: matchedUsernames[0].email,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(404);
  try {
    await TokenModel.find({ refreshToken }).remove();
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1day' });
}


module.exports = router;
