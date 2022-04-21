const AuthenticationController = require('./controllers/AuthenticationController')
const BooksController = require('./controllers/BooksController')
const BookmarkController = require('./controllers/BookmarkController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy'); //Joi Validation for AuthenticationControllerPolicy 

module.exports = function (app) {
    //home
    app.get('/',)
    //login
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)
    //Instruction Guides 
    app.get('/books', BooksController.getBooks)
    app.post('/books', BooksController.postBook)
    app.get('/books/:id', BooksController.getBookById)
    app.put('/books/:id', BooksController.putBookById)
    //Bookmarks
    app.get('/bookmarks', BookmarkController.getBookmarks)
    app.post('/bookmarks', BookmarkController.postBookmark)
    app.delete('/bookmarks/:id', BookmarkController.deleteBookmark)
}