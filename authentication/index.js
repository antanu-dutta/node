import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { login, registration } from "./controllers/user.controller.js";
import { checkLogin } from "./middlewares/checkLogin.js";
dotenv.config();

// ? configation
const app = express(); // express instance
const port = 3000; // port number

// ? database connecttion
connectDB();

// ? get dirname
const __filename = fileURLToPath(import.meta.url); // filename
const __dirname = path.dirname(__filename); // directory name

// ? middlewares
app.use(express.urlencoded({ extended: true })); // accepting form data
app.use(express.json()); // accepting raw data
app.set("view engine", "ejs"); // setting view egine
app.set("views", path.join(__dirname, "views")); // setting "views" folder for view engine
app.use(express.static(path.join(__dirname, "public"))); // setting public folder for static file
app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
  })
);

// ? routes
app.get("/", checkLogin, (req, res) => {
  return res.render("home", { username: req.session.username });
});

app.get("/login", (req, res) => {
  res.render("login", { message: 0 }); // rendering the login form
});
app.post("/login", login);

app.get("/signup", (req, res) => {
  res.render("signup"); // rendering the signup form
});
app.post("/signup", registration);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.listen(port, () => console.log(`server running on ${port}`)); // listening to the server
