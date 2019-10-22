
module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [2, 15]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return users;
};