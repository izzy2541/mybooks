//Imports
const { Bookmark } = require('../models') //Sequelize Model for User

module.exports = {
    //Routes
    //Gets Instruction Guides
    // bookmarks?BookId=1&userId=1
    async getBookmarks(req, res) {
        console.log(req.query);
        try {
            const { userId } = req.query // Holds the search query from the url
            const bookmark = await Bookmark.findAll({
                where: {
                    UserId: userId,
                }
            })

            res.send(bookmark);

        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occurred trying to get the Bookmark'
            })
        }
    },
    async postBookmark(req, res) {
        try {
            const { bookId, userId } = req.body
            const bookmark = await Bookmark.findOne({
                where: {
                    BookId: bookId,
                    UserId: userId
                }
            })

            if (bookmark) {
                return res.status(400).send({ error: 'you already have this bookmarked' })
            }

            console.log(req.body)
            const newBookmark = await Bookmark.create({
                UserId: Number(bookId),
                InstructionGuideId: Number(bookId)
            })
            res.send(newBookmark)
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occurred trying to create the Bookmark'
            })
        }
    },
    async deleteBookmark(req, res) {
        try {
            const { bookmarkId } = req.params // Holds the search query from the url
            const bookmark = await Bookmark.findOne({
                where: {
                    id: bookmarkId
                }
            })
            await bookmark.destroy()
            res.send(bookmark)
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occurred trying to deleteing the Bookmark'
            })
        }
    }
}