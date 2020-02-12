const express = require('express');
const router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('USERS end point');
});

/* GET users profile */
router.get('/profile', function(req, res, next) {
  res.send('USER profile endpoint')
});

/* POST add user */
router.post('/create', function(req, res, next) {
  //const { email, name, password, permissions} = req.body;
  // NOTE :: In production encrypt password !!!
  const user = new User(req.body);
  user.save().then(() => res.sendStatus(201)).catch(() => res.sendStatus(400))
});

module.exports = router;
