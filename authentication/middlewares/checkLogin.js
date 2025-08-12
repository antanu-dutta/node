// Middleware to check if the user is logged in
export const checkLogin = (req, res, next) => {
  // If the username exists in session, user is logged in
  if (req.session.username) {
    next(); // Allow request to continue to the next middleware/route
  } else {
    // If not logged in, redirect to the login page
    res.redirect("/login");
  }
};
