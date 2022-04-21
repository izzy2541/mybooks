//Imports the node path module
const path = require('path')

module.exports = {
    port: process.env.PORT || 3001,
    db: {
        database: process.env.DB_NAME || 'database',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root',
        options: {
            //dialect - refers to the type of database you are connecting to
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../database.sqlite')
        }
    },
    authentication: {
        //Application secret for creating a secure web token
        jwtSecret: process.env.JWT_SECRET || 'password'
    },
    entry: [
        './src/index.js'
      ],
      module: {
          rules: [
            {
              test: "/.(js|jsx)$/",
              exclude: "node_modules",
              use: ["babel-loader","style-loader","css-loader"],            
            }
          ]
        },
        resolve: {
          extensions: ['*', '.js', '.jsx']
        },
      output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
      },
      devServer: {
        contentBase: './dist'
      }

}


  
    