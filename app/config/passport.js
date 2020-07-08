const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(
    new LocalStrategy(
        {
            usernameField: "username"
        },
        (email, password, done) => {
            // When a user tries to sign in this code runs
            db.User.findOne({
                where: {
                    username: username
                }
            }).then(dbUser => {
                // If there's no user with the given email
                if (!dbUser) {
                    return done(null, false, {
                        message: "Incorrect username."
                    });
                // Note that if we go with this there needs to be a .validPassword prototype.
                } else if (!dbUser.validPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                // If none of the above, return the user
                return done(null, dbUser);
            });
        }
    )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;