const jwt = require('jsonwebtoken')
const moment = require('moment')
const crypto = require('crypto')
const redis = require('redis')

const redisClient = redis.createClient(process.env.REDIS_ENDPOINT || 'redis://localhost');

function extractJwt(body) {
  const data = JSON.parse(body);
  return data.token
}

function processJwtToken(jwtToken) {
  const jwtSecret = process.env.JWT_SECRET || 'SECRET_KEY'
  let data = {
    info: {}
  }
  try {
    const payload = jwt.verify(jwtToken, jwtSecret)
    if(!payload.email) {
      //Email must exist
      return false
    }

    data.info.email = payload.email
    data.info.name = payload.name

    if(payload.exp) {
      data.expire_in = Math.abs(moment().format('X') - payload.exp)
    }

    redis.RedisClient

    const safeToken = crypto.randomBytes(48).toString('hex');
    data.token = safeToken

    redisClient.set(safeToken, jwtToken, 'EX', data.expire_in)

    // TODO create hash and add token to redis with expire = ttl
  } catch (err) {
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
    redisClient.get(safeToken, (err, jwtToken) => {
      if(err || !jwtToken) {
        console.log(err)
        res.sendStatus(401)
      } else {
        res.locals.jwt = `Bearer ${jwtToken}`
        next()
      }
    } )
  } else {
    res.sendStatus(401) //UnAuthorized
  }
}

module.exports = {
  extractJwt,
  processJwtToken,
  exchangeToken
}