const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/appdb", () => {
  console.log("connected");
});

const authRoute = require("./routes/auth");

app.use(express.json());

app.use(cors());
//hi
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

app.listen(3000, () => {
  console.log("server is running");
});
