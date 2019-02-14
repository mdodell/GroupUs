const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const bcrypt  = require('bcrypt');
const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({userId: profile.id})
    if (existingUser){
      return done(null, existingUser);
    }
    const user = await new User({
      userId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      strategy: "google"
    }).save();
    done(null, user);
  }
)
);

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({userId: profile.id})
    if (existingUser){
      return done(null, existingUser);
    }
    const user = await new User({
      userId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      strategy: "facebook"
    }).save();
    done(null, user);
  }
)
);

passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  async(req, email, password, done) => {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      return done(null, false, req.flash('signupMessage', 'Email taken.'));
    } else {
      const user = await new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
        strategy: "local"
      }).save();
      done(null, user);
    }
  }
)
);

passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user, err) {
      (!bcrypt.compareSync(password, req.body.password));
      if (!user){
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if (user && !bcrypt.compareSync(password, req.body.password)){
        return done(null, false, req.flash('loginMessage', 'Wrong password.'));
      }
      return done(null, user);
    });
  }
)
);
