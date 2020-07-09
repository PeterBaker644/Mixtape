/* eslint-disable camelcase */
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

    app.post("/api/login", passport.authenticate("local"), (req, res) => {
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
            });
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/profile/:username", (req, res) => {
        db.User.findOne({
            attributes: ["username","last_login","createdAt"],
            where: {
                username: req.params.username
            }
        }).then(dbUser => res.json({dbUser}));
    });

    // Would like this to display the username in the api path, but I don't know how I want to do that now. Revisit later.
    app.get("/api/profile/settings", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // req.user should contain only id, username and role, so we have to call the databse for everything else, only calling for things the we don't have stored, and only exposing data that is safe to do so.
            db.User.findOne({
                attributes: [{exclude: ["password","id","role"]}],
                where: {
                    username: req.user.username
                }
            }).then(dbUser => res.json({dbUser}));
        }
    });
};