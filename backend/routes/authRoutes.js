const passport = require("passport");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Event = mongoose.model("Event");

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

  app.get('/auth/isAuthenticated', (req, res) => {
      res.json(req.user ? {isAuthenticated: true} : {isAuthenticated: false})
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

  app.post('/createEvent', function(req, res) {
      if(req.body){
          Event.findOne({title: req.body.title}).then(existingEvent => {
            if (!existingEvent){
                const eventMongoose = new Event(req.body).save();
                eventMongoose.then(function(result){
                    console.log(result);
                    res.json(result);
                })
            }
            else{
              res.json({success: false, message: "DuplicateEventTitleFailure"});
            }
          });
      }
      else{
        res.json({success: false, message: "EventCreateJSONFailure"});
      }
  });

    app.post('/submitRegistration', function(req, res) {
        if(req.body){
            Event.findOne({title: req.body.title}).then(existingEvent => {
                if (existingEvent){
                    if(!existingEvent.registrations){
                      existingEvent.registrations = [];
                    }
                    existingEvent.registrations.push(req.body.properties);
                    existingEvent.save().then(function(result){
                        console.log(result);
                        res.json(result);
                    })
                }
                else{
                    res.json({success: false, message: "InvalidEventTitleFailure"});
                }
            });
        }
        else{
            res.json({success: false, message: "SubmitRegistrationJSONFailure"});
        }
    });

};
