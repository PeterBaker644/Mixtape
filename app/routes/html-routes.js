const isAuthenticated = require("../config/middleware/isAuthenticated");
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
        // talk to gene about this tomorrow and how maybe we get rid of it?
        try {
            console.log("Test1");
            const data = await db.Playlist.findAll({
                include: [{
                    model: db.User,
                    attributes: ["username","last_login","createdAt"],
                    where: { username: req.params.username },
                },
                {
                    model: db.Vote,
                }]
            });
            console.log("Test2");
            if (data) {
                console.log("User Exists!");
                const hbsObject = { playlists:data };
                console.log(hbsObject.playlists[0].User);
                // res.json(data);
                res.render("profile", hbsObject);
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