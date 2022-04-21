//User Sequelize Model
module.exports = (sequelize, DataTypes) => {
    //Defines the InstructionGuide model
    const Book = sequelize.define("Book", {
        image: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING },
        author: { type: DataTypes.STRING },
        category: { type: DataTypes.STRING },
        ISBN: { type: DataTypes.INTEGER},
        about: { type: DataTypes.STRING },
        published: { type: DataTypes.STRING },
        pages: { type: DataTypes.INTEGER }
    })

    return Book
}