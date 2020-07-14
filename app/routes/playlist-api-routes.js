/* eslint-disable camelcase */
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
// const passport = require("../config/passport");

module.exports = function (app) {


    // if AUTH then return upvote info for that AUThed user and ALSO show below
    // if not authed, show below and upvote buttons greyed out anyways.

    app.get("/api/playlists/include_all_orderby_title", async (req, res) => {
        let output = {};
        if (req.user.id) {
            try {
                output = await db.Playlist.findAll({
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
                        // eslint-disable-next-line quotes
                        [db.Sequelize.literal(`(SELECT votes.upvote FROM votes WHERE PlaylistId = playlist.id  AND UserId = ${req.user.id})`), "upvoted"],
                    ],
                    order: db.sequelize.literal("title, song_order ASC"),
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                output = await db.Playlist.findAll({
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
                });
            } catch (err) {
                console.log(err);
            }
        }
        res.json(output);
    });

    // when frontend sends data
    // change .get to post
    // change req to reqtest and delete 10 lines of code immediately after app.post
    // this will take out the dummy testing object and use the incoming object instead
    app.post("/api/playlists_destroy", isAuthenticated, async (req, res) => {
        // this queries the DB to find the user id of the requested playlist title. stores it to useridQuery
        useridQuery = await db.Playlist.findOne({
            where: {
                id: req.body.playlistId
            },
            attributes: [
                "UserId",
            ],
        });
        console.log("[PLAYLIST-ROUTES] User ID Query");
        //if the id from the query above matches the isAuthenticated ID, then allow the playlist to be deleted
        if (useridQuery.dataValues.UserId === req.user.id) {
            try {
                await db.Playlist.destroy({
                    where: {
                        id: req.body.playlistId
                    }
                });
                res.json("deleted playlist");
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("[PLAYLIST-ROUTES] Unauthorized Playlist Deletion");
            res.json("[PLAYLIST-ROUTES] Unauthorized Playlist Deletion");
        }
    });

    //when frontend sends data
    //change .get to post
    //change req to reqtest and delete 10 lines of code immediately after app.post
    //this will take out the dummy testing object and use the incoming object instead
    app.post("/api/playlists", isAuthenticated, async (req, res) => {
        try {
            //this will search for the incoming playlist and...
            const playlistduplicatesearch = await db.Playlist.findOne({
                where: {
                    title: req.body.playlistTitle
                }
            });
            //...log out duplicate found if playlist already exists.
            if (playlistduplicatesearch) {
                console.log("[PLAYLIST-ROUTES] Duplicate found");
                res.json("[PLAYLIST-ROUTES] Duplicate found");
            } else {
                //creates the playlist title author and description
                const PlaylistCreated = await db.Playlist.create({
                    title: req.body.playlistTitle,
                    description: req.body.playlistDescription,
                    UserId: req.user.id,
                });
                console.log("[PLAYLIST-ROUTES] Created playlist");
                const NewPlaylistID = PlaylistCreated.dataValues.id;
                for (i = 0; i < req.body.playlistContents.length; i++) {
                    const findOrCreateResult = await db.Song.findOrCreate({
                        where: {
                            song_title: req.body.playlistContents[i].songName,
                            song_artist: req.body.playlistContents[i].songArtist
                        }
                    });
                    console.log("[PLAYLIST-ROUTES] findOrCreateResult[0].dataValues.id-----------------------");
                    console.log(findOrCreateResult[0].dataValues.id);
                    let NewSongID = findOrCreateResult[0].dataValues.id;
                    // song ID gets associated with playlist id in the junction Table
                    // using the array index as the value for the song order in junction table
                    await db.playlist_song_junction_table.create({
                        PlaylistId: NewPlaylistID,
                        SongId: NewSongID,
                        song_order: (i + 1),
                    });
                }
                res.json("[PLAYLIST-ROUTES] Created playlist");
            }
        } catch (err) {
            console.log(err);
        }
    });



    //PARAM URLS GO LAST
    app.get("/api/playlists/user/:username", (req, res) => {
        //this finds all by a specific username playlists and orders by title.
        //this includes username title, and array of songs and orders those songs by song order
        //confirmed working in postman
        db.Playlist.findAll({
            include: [
                { model: db.Song, attributes: ["song_title", "song_artist"] },
                { model: db.User, attributes: ["username", "id"], where: { username: req.params.username } },
            ],
            attributes: [
                // eslint-disable-next-line quotes
                [db.Sequelize.literal(`(SELECT SUM(votes.upvote) FROM votes WHERE PlaylistId=playlist.id)`), "upvote_tally"],
                "title",
                "id",
                // eslint-disable-next-line quotes
                [db.Sequelize.literal(`(SELECT users.username FROM users WHERE id=playlist.Userid)`), "username"],
                // eslint-disable-next-line quotes
                [db.Sequelize.literal(`(SELECT COUNT(votes.upvote) FROM votes WHERE UserId=user.id AND votes.upvote = 1)`), "user_total_upvotes"],
                // eslint-disable-next-line quotes
                [db.Sequelize.literal(`(SELECT COUNT(votes.upvote) FROM votes WHERE UserId=user.id AND votes.upvote = -1)`), "user_total_downvotes"],
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
    // app.post("/api/playlists", passport.authenticate("local"), (req, res) => {
    //     db.Playlist.create({
    //         req.body.playlistTitle,
    //         req.body.playlistDescription,
    //         req.body.playlistContents,
    //         req.body.playlistAuthorId

    //         playlistContents = [
    //             {songName:"Name of the song", songArtist:"Artist of the song"},
    //             {songName:"Name of the song", songArtist:"Artist of the song"}
    //         ]
    //     })
    //         .then(() => {
    //             // I don't know what we'd want to do here.
    //             res.status(200);
    //         })
    //         .catch(err => {
    //             res.status(401).json(err);
    //         });
    // });


};