require('dotenv').config();

const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Sushi Database'));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  next();
});

const SushiPresetRouter = require('./controllers/controller-sushi');
const SushiOrderListRouter = require('./controllers/controller-order-list');
const UserRouter = require('./controllers/controller-user');
const TokenRouter = require('./controllers/controller-token');

app.use('/api/sushi', SushiPresetRouter);
app.use('/api/orderlist', SushiOrderListRouter);
app.use('/api/users', UserRouter);
app.use('/api/staff', TokenRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}!!`));
