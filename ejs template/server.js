import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("index");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", message: "Welcome to ejs" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
