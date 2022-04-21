const { User } = require('../models') //Sequelize Model for User
const jwt = require('jsonwebtoken') //Allows us to generate web tokens
const config = require('../config/config') //App settings and important data

// Creates a new JWT token
function jwtSignUser(user) {
    const tokenExpireTime = 60 * 60 * 24 * 14  // One week till the token expirers 
    return jwt.sign(user, config.authentication.jwtSecret, { expiresIn: tokenExpireTime }) // Creates the token and signs it with the app secrete stored in config
}

module.exports = {
    //Register a new user
    async register(req, res) {
        try {
            const user = await User.create(req.body) // Creates a new user using the user model and the data passed into the body
            const userJSON = user.toJSON() // Converts the user to JSON
            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON) // Passes the user data to jwtSignUser to be stored into the token
            })

        } catch (error) {
            res.status(400).send({ error: 'This email is already in use' })
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body  //Collect the user input
            //Finds the matching email in the database
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            //If no matching user in the database
            if (!user) {
                return res.status(401).send({
                    error: 'The login information was incorrect'
                })
            }

            //If the password does not match
            const isPasswordValid = await user.comparePassword(password) //compares the password with the hashed password in the database
            if (!isPasswordValid) {
                //
                return res.status(401).send({
                    error: 'The login information was incorrect'
                })
            }

            //If the login details are correct sends back a token
            const userJSON = user.toJSON()
            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON) // Passes the user data to jwtSignUser to be stored into the token
            });

        } catch (err) {
            //Handel Errors
            console.log(err);
            res.status(500).send({
                error: 'A errors has occurred well trying to login'
            });
        }
    }

}