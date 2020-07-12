/* eslint-disable camelcase */

module.exports = function (sequelize, DataTypes) {
    const playlist_song_junction_table = sequelize.define("playlist_song_junction_table", {
        song_order: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmpty: false
            }
        },
    },
    {
        freezeTableName: true
    });
    return playlist_song_junction_table;
};