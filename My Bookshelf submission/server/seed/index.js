const { sequelize, User, Book, Bookmark } = require("../models");
const Promise = require("bluebird");
const delay = require("delay");

const books = require("./books.json");
const bookmarks = require("./bookmarks.json");
const users = require("./users.json");

sequelize
  .sync({ force: true })
  .then(async function () {
    await Promise.all(
      users.map((user) => {
        User.create(user);
      })
    );
    await Promise.all(
      books.map((book) => {
        Book.create(book);
      })
    );
    await delay(1000);
    await Promise.all(
      bookmarks.map((bookmark) => {
        Bookmark.create(bookmark);
      })
    );
  })
  .catch((err) => {
    console.log(err);
  });
