const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// http://www.passportjs.org/docs/configure/ just note that the example is using MongoDB, so findOne syntax is different. I think.

passport.use(new LocalStrategy(
    (username, password, done) => {
        db.User.findOne({
            where: { username: username }
        }).then(dbUser => {
            if (!dbUser) {
                return done(null, false, { message: "Incorrect username." });
            } else if (!dbUser.validPassword(dbUser, password)) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, dbUser);
        });
    }
));

// we are chosing to only store these aspects of the user object in the session.
passport.serializeUser((user, cb) => {
    cb(null, {id: user.id, username: user.username, role: user.role});
});

passport.deserializeUser((user, cb) => {
    cb(null, {id: user.id, username: user.username, role: user.role});
});

module.exports = passport;