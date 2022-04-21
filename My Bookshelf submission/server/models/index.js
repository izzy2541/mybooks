const fs = require('fs') //Allows us to work with the node file system
const path = require('path') //Allows us to create paths
const Sequelize = require('sequelize') //Sequelize Library 
const config = require('../config/config') //App Settings

//New Sequelize object and we are passing in our database details
const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db.options
)

const db = {}

//Setup models for sequelize
//This will read through all of the models in the model folder and set them up to be used by sequelize
fs.readdirSync(__dirname) //Reads through current directory and returns an array of the files
    .filter((file) => file !== 'index.js') //Filter out any files that are equivalent to index.js
    //Loops over the array of files and imports them to sequelize.
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize) //This import method takes the file path
        db[model.name] = model //Sets the model name. This save the model in db under a property[model.name] in this case User. eg db.User = model
    })

//Associates models
Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize // This will allow us to access the sequelize object if we use this module
db.Sequelize = Sequelize // This will allow us to access the Sequelize class if we use this module

module.exports = db //Exports models and db data
module.exports.Op = Sequelize.Op //Sequelize operators

