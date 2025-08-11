import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { body, validationResult } from "express-validator";
import { error } from "console";

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views folder
app.set("views", path.join(__dirname, "views"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// validation form

const validationRegistration = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("phone")
    .trim()
    .isLength({ min: 10, max: 12 })
    .withMessage("Phone number must be between 10 and 12 digits")
    .isNumeric()
    .withMessage("Phone number must contain only digits"),

  body("address").trim().notEmpty().withMessage("Address is required"),
];

// Routes
app.get("/", (req, res) => {
  res.render("form", { error: 0 });
});

app.post("/save-form", validationRegistration, (req, res) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    res.send(req.body);
  }
  res.render("form", { error: error.array() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
