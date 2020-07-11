const isAuthenticated = require("../config/middleware/isAuthenticated");
// I have no idea why I pulled this in, I'm not using it.
const db = require("../models");

module.exports = function (app) {

    app.get("/playlists", (req, res) => {
        res.render("index");
    });

    // Tried using !isAuthenticated, but that totally failed.
    app.get("/login", (req, res) => {
        if (req.user) {
            res.redirect("/playlists");
        } else {
            res.render("login");
        }
    });

    app.get("/logout", (req, res) => {
        console.log(req.user.username);
        req.logout();
        res.redirect("/playlists");
    });

    // Needs to handle if the user is already authenticed. line 11.
    app.get("/signup", (req, res) => {
        if (req.user) {
            res.redirect("/playlists");
        } else {
            res.render("signup");
        }
    });

    // Doesn't work yet.
    app.get("/settings/profile", isAuthenticated, (req, res) => {
        res.render("settings");
    });

    app.get("/user/:username", async (req, res) => {
        try {
            const userExists = await db.User.findOne(
                { where: { username: req.params.username } }
            );
            if (userExists) {
                console.log("User Exists!");
                console.log(userExists.username);
                res.render("profile");
            }
        } catch (err) {
            // Maybe throw some kind of 'user not found' alert. This needs to be handled in the html with handlebars. See example for details.
            res.status(404).render("index", {
                message: "User not found.",
                messageClass: "alert-danger"
            });
        }
    });
};