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
        if(req.query) {
            Event.findById(req.query.id).then(existingEvent => {
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

    app.get('/event/deleteEvent', (req, res) => {
        if(req.query) {
            Event.findByIdAndRemove(req.query.id).then((event) => {
                if(event){
                    User.findOne({userId: event.userId}).then(existingUser => {
                        if (existingUser){
                            if(existingUser.events.indexOf(req.query.id) !== -1){
                                existingUser.events.splice(existingUser.events.indexOf(req.query.id), 1);
                                existingUser.save().then(function(result){
                                    res.json({success: true, message: "DeleteEventSuccess"});
                                })
                            }
                            else{
                                res.json({success: false, message: "EventNotFoundInUserFailure"});
                            }
                        }
                        else{
                            res.json({success: false, message: "InvalidUserIdFailure"});
                        }
                    });
                }
                else{
                    res.json({success: false, message: "DeleteEventIdFailure"});
                }
            });
        }
        else{
            res.json({success: false, message: "DeleteEventJSONFailure"});
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
                        existingUser.events.push(result._id.toString());
                        existingUser.save().then(function(userResult){
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


    app.get('/event/getRegistration', (req, res) => {
        if(req.query) {
            Registration.findById(req.query.id).then(existingRegistration => {
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

    app.get('/event/deleteRegistration', (req, res) => {
        if(req.query) {
            Registration.findByIdAndRemove(req.query.id).then((registration) => {
                if(registration){
                    Event.findById(registration.eventId).then(existingEvent => {
                        if (existingEvent){
                            if(existingEvent.registrations.indexOf(req.query.id) !== -1){
                                existingEvent.registrations.splice(existingEvent.registrations.indexOf(req.query.id), 1);
                                existingEvent.save().then(function(result){
                                    res.json({success: true, message: "DeleteRegistrationSuccess"});
                                })
                            }
                            else{
                                res.json({success: false, message: "RegistrationNotFoundInEventFailure"});
                            }
                        }
                        else{
                            res.json({success: false, message: "InvalidEventIdFailure"});
                        }
                    });
                }
                else{
                    res.json({success: false, message: "DeleteRegistrationIdFailure"});
                }
            });
        }
        else{
            res.json({success: false, message: "DeleteRegistrationJSONFailure"});
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
                        existingEvent.registrations.push(result._id.toString());
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
