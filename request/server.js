const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log(`Successfully connected on port 3000`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.json({});
});

app.get("/redirect", (req, res) => {
  res.send("Hello redirect");
  res.redirect("user");
});

app.get("/user", (req, res) => {
  res.render("user");
});

app.get("/download", (req, res) => {
  res.download("./files/image.jpg", "document.jpg");
});

app.get("/send", (req, res) => {
  res.sendFile(__dirname + "/files/image.jpg");
});

app.get("/end", (req, res) => {
  res.write("This is testing");
  res.end();
});

app.get("/error", (req, res) => {
  res.sendStatus(200);
});

app.post("/about", (req, res) => {
  res.send(req.body);
});

app.get("/about", (req, res) => {
  res.send(req.headers.accept.split(","));
});
