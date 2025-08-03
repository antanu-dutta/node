const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log(`Successfully connected on port 3000`);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Home page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Welcome to About page</h1>");
});

app.get("/about/:userId/book/:bookId", (req, res) => {
  res.send(`Book ID: ${req.params.bookId}`);
  //   res.send(req.params.userId);
});

app.get("/search", (req, res) => {
  res.send(req.query);
});
