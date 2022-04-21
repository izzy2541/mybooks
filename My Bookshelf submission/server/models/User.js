const bcrypt = require('bcrypt') // bcrypt allows passwords to be hashed and salted

//Hashes passwords
async function hashPassword(user) {
    //If changes have been made to the password in the user model return
    if (!user.changed('password')) {
        return
    }
    //Generates a slat to add to the password
    try {
        const salt = await bcrypt.genSalt(10)
        //Hashes the password and salt
        const hashPasswordValue = await bcrypt.hash(user.password, salt)
        //Saves the hashed password to the user model
        user.setDataValue('password', hashPasswordValue)
    } catch (error) {
        console.log(error)
    }
}

//User Sequelize Model
module.exports = (sequelize, DataTypes) => {
    //Defines the user model
    const User = sequelize.define("User",
        {
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
        },
        //Hooks allow us to run functions when a event occurs
        {
            hooks: { beforeSave: hashPassword }
        })
    //Here we are attaching a method to the User Model under prototype
    //This way we can access comparePassword wherever we have the user model
    User.prototype.comparePassword = async function (password) {
        try {
            const validPassword = await bcrypt.compare(password, this.password)
            return validPassword
        } catch (error) {
            console.log(error);
        }
    }
    return User
}