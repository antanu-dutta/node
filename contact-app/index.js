import express from "express";
import path from "path";
import { connectDB } from "./config/database.js";
import { fileURLToPath } from "url";
import contactRouter from "./routes/contacts.route.js";

const PORT = process.env.PORT;

const app = express();

// database connection
connectDB();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", contactRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
