const express = require('express');
const router = express.Router();
const proxy = require('http-proxy-middleware')
const authUtil = require('../utils/authUtil.js')

var resourceProxy = proxy('/resource', {
  target: process.env.RESOURCE_ENDPOINT || 'http://localhost:5003',
  pathRewrite: {'^/resource' : ''},
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('Authorization', res.locals.jwt)
  },
  onProxyRes(proxyRes, req, res) {
    console.log(proxyRes)
  }
});

var loginProxy = proxy('/login', {
  target: process.env.AUTHEN_ENDPOINT || 'http://localhost:5001',
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyRes: function (proxyRes, req, res) {
    if(proxyRes.statusCode === 200) {
      //Unauthorize, remove jwt token
      let body = Buffer.from('')
      proxyRes.on('data', function(data) {
        body = Buffer.concat([body, data]);
      });
      proxyRes.on('end', function() {
        body = body.toString();
        const jwtToken = authUtil.extractJwt(body)
        const data = authUtil.processJwtToken(jwtToken)
      
        if(data) {
          res.send(data)
        } else {
          res.status(500).send('Login Error')
        }
      });
    }
  }
});


router.get('/', function(req, res, next) {
  res.json({name: 'WebApi'})
});

router.use('/resource', authUtil.exchangeToken, resourceProxy)
router.use('/login', loginProxy)

module.exports = router