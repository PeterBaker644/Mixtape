/* eslint-disable camelcase */
const db = require("../models");
// const passport = require("../config/passport");

module.exports = function (app) {
    //when frontend sends data
    //change .get to post
    //change req to reqtest and delete 10 lines of code immediately after app.post
    //this will take out the dummy testing object and use the incoming object instead
    app.get("/api/playlists_create", async (req, res) => {
        reqtest = {};
        reqtest.body = {
            playlistTitle: "incomingPlaylistTitle",
            playlistAuthorId: 1,
            playlistDescription: "incomingPlaylistDescription",
            playlistContents: [
                { songName: "incoming song 1", songArtist: "incoming artist 1" },
                { songName: "incoming song 2", songArtist: "incoming artist 2" }
            ]
        };
        try {
            //this will search for the incoming playlist and...
            const playlistduplicatesearch = await db.Playlist.findOne({
                where: {
                    title: reqtest.body.playlistTitle
                }
            });
            //...log out duplicate found if playlist already exists.
            if (playlistduplicatesearch) {
                console.log("duplicate found");
                res.json("duplicate found");
            } else {
                //creates the playlist title author and description
                const PlaylistCreated = await db.Playlist.create({
                    title: reqtest.body.playlistTitle,
                    UserId: reqtest.body.playlistAuthorId,
                    description: reqtest.body.playlistDescription
                });
                console.log("created playlist");
                res.json("created playlist");
                const NewPlaylistID = PlaylistCreated.dataValues.id;
                for (i = 0; i < reqtest.body.playlistContents.length; i++) {
                    const findOrCreateResult = await db.Song.findOrCreate({
                        where: {
                            song_title: reqtest.body.playlistContents[i].songName,
                            song_artist: reqtest.body.playlistContents[i].songArtist
                        }
                    });
                    console.log("findOrCreateResult[0].dataValues.id-----------------------");
                    console.log(findOrCreateResult[0].dataValues.id);
                    let NewSongID = findOrCreateResult[0].dataValues.id;
                    // song ID gets associated with playlist id in the junction Table
                    // using the array index as the value for the song order in junction table
                    await db.playlist_song_junction_table.create({
                        PlaylistId: NewPlaylistID,
                        SongId: NewSongID,
                        song_order: i,
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

    app.get("/api/playlists/include_all_orderby_title", (req, res) => {
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
                { model: db.User, attributes: ["username", "id"], where: { username: req.params.username } }
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