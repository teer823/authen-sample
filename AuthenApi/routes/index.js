const express = require('express');
const router = express.Router();


const auth = require('./auth/local')

router.get('/', function(req, res, next) {
  res.json({name: 'AuthenApi'})
});


router.post('/login', auth.login) 
router.post('/refresh', auth.refresh);
router.get('/logout', auth.logout);


module.exports = router