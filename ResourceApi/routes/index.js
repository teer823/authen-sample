const express = require('express');
const router = express.Router();

const middleware = require('./middlewares/authen.js')

router.use(middleware.checkAuth)

router.get('/', function(req, res, next) {
  res.json({
    resource: {
      name: 'ResourceApi',
      user: req.user
    }
  })
});


module.exports = router