
module.exports = function (sequelize, DataTypes) {
    var comments = sequelize.define("comments", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        videoId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    comments.associate = function (models) {
        comments.belongsTo(models.users, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return comments;
};