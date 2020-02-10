const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const router = require('./routes/index');

var app = express();

app.use(logger('dev'));
//Not compatible with http-proxy-middleware
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//app.use(resourceProxy)
//app.use(loginProxy)
app.use('/', router);

module.exports = app;
