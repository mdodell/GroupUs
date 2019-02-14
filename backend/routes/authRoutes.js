const passport = require("passport");
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.json());

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook')
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/auth/getUser', (req, res) => {
    res.send(req.user);
  });

  app.post('/auth/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log(req.body);
        console.log(err);
        console.log(user);
        console.log(info);
        return res.send({ success : false, message : 'AuthFailure', err: err, user: user, info: info });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.redirect("/");
      });
    })(req, res, next);
  });

  app.post('/auth/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success : false, message : 'AuthFailure'});
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.json(true);
      });
    })(req, res, next);
  });

};
