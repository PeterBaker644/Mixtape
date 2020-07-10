/* eslint-disable camelcase */

module.exports = function (sequelize, DataTypes) {
    const Vote = sequelize.define("Vote", {
        upvote: DataTypes.BOOLEAN,
    });

    // This table may need to be altered to belongsToMany with a dynamic third table, but I'm leaving this up to Gene to figure out.
    Vote.associate = function (models) {
        Vote.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Vote.belongsTo(models.Playlist, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Vote;
};