var express = require('express');
var router = express.Router();
var moment = require('moment')
var jwtDecode = require('jwt-decode')

var cognitoUtil = require('../utils/cognito.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { 
    httpOnly: false
  });
  res.json({
    status: 'send token'
  });
});

router.get('/auth', function(req, res, next) {
  if(!req.query.code) {
    res.status(204).json({ error: 'Missing authentication info' });
  } else {
    // Check if code is in DB or Cache
    //   - Yes => check expire & then try to refresh, if impossible to refresh , get new tokens
    //   - No => Get New Tokens
    // To get new tokens
    //    - Call to cognito to exchange code for access_Token
    //    - Store Tokens in DB or Cache using code as a key
    //    - Sendback user info + expire date to associate with code
    cognitoUtil.exchangeCodeToToken(req.query.code).then((result) => {
      const decodedAcccesToken = jwtDecode(result.access_token)
      const decodedIDToken = jwtDecode(result.id_token)
      res.json({
        code: req.query.code,
        expire: moment().add(result.expires_in, 'seconds').format(),
        user: {
          name: decodedIDToken.name,
          email: decodedIDToken.email
        }
      });
    }).catch((error) => {
      res.status(403).send('Cannot exchange for access token')
    })
  }
})

router.get('/test', function( req, res, next) {
  res.json({})
})

module.exports = router;
