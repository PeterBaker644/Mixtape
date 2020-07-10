const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/playlists", function (req, res) {
        res.render("index");
    });

    app.get("/login", function (req, res) {
        res.render("login");
    });

    app.get("/signup", function (req, res) {
        res.render("signup");
    });

    app.get("/settings/profile", isAuthenticated, function (req, res) {
        res.render("settings");
    });

    app.get("/:username", async function (req, res) {
        try {
            const userExists = await db.User.findOne(
                { where: { username: req.params.username } }
            );
            if (userExists) {
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