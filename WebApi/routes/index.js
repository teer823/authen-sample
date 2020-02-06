const express = require('express');
const router = express.Router();

router.use('/users', require('./users'))

router.get('/', function(req, res, next) {
  res.json({name: 'WebApi'})
});

module.exports = router