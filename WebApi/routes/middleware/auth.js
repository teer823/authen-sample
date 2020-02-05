function checkAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No credentials sent!' });
  }
  next()
}

function verifyAuthCode(req, res, next) {
  next()
}

module.exports = {
  checkAuth,
  verifyAuthCode
}