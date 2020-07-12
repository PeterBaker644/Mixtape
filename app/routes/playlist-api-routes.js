/* eslint-disable camelcase */
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
    //should this all be async await?

    app.get("/api/playlists/include_all", (req, res) => {
        //this finds all playlists and orders by title.
        //this also includes upvote table as an array of objects insite the playlist object
        //which is itself inside an array
        //confirmed working in postman
        db.Playlist.findAll({
            include: db.Vote,
            order: ["title"],
            include: [
                { model: db.Song, attributes: ["song_title", "song_artist"] }
            ],
            attributes: [
                // eslint-disable-next-line quotes
                [db.Sequelize.literal(`(SELECT SUM(votes.upvote) FROM votes WHERE PlaylistId=playlist.id)`), "upvote_tally"],
                "title",
                "id",
                // eslint-disable-next-line quotes
                [db.Sequelize.literal(`(SELECT users.username FROM users WHERE id=playlist.Userid)`), "username"],
            ],
            order: db.sequelize.literal("title, song_order ASC"),
        })
            .then(function (dbPlaylist) {
                res.json(dbPlaylist);
            });
    });

    //PARAM URLS GO LAST
    app.get("/api/playlists/user/:username", (req, res) => {
        //this finds all by a specific username playlists and orders by title.
        //this includes username title, and array of songs and orders those songs by song order
        //confirmed working in postman
        db.Playlist.findAll({
            include: [
                { model: db.Song, attributes: ["song_title", "song_artist"] },
                { model: db.User, attributes: ["username","id"], where: {username:req.params.username}}
            ],
            attributes: [
                // eslint-disable-next-line quotes
                [db.Sequelize.literal(`(SELECT SUM(votes.upvote) FROM votes WHERE PlaylistId=playlist.id)`), "upvote_tally"],
                "title",
                "id",
                // eslint-disable-next-line quotes
                [db.Sequelize.literal(`(SELECT users.username FROM users WHERE id=playlist.Userid)`), "username"],
            ],
            // eslint-disable-next-line quotes
            // where: db.sequelize.literal(`(users.username) = ${req.params.username}`),
            // where: {rainbows:req.params.username},
            order: db.sequelize.literal("title, song_order ASC"),
        })
            .then(function (dbPlaylist) {
                res.json(dbPlaylist);
            });
    });




    // I think we need the authenticate line here. We'll double check when testing though.
    app.post("/api/playlists", passport.authenticate("local"), (req, res) => {
        db.Playlist.create({
            title: req.body.playlistTitle,
            string: req.body.playlistString,
        })
            .then(() => {
                // I don't know what we'd want to do here.
                res.status(200);
            })
            .catch(err => {
                res.status(401).json(err);
            });
    });


};