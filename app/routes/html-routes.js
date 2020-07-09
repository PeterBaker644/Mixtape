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

    app.get("/settings/profile", function (req, res) {
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
            // Maybe throw some kind of 'user not found' alert.
            res.status(404).render("index");
        }
    });
};