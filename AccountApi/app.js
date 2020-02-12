const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

require('./services/passport')

const router = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_ENDPOINT, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
  authSource: 'admin',
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('db connected')
});

app.use('/', router);

module.exports = app;
