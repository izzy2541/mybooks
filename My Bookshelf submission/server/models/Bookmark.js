//Bookmark Sequelize Model
module.exports = (sequelize, DataTypes) => {
    //Creates a new model called Bookmark
    const Bookmark = sequelize.define("Bookmark", {})
    //Specifies that this model is associated with User and InstructionGuide
    Bookmark.associate = function (models) {
        Bookmark.belongsTo(models.User)
        Bookmark.belongsTo(models.Book)
    }
    //Returns the model
    return Bookmark
}