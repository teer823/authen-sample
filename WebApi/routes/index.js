const express = require('express');
const router = express.Router();
const proxy = require('http-proxy-middleware')
const authUtil = require('../utils/authUtil.js')

var resourceProxy = proxy('/resource', {
  target: process.env.RESOURCE_ENDPOINT || 'http://localhost:5003',
  pathRewrite: {'^/resource' : ''},
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('Authorization', res.locals.jwt)
  }
});

var authProxy = proxy('/auth', {
  target: process.env.AUTHEN_ENDPOINT || 'http://localhost:5001',
  pathRewrite: {'^/auth' : ''},
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyReq: function (proxyReq, req, res) {
    if(res.locals && res.locals.jwt) {
      proxyReq.setHeader('Authorization', res.locals.jwt)
    }
  },
  onProxyRes: function (proxyRes, req, res) {
    if(proxyRes.statusCode === 200) {
      let body = Buffer.from('')
      proxyRes.on('data', function(data) {
        body = Buffer.concat([body, data]);
      });
      proxyRes.on('end', function() {
        body = body.toString();
        const result = authUtil.processAuthResponse(body, res.locals ? res.locals.safeToken : null )
      
        if(result) {
          res.send(result)
        } else {
          res.status(500).send('Login Error')
        }
      });
    } else {
      res.sendStatus(proxyRes.statusCode);
    }
  }
});

router.get('/', function(req, res, next) {
  res.json({name: 'WebApi'})
});

router.use('/resource', authUtil.exchangeToken, resourceProxy)
router.use('/auth', authUtil.exchangeToken, authProxy)

module.exports = router