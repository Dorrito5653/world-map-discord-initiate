require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.DBTOKEN || '',{
    useNewUrlParser: true,
  });
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const cors = require('cors');
const router = require('./tools/routes/config');

app.use(
  express.json(),
  cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use('/config', router);

app.listen(3000, () => console.log('DB Server Started'))

const jsonFiles = express();
const jsonRoutes = require('./tools/routes/json');

jsonFiles.use(
  express.json(),
  cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  })
);
jsonFiles.use('/json', jsonRoutes)

jsonFiles.listen(8000, () => console.log('JSON Collection Started'))