/* eslint-disable camelcase */

const db = require("../models");
const passport = require("../config/passport");
module.exports = function (app) {
    //should this all be async await?
    app.get("/api/playlists", (req, res) => {
        //this finds all playlists and orders by title.
        //confirmed working in postman
        db.Playlist.findAll({
            order: ["title"]
        })
            .then(function (dbPlaylist) {
                res.json(dbPlaylist);
            });
    });

    app.get("/api/playlists/orderby_newest", (req, res) => {
        //this finds all playlists and orders by newest.
        //confirmed working in postman
        db.Playlist.findAll({
            order: [
                ["title", "desc"],
            ]
        })
            .then(function (dbPlaylist) {
                res.json(dbPlaylist);
            });
    });
    app.get("/api/playlists/include_upvotes", (req, res) => {
        //this finds all playlists and orders by title.
        //this includes username title, and array of songs and orders those songs by song order
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
    //we want to get all the playlists from a user by userid not by username right?
    //old gene code
    // app.get("/api/playlists/:UserId", (req, res) => {
    //     //this pulls all the playlists by specific userID.
    //     //this is the userID that is in the playlist table that is
    //     //a Fkey linked to user table
    //     //confirmed working in postman
    //     db.Playlist.findAll({
    //         where: {
    //             UserId: req.params.UserId
    //         }
    //     })
    //         .then(function (dbPlaylist) {
    //             res.json(dbPlaylist);
    //         });
    // });



    // I think we need the authenticate line here. We"ll double check when testing though.
    app.post("/api/playlists", passport.authenticate("local"), (req, res) => {
        db.Playlist.create({
            title: req.body.playlistTitle,
            string: req.body.playlistString,
        })
            .then(() => {
                // I don"t know what we"d want to do here.
                res.status(200);
            })
            .catch(err => {
                res.status(401).json(err);
            });
    });

    // app.get("/api/playlists/:username", (req, res) => {
    //     db.Playlist.findAll({
    //         include: [{
    //             model: db.User,
    //             attributes: ["username","last_login","createdAt"],
    //             where: { username: req.params.username }
    //         },{
    //             model: db.Vote,
    //             // eslint-disable-next-line quotes
    //             attributes: [db.Sequelize.literal(`(SELECT SUM(votes.upvote) FROM votes WHERE PlaylistId=playlist.id)`), "upvote_tally"]
    //         }]
    //     }).then(dbPlaylist => {
    //         res.json(dbPlaylist);
    //     });
    // });
};