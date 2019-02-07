const passport = require("passport");

module.exports = (app) => {
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

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/auth/getUser', (req, res) => {
    console.log("***********E");
    console.log("in /auth/getUser"); console.log(req.user); console.dir(req)
;    res.send(req.user);
  });
};
