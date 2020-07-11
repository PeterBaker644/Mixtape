const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function (app) {

    app.get("/playlists", async (req, res) => {
        try {
            const data = await db.Playlist.findAll({
                include: [{
                    model: db.User,
                    attributes: ["username", "last_login", "createdAt"],
                },
                { model: db.Vote, }]
            });
            if (data) {
                const hbsObject = { playlists: data };
                // res.json(data);
                res.render("index", hbsObject);
            }
        } catch (err) {
            // Maybe throw some kind of 'user not found' alert. This needs to be handled in the html with handlebars. See example for details.
            res.status(404).render("index", {
                message: "User not found."
            });
        }
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
        // talk to gene about this tomorrow and how maybe we get rid of it?
        try {
            const data = await db.Playlist.findAll({
                include: [{
                    model: db.User,
                    attributes: ["username", "last_login", "createdAt"],
                    where: { username: req.params.username },
                },
                {
                    model: db.Vote,
                }]
            });
            if (data) {
                const hbsObject = { playlists: data };
                // res.json(data);
                res.render("profile", hbsObject);
            }
        } catch (err) {
            // Maybe throw some kind of 'user not found' alert. This needs to be handled in the html with handlebars. See example for details.
            res.status(404).render("index", {
                message: "User not found."
            });
        }
    });
};