const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const extFilename = path.extname(file.originalname);
    cb(null, `${Date.now()}${extFilename}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only Images are allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter,
});

// Route to render the upload form
app.get("/", (req, res) => {
  res.render("upload-form");
});

app.post(
  "/submit-form",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
  ]),
  (req, res) => {
    if (!req.files) return res.send("No file uploaded");
    res.send(req.files);
  },
  (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).send(`Multer error: ${error.message}`);
    } else if (error) {
      return res.status(500).send(`Something went wrong: ${error.message}`);
    }
    next();
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
