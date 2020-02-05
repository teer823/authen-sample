var csrf = require('csurf')

function getCSRFValue (req) {
  const value = (req.body && req.body._csrf) ||
    (req.query && req.query._csrf) ||
    (req.headers['csrf-token']) ||
    (req.headers['xsrf-token']) ||
    (req.headers['x-csrf-token']) ||
    (req.headers['x-xsrf-token']) ||
    (req.cookies && req.cookies['xsrf-token']) || 
    (req.cookies && req.cookies['XSRF-TOKEN'])
    return value;
}

var csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600 // 1-hour
  },
  value: getCSRFValue
});

module.exports = csrfProtection