const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.get('/', function(req, res, next) {
  res.json({name: 'AuthenApi'})
});


router.post('/login', function(req, res, next) {
  let { email } = req.body;
  let name = email.match(/^([^@]*)@/)[1];
  let opts = {}
  opts.expiresIn = 60 * 5;  //token expires in 1min
  const secret = process.env.JWT_SECRET || "SECRET_KEY" //normally stored in process.env.secret
  const token = jwt.sign({ email, name }, secret, opts);
  return res.status(200).json({
      message: "Auth Passed",
      token
  })
});


router.get('/logout', function(req, res, next) {
  res.json({name: 'AuthenApi'})
});


module.exports = router