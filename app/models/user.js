const argon2 = require("argon2");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        // eslint-disable-next-line camelcase
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmpty: false }
        },
        // eslint-disable-next-line camelcase
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmpty: false }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: false }
        },
        role: {
            type: DataTypes.STRING,
            validate: { isIn: [["user","admin"]] }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmpty: false }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // We're validating for a minimum length of 8 characters here. Have to figure out how to send this error down the line. Hopefully it works with the hook.
            validate: { len: [8,128] }
        },
        // eslint-disable-next-line camelcase
        last_login: DataTypes.DATE
    });

    User.prototype.validPassword = async (password) => {
        try {
            return await argon2.verify(password, this.password);
            // P: password and this.password might be backward.
        } catch (err) {
            console.log(err);
        }
    };
    User.addHook("beforeCreate", async (user) => {
        try {
            return await argon2.hash(user.password);
        } catch (err) {
            //reevaluate what we might actually want here.
            console.log(err);
        }
    });
    return User;
};
