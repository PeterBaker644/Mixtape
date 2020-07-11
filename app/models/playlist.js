/* eslint-disable camelcase */

// For now we will only use a string, but we may want to create a songs table later as a website like this would use something like this for data analysis.
module.exports = function (sequelize, DataTypes) {
    const Playlist = sequelize.define("Playlist", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        string: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // We're saying that a Playlist should belong to a User
    // A Playlist can't be created without an User due to the foreign key constraint

    Playlist.associate = function (models) {
        Playlist.hasMany(models.Vote, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Playlist;
};