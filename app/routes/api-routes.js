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

    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // req.user should contain all the information we need normally, but this will be used on things like our profile page where we want to display user information.
            res.json({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.user.email,
                username: req.body.username,
                id: req.user.id,
                last_login: req.body.lastLogin
            });
        }
    });
};