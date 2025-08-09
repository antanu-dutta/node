import express from "express";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Contact } from "./models/contacts.models.js";

const app = express();
const PORT = 3000;

// database connection
mongoose
  .connect(
    `mongodb+srv://antanubittu:L21V20Pmqs6XnF1s@backendusingai.qo2xcn8.mongodb.net/user-contact?retryWrites=true&w=majority&appName=backendusingai`
  )
  .then(() => console.log("Database connected"));

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", async (req, res) => {
  const contacts = await Contact.find({});
  res.render("home", { contacts });
});

app.get("/show-contact/:id", async (req, res) => {
  const _id = req.params.id;
  const user = await Contact.findOne({ _id });
  res.render("show-contact", { user });
});

app.get("/add-contact", (req, res) => {
  res.render("add-contact");
});

app.post("/add-contact", async (req, res) => {
  let { first_name, last_name, email, phone, address } = req.body;
  if (phone.startsWith(0)) {
    phone = phone.substring(1);
  }
  const contact = await Contact.create({
    first_name,
    last_name,
    email,
    phone: `+91 ${phone}`,
    address: address.replace(" ", ","),
  });

  res.redirect("/");
});

app.get("/update-contact/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update-contact", { contact });
});
app.post("/update-contact/:id", async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});
app.get("/delete-contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/")
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
