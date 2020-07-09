/* eslint-disable camelcase */

module.exports = function (sequelize, DataTypes) {
    const Vote = sequelize.define("Vote", {
        upvote: DataTypes.BOOLEAN,
    });

    Vote.associate = function (models) {
        Vote.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Vote;
};
