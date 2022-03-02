const mongoose = require("mongoose");
const Author = require("./author");
const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 40,
  },
  author: Author.schema,
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

module.exports = new mongoose.model("books", booksSchema);
