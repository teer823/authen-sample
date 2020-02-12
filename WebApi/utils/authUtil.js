const jwt = require('jsonwebtoken')
const moment = require('moment')
const crypto = require('crypto')
const redis = require('redis')

const redisClient = redis.createClient(process.env.REDIS_ENDPOINT || 'redis://localhost');

function processAuthResponse(responseBody, existingToken) {
  const payload = JSON.parse(responseBody)

  const type = payload.type;
  const access_token = payload.access_token;
  const refresh_token = payload.refresh_token;
  const expiresIn = payload.expiresIn;

  const jwtSecret = process.env.JWT_SECRET || 'SECRET_KEY'

  let data = {
    info: {}
  }
  try {

    // TODO : Do we need to store token in conjuction with 'email' in order to invalidate it ?
    const safeToken = existingToken || crypto.randomBytes(48).toString('hex');
    data.token = safeToken

    if(type === 'logout') {
      redisClient.del(safeToken)
      return {
        message: 'logged out'
      }
    }

    // Verify and read jwt, maybe just 'decode' is enough
    const payload = jwt.verify(access_token, jwtSecret)

    // Validate important data
    if(!payload.email) {
      //Email must exist
      return false
    }

    data.info.email = payload.email
    data.info.name = payload.name

    if(expiresIn) {
      data.expire_in = expiresIn; //Math.abs(moment().format('X') - payload.exp)
    }

    // Store Cache Token in REDIS
    redisClient.hset(safeToken, 'access_token', access_token)
    if(expiresIn) {
      //If have new expire time, change expire
      // Note : HSET don't interfere with TTL like SET
      redisClient.expire(safeToken, data.expire_in)
    }

    if(refresh_token) {
      redisClient.hset(safeToken, 'refresh_token', refresh_token)
    }

    // TODO create hash and add token to redis with expire = ttl
  } catch (err) {
    console.log(err)
    return false
  }

  return data
}

function extractHeaderToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
      return req.query.token;
  }
  return null;
}

function exchangeToken (req, res, next) {
  const safeToken = extractHeaderToken(req)
  if(safeToken) {
    res.locals.safeToken = safeToken
    if(req.path === '/refresh') {
      redisClient.hget(safeToken, 'refresh_token', (err, refresh_token) => {
        if(err || !refresh_token) {
          console.log(err)
          res.sendStatus(401)
        } else {
          res.locals.jwt = `Bearer ${refresh_token}`
          next()
        }
      } )
    } else {
      redisClient.hget(safeToken, 'access_token', (err, access_token) => {
        if(err || !access_token) {
          console.log(err)
          res.sendStatus(401)
        } else {
          res.locals.jwt = `Bearer ${access_token}`
          next()
        }
      } )
    }
    
  } else {
    next()
    // res.sendStatus(401) //UnAuthorized
  }
}

function exchangeRefreshToken(){

}

module.exports = {
  processAuthResponse,
  exchangeToken
}