import bcrypt from "bcryptjs";
import User from "../models/Users.model.js";

// registration controller
export const registration = async (req, res) => {
  const { full_name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // hashing the password
  await User.create({ full_name, email, password: hashedPassword }); // creating new user
  res.redirect("/login"); // redirecting to login route
};

// login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.render("login", { message: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.render("login", { message: "Invalid Password" });
  req.session.username = user.full_name;
  res.redirect("/");
  console.log(user);
};
