/* eslint-disable camelcase */
const db = require("../models");
const passport = require("../config/passport");
const moment = require("moment");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { Op } = require("sequelize");

module.exports = function (app) {

    // we are currently automatically pushing the user to login after signup.
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        console.log("Login API is being triggered");
        // eslint-disable-next-line camelcase
        db.User.update({ last_login: (moment().format()) }, {
            where: {
                id: req.user.id
            }
        });
        res.json({
            username: req.user.username,
            id: req.user.id
        });
    });

    app.post("/api/signup", (req, res) => {
        db.User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            role: "user",
            username: req.body.username,
            password: req.body.password
        })
            .then(() => {
                res.redirect(307, "/api/login");
            })
            .catch(err => {
                res.status(401).json(err);
                console.log(err);
            });
    });

    app.post("/api/user", isAuthenticated, async (req, res) => {
        // Look for username, see if it exists already.
        try {
            let usernameInUse = await db.User.findOne({
                where: {
                    username: req.body.username,
                    id: {
                        [Op.not]: req.user.id
                    }
                }
            });
            // Look for email, see if it exists already.
            let emailInUse = await db.User.findOne({
                where: {
                    email: req.body.email,
                    id: {
                        [Op.not]: req.user.id
                    }
                }
            });
            console.log(usernameInUse);
            console.log(emailInUse);
            if (!usernameInUse && !emailInUse) {
                console.log("[USER-ROUTES] Make update request");
                await db.User.update({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username
                }, {
                    where: {
                        id: req.user.id
                    }
                });
                res.status(200).render("settings");
            } else {
                res.status(403).render("settings");
            }
        } catch (err) {
            console.log(err);
            // maybe address this
            res.status(404).render("index");
        }
    });

    // Might not be necessary any longer.
    app.get("/api/users/:username", (req, res) => {
        db.User.findOne({
            attributes: ["username", "last_login", "createdAt"],
            where: {
                username: req.params.username
            }
        }).then(dbUser => res.json({ dbUser }));
    });

    // Would like this to display the username in the api path, but I don't know how I want to do that now. Revisit later.
    app.get("/api/profile/settings", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // req.user should contain only id, username and role, so we have to call the databse for everything else, only calling for things the we don't have stored, and only exposing data that is safe to do so.
            db.User.findOne({
                attributes: [{ exclude: ["password", "id", "role"] }],
                where: {
                    username: req.user.username
                }
            }).then(dbUser => res.json({ dbUser }));
        }
    });
};