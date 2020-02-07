const express = require('express');
const router = express.Router();

const middleware = require('./middlewares/authen.js')

//router.use(middleware.checkAuth)

router.get('/', middleware.checkAuth, function(req, res, next) {
  res.json({
    resource: {
      name: 'ResourceApi',
      user: req.user
    }
  })
});

router.get('/resource', function(req, res, next) {
  res.send('resource api')
})


module.exports = router