const express = require('express');
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user   : user
        });
    }
   req.login(user, {session: false}, (err) => {
       if (err) {
           res.send(err);
       }
       // generate a signed son web token with the contents of user object and return it in the response
       return res.json(user);
    });
})(req, res);
});

router.get('/logout', function(req, res, next) {
  res.send('USERS Logout endpoint')
})

module.exports = router;