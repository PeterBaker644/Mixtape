/* eslint-disable camelcase */

module.exports = function (sequelize, DataTypes) {
    const Vote = sequelize.define("Vote", {
        upvote: DataTypes.BOOLEAN,
    });

    return Vote;
};