var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/user', function(req, res, next) {
  const today = new Date()
  res.json({
    'name' : 'Mr.Success Authen',
    'secret' : {
      'message': 'This is your secret data',
      'hash': 'ABCDEF'
    },
    'time' : today.toLocaleString()
  });
});

module.exports = router;
