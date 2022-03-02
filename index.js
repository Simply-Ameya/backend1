const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");
const cors = require("cors");
require("dotenv").config();
const booksRoute = require("./routes/books");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.mongo_url, () => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("something happened");
  });

const authRoute = require("./routes/auth");
const { urlencoded } = require("express");

app.use(express.json());

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.use("/api/books", booksRoute);

app.listen(PORT, () => {
  console.log("server is running");
});
