const argon2 = require("argon2");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmpty: false
            }
        },
        // Peter: Would we want to pass in an email address? How would we do that, create another sequelize class called userInfo or something?
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = async (password) => {
        try {
            await argon2.verify(password, this.password);
            // P: password and this.password might be backward.
        } catch (err) {
            // internal failure
        }
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", async (user) => {
        try {
            // P: awaits and then returns the hashed password.
            await argon2.hash(user.password);
        } catch (err) {
            //reevaluate what we might actually want here.
            console.log(err);
        }
    });
    return User;
};
