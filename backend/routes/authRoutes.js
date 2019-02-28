const passport = require("passport");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Event = mongoose.model("Event");
const User = mongoose.model("User");
const Registration = mongoose.model("Registration");

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
                return res.send({ success : false, message : 'AuthFailure', err: err, user: user, info: info});
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.json(true);
            });
        })(req, res, next);
    });

    app.get('/event/getEvent', (req, res) => {
        if(req.body) {
            Event.findById(req.id).then(existingEvent => {
                if(existingEvent){
                    res.json(existingEvent);
                }
                else{
                    res.json({success: false, message: "GetEventIdFailure"});
                }
            });
        }
        else{
            res.json({success: false, message: "GetEventJSONFailure"});
        }
    });

    app.get('/event/getRegistration', (req, res) => {
        if(req.body) {
            Registration.findById(req.id).then(existingRegistration => {
                if(existingRegistration){
                    res.json(existingRegistration);
                }
                else{
                    res.json({success: false, message: "GetRegistrationIdFailure"});
                }
            });
        }
        else{
            res.json({success: false, message: "GetRegistrationJSONFailure"});
        }
    });

    app.post('/event/createEvent', function(req, res) {
        if(req.body){
            User.findOne({userId: req.body.userId}).then(existingUser => {
                if (existingUser) {
                    const eventMongoose = new Event(req.body).save();
                    eventMongoose.then(function (result) {
                        if(!existingUser.events){
                            existingUser.events = [];
                        }
                        existingUser.events.push(result._id);
                        existingUser.save().then(function(result){
                            res.json(result);
                        })
                    })
                }
                else {
                    res.json({success: false, message: "InvalidUserIdFailure"});
                }
            });
        }
        else{
            res.json({success: false, message: "EventCreateJSONFailure"});
        }
    });

    app.post('/event/submitRegistration', function(req, res) {
        if(req.body){
            Event.findById(req.body.eventId).then(existingEvent => {
                if (existingEvent){
                    const registrationMongoose = new Registration(req.body).save();
                    registrationMongoose.then(function (result) {
                        if(!existingEvent.registrations){
                            existingEvent.registrations = [];
                        }
                        existingEvent.registrations.push(result._id);
                        existingEvent.save().then(function(result){
                            res.json(result);
                        })
                    })

                }
                else{
                    res.json({success: false, message: "InvalidEventIdFailure"});
                }
            });
        }
        else{
            res.json({success: false, message: "SubmitRegistrationJSONFailure"});
        }
    });

};
