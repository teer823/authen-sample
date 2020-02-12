const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || "SECRET_KEY" //normally stored in process.env.secret

function extractHeaderToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
      return req.query.token;
  }
  return null;
}

function generateJwtToken(data, expiresInSecond) {
  let opts = {}
  if(expiresInSecond) {
    opts.expiresIn = expiresInSecond
  }

  return jwt.sign(data, secret, opts);
}

function verifyJwtToken(jwtToken) {
  try {
    return jwt.verify(jwtToken, secret);
  } catch(err) {
    console.log(err)
    return false
  }
}

function generateAccessToken(data, expiresInSecond) {
  return generateJwtToken(data, expiresInSecond);
}

function generateRefreshToken(data, expiresInSecond) {
  return generateJwtToken(data, expiresInSecond);
}

function verifyRefreshToken(refresh_token) {
  return verifyJwtToken(refresh_token)
}

module.exports = {
  extractHeaderToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
}