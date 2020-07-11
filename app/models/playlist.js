/* eslint-disable camelcase */

// example for songs table junction implementaion
// const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
// const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
// Movie.belongsToMany(Actor, { through: 'ActorMovies' });
// Actor.belongsToMany(Movie, { through: 'ActorMovies' });


// For now we will only use a string, but we may want to create a songs table later as a website like this would use something like this for data analysis.
module.exports = function (sequelize, DataTypes) {
    const Playlist = sequelize.define("Playlist", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmpty: false
            }
        },
        string: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isEmpty: false
            }
        }
    });

    Playlist.associate = function (models) {
        // We're saying that a Playlist should belong to a User
        // A Playlist can't be created without an User due to the foreign key constraint
        Playlist.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Playlist;
};

