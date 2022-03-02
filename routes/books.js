const express = require("express");
const router = express.Router();
const Book = require("../model/books");

router.post("/", (req, res) => {
  const book = new Book({
    name: req.body.bookName,
    author: {
      name: req.body.authorName,
      age: req.body.authorAge,
    },
    genre: req.body.genre,
  });

  book.save().then((book) => {
    res.send(book);
  });
});

module.exports = router;
