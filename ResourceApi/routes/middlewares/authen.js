const passport = require("passport");

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || 'SECRET_KEY'; //normally store this in process.env.secret

const jwtStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
    //From JWT Extract User Info
    if (jwt_payload.email) {
        return done(null, jwt_payload.email)
    }
    return done(null, false, jwt_payload)
}) 

function checkAuth (req, res, next) {
  passport.authenticate('jwt', function(err, user, info) {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }

    if (!user) { 
      if(info.name === 'TokenExpiredError') {
        return res.status(401).send('token expired')
      } else {
        //No User Info found on JWT
        return res.sendStatus(403);
      }
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