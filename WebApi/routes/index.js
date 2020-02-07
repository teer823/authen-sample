const express = require('express');
const router = express.Router();
const proxy = require('http-proxy-middleware')

var resourceProxy = proxy('/resource', {
  target: process.env.RESOURCE_ENDPOINT,
  pathRewrite: {'^/resource' : ''},
  onProxyReq: function (proxyReq, req, res) {
    // Replace temp token with correct JWT Token from cache
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlZXI4MjNAZ21haWwuY29tIiwiaWF0IjoxNTgxMDUwNjQ2LCJleHAiOjE1ODEwNTA5NDZ9.FOO2xowm3mif2XhBaNmHgC4KaMWjG_EaCKCaGEj_hLs"
    proxyReq.setHeader('Authorization', `Bearer ${token}`);
  },
  onProxyRes: function (proxyRes, req, res) {
    if(proxyRes.statusCode === 403) {
      //Unauthorize, remove jwt token
      let expired = true;
    }
  }
});

var loginProxy = proxy('/login', {
  target: process.env.AUTHEN_ENDPOINT
});


router.get('/', function(req, res, next) {
  res.json({name: 'WebApi'})
});

router.use('/resource', resourceProxy)
router.use('/login', loginProxy)

module.exports = router