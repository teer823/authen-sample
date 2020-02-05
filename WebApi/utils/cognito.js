var axios = require('axios')
var qs = require('qs')
var moment = require('moment')
var jwtDecode = require('jwt-decode')
var cache = require('memory-cache')

function exchangeCodeToToken(code) {
  return new Promise((resolve, reject) => {
    const cachedResponse = cache.get(code)
    if(cachedResponse) {
      resolve(cachedResponse)
    } else {
      const exchangeEndpoint = `${process.env.COGNITO_ENDPOINT}/oauth2/token`;
      const data = {
        grant_type: 'authorization_code',
        client_id: process.env.COGNITO_CLIENT_ID,
        redirect_uri: process.env.COGNITO_REDIRECT_URI,
        code: code
      }
      axios.post(exchangeEndpoint, qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((result) => {
        cache.put(data.code, result.data, result.data.expires_in * 1000)
        resolve(result.data)
      }).catch((error) => {
        reject(error)
      });
    }
  });
}

function getUserInfo(access_token) {
  return new Promise((resolve, reject) => {
    const exchangeEndpoint = `${process.env.COGNITO_ENDPOINT}/oauth2/userInfo`;
    const bearer = `Bearer ${access_token}`
    axios.get(exchangeEndpoint, {
      headers: {
        'Authorization': bearer
      }
    }).then((result) => {
      resolve(result.data)
    }).catch((error) => {
      reject(error)
    });
  });
}

module.exports = {
  exchangeCodeToToken,
  getUserInfo
}