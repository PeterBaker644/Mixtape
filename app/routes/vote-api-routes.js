//do we need this? I don't even know.
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");



app.post("/api/upvote/", isAuthenticated, async (req, res) => {
    try {
        //this code looks for a record with a userid and playlist id in the votes Table
        //if it doesnt find it then itll create whats in the where clause along with any defaults.
        //this can also be used to be stored to a variable and send back error if we want.
        await db.Vote.findOrCreate({
            where: {
                UserId: req.body.id,
                PlaylistId: req.body.req.body.playlistName
            },
            defaults: {
                upvote: 1
            }
        });
    } catch (err) {
        console.log(err);
    }
    res.json("upvoted!");
});

app.post("/api/downvote/", isAuthenticated, async (req, res) => {
    try {
        await db.Vote.findOrCreate({
            where: {
                UserId: req.body.id,
                PlaylistId: req.body.req.body.playlistName
            },
            defaults: {
                upvote: -1
            }
        });
    } catch (err) {
        console.log(err);
    }
    res.json("upvoted!");
});