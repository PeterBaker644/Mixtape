// const db = require("../models");

// module.exports = function (app) {

//     app.get("/playlists", async (req, res) => {
//         try {
//             const data = await db.Playlist.findAll({
//                 include: [
//                     { model: db.User, attributes: ["username", "last_login", "createdAt"] },
//                     { model: db.Song, attributes: ["song_title", "song_artist"] },
//                     { model: db.Vote, attributes: sequelize.fn("SUM", sequelize.col("upvote")), "upvote_tally" }
//                 ],
//                 attributes: [
//                     "upvote_tally",
//                     "title",
//                     "id",
//                 ],
//                 order: ["title", "song_order", "ASC"]
//             });
//             if (data) {
//                 const hbsObject = { playlists: data };
//                 console.log(data);
//                 res.render("index", hbsObject);
//             }
//         } catch (err) {
//             // maybe address this
//             res.status(404).render("index");
//         }
//     });

// }

app.get("/playlists", async (req, res) => {
    try {
        const data = await db.Playlist.findAll({
            order: ["title"],
            include: [{
                model: db.User,
                attributes: ["username", "createdAt"]
            },
            { model: db.Song, attributes: ["song_title", "song_artist"] }
            ],
            attributes: {
                include: [
                    [db.Sequelize.literal("(SELECT SUM(votes.upvote) FROM votes WHERE PlaylistId=playlist.id)"), "upvotes"]
                ]
            },
            order: db.sequelize.literal("title, song_order ASC"),
        });
        if (data) {
            const hbsObject = { playlists: data };
            // res.json(hbsObject);
            res.render("index", hbsObject);
        }
    } catch (err) {
        // maybe address this
        res.status(404).render("index");
    }
});