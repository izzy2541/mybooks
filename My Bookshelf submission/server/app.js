const express = require("express");//Server module
const cors = require("cors");//Cors allows your server to be accessed by any client from any server. (If you do not include this then you server and client need to be on the same server. Note this opens you up for more security issues)
const config = require("./config/config"); //General App settings and data
const { sequelize } = require("./models"); //Module for working with SQL databases

//Express App
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
//We are requiring the routes module and passing it the app
require("./routes")(app);

//Sequelize
//This will connect to the database and set up any tables needed based on the Sequelize models
sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`Server started on port ${config.port}`);
});
