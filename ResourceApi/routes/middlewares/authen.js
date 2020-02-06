const passport = require("passport");

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY'; //normally store this in process.env.secret

const jwtStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.email) {
        return done(null, jwt_payload.email)
    }
    return done(null, false, jwt_payload)
}) 

function checkAuth (req, res, next) {
  passport.authenticate('jwt', function(err, user, info) {
    if (err) {
      return next(err); 
    }

    if (!user) { 
      return res.status(400).send('UnAuthorized')
    }

    req.user = {
      email: user
    }

    next()

  })(req, res, next);
}

passport.use(jwtStrategy)

module.exports = {
  checkAuth
}