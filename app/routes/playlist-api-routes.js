/* eslint-disable camelcase */
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

    app.get("/api/playlists", (req, res) => {
        db.Playlist.findAll() // I don't really know how this is supposed to work Gene you'll have to fix this.
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

    app.get("/api/playlists/:username", (req, res) => {
        db.Playlist.findAll({
            include: db.User,
            where: {
                // username: req.params.username
            }
        }).then(dbPlaylist => {
            res.json(dbPlaylist);
        });
    });
};