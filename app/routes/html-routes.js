const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
// const user = require("../models/user");

module.exports = function (app) {

    app.get("/", (req, res) => {
        res.redirect("/playlists");
    });

    app.get("/playlists", async (req, res) => {
        let attributeCall = {};
        if (req.user) {
            attributeCall = {
                include: [
                    [db.Sequelize.literal("(SELECT SUM(Votes.upvote) FROM Votes WHERE PlaylistId=Playlist.id)"), "upvotes"],
                    [db.Sequelize.literal(`(SELECT Votes.upvote FROM Votes WHERE PlaylistId = Playlist.id AND UserId = ${req.user.id})`), "upvoted"]
                ]
            };
        } else {
            attributeCall = {
                include: [[db.Sequelize.literal("(SELECT SUM(Votes.upvote) FROM Votes WHERE PlaylistId=Playlist.id)"), "upvotes"]]
            };
        }
        try {
            let data = await db.Playlist.findAll({
                order: ["title"],
                include: [{
                    model: db.User,
                    attributes: ["username", "createdAt"]
                },
                { model: db.Song, attributes: ["song_title", "song_artist"] }
                ],
                attributes: attributeCall,
                order: db.sequelize.literal("title, song_order ASC"),
            });
            if (data) {
                const hbsObject = { playlists: data };
                // res.json(hbsObject);
                res.render("index", hbsObject);
            }
        } catch (err) {
            console.log(err);
            // maybe address this
            res.status(404).render("index");
        }
    });

    app.get("/login", (req, res) => {
        if (req.user) {
            res.redirect("/playlists");
        } else {
            res.render("login");
        }
    });

    app.get("/logout", isAuthenticated, (req, res) => {
        // console.log(`[HTML-ROUTES] User ${req.user.username}`)
        let name = req.user.username;
        console.log("[HTML-ROUTES] User " + name + " logged out.");
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

    app.get("/profile/settings", isAuthenticated, async (req, res) => {
        try {
            let data = await db.Playlist.findAll({
                order: ["title"],
                include: [{
                    model: db.User,
                    attributes: ["first_name", "last_name", "email", "username", "createdAt", "last_login"],
                    where: { username: req.user.username }
                },
                { model: db.Song, attributes: ["song_title", "song_artist"] }
                ],
                attributes: {
                    include: [
                        //votes on this current playlist
                        [db.Sequelize.literal("(SELECT SUM(Votes.upvote) FROM Votes WHERE PlaylistId=Playlist.id)"), "upvotes"],
                        [db.Sequelize.literal("(SELECT Users.username FROM Users WHERE id=Playlist.Userid)"), "username"],
                        //votes the user has given out
                        [db.Sequelize.literal("(SELECT COUNT(Votes.upvote) FROM Votes WHERE UserId=User.id AND Votes.upvote = 1)"), "user_total_upvotes"],
                        [db.Sequelize.literal("(SELECT COUNT(Votes.upvote) FROM Votes WHERE UserId=User.id AND Votes.upvote = -1)"), "user_total_downvotes"],
                        //used to determine if user has voted on this playlist or not
                        [db.Sequelize.literal(`(SELECT Votes.upvote FROM Votes WHERE PlaylistId = Playlist.id AND UserId = ${req.user.id})`), "upvoted"],
                        //this will display all the upvotes and downvotes that the user has received from any of their playlists
                        // [db.Sequelize.literal(`(SELECT COUNT(Votes.upvote) FROM Votes WHERE Votes.UserId = ${req.user.id} AND Votes.upvote = 1)`), "user_total_upvotes_received"],
                        // [db.Sequelize.literal(`(SELECT COUNT(Votes.upvote) FROM Votes WHERE Votes.UserId = ${req.user.id} AND Votes.upvote = -1)`), "user_total_downvotes_received"],
                    ]
                },
                order: db.sequelize.literal("title, song_order ASC"),
            });
            if (data) {
                const hbsObject = { playlists: data };
                console.log(hbsObject.playlists[0].User);
                res.render("settings", hbsObject);
            }
        } catch (err) {
            // maybe address this
            res.status(404).render("index");
        }
    });

    app.get("/user/:username", async (req, res) => {
        // talk to gene about this tomorrow and how maybe we get rid of it?
        console.log("testing 123");
        try {
            if (req.user) {
                attributeCall = {
                    include: [
                        [db.Sequelize.literal("(SELECT SUM(Votes.upvote) FROM Votes WHERE PlaylistId=Playlist.id)"), "upvotes"],
                        [db.Sequelize.literal("(SELECT Users.username FROM Users WHERE id=Playlist.Userid)"), "username"],
                        [db.Sequelize.literal("(SELECT COUNT(Votes.upvote) FROM Votes WHERE UserId=User.id AND Votes.upvote = 1)"), "user_total_upvotes"],
                        [db.Sequelize.literal("(SELECT COUNT(Votes.upvote) FROM Votes WHERE UserId=User.id AND Votes.upvote = -1)"), "user_total_downvotes"],
                        [db.Sequelize.literal(`(SELECT Votes.upvote FROM Votes WHERE PlaylistId = Playlist.id AND UserId = ${req.user.id})`), "upvoted"]
                    ]
                };
            } else {
                attributeCall = {
                    include: [
                        [db.Sequelize.literal("(SELECT SUM(Votes.upvote) FROM Votes WHERE PlaylistId=Playlist.id)"), "upvotes"],
                        [db.Sequelize.literal("(SELECT Users.username FROM Users WHERE id=Playlist.Userid)"), "username"],
                        [db.Sequelize.literal("(SELECT COUNT(Votes.upvote) FROM Votes WHERE UserId=User.id AND Votes.upvote = 1)"), "user_total_upvotes"],
                        [db.Sequelize.literal("(SELECT COUNT(Votes.upvote) FROM Votes WHERE UserId=User.id AND Votes.upvote = -1)"), "user_total_downvotes"],
                    ]
                };
            }
            console.log("testing 234");
            const data = await db.Playlist.findAll({
                order: ["title"],
                include: [{
                    model: db.User,
                    attributes: ["username", "last_login", "createdAt"],
                    where: { username: req.params.username },
                },
                { model: db.Song, attributes: ["song_title", "song_artist"] }
                ],
                attributes: attributeCall,
                order: db.sequelize.literal("title, song_order ASC"),
            });
            console.log("345");
            if (data) {
                const hbsObject = { playlists: data };
                console.log(hbsObject.playlists);
                console.log(hbsObject.playlists[0].dataValues.Songs[0].playlist_song_junction_table.dataValues.song_order);
                // res.json(hbsObject);
                res.render("user", hbsObject);
            }
        } catch (err) {
            console.log(err);
            // Maybe throw some kind of 'user not found' alert. This needs to be handled in the html with handlebars. See example for details.
            res.status(404).render("index", {
                message: "User not found."
            });
        }
    });
};