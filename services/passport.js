const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//user is what had been serialized from passport.use
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(extistingUser => {
        if (extistingUser) {
          //we already have a record with the given profile id
          done(null, extistingUser);
        } else {
          //we dont have a user with this ID, make a new record
          new User({
            googleID: profile.id
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
