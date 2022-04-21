const { Book } = require("../models"); //Sequelize Model for InstructionGuide
const { Op } = require("../models"); //Sequelize Operators for queries 

module.exports = {
  //Routes
  //Gets/Searches Instruction Guides from the database
  async getBooks(req, res) {
    try {
      let books = null; // Stores the returned result from the database
      const search = req.query.search; // Holds the search query from the url
      // If there is a search query
      if (search) {
        // Find where title, category, author or equipment are like the search query
        // Please refer to the sequelize documentation for further details and examples http://docs.sequelizejs.com/manual/querying.html
        books = await Book.findAll({
          where: {
            [Op.or]: [
              { title: { [Op.like]: `%${search}%` } },
              { author: { [Op.like]: `%${search}%` } },
              { category: { [Op.like]: `%${search}%` } },
              { ISBN: { [Op.like]: `%${search}%` } },
              { about: { [Op.like]: `%${search}%` } },
              { published: { [Op.like]: `%${search}%` } },
              { pages: { [Op.like]: `%${search}%` } },
            ],
          },
        });
        res.send(books);
        console.log(books);
        // Else there is no search query
      } else {
        // Load the first 10 results
        books = await Book.findAll({ limit: 10 });
        res.send(books);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Sorry we could not connect to the database" });
    }
  },
  async postBook(req, res) {
    try {
      const books = await Book.create(req.body);
      res.status(201).send(books);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Sorry we could not connect to the database" });
    }
  },
  async getBookById(req, res) {
    try {
      const books = await Book.findOne({
        where: { id: req.params.id }
      })
      res.send(books);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'An error has occurred trying to get all Books'
      })
    }
  },
  async putBookById(req, res) {
    try {
      const book = await Book.update(req.body,
        {
          where: { id: req.params.id }
        }
      )
      res.send("The data was updated")
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'An error occurred on the server' })
    }
  },
};
