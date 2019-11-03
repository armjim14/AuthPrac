
module.exports = function (sequelize, DataTypes) {
    var notes = sequelize.define("notes", {
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        videoId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    notes.associate = function (models) {
        notes.belongsTo(models.users, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return notes;
};