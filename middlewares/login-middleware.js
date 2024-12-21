const jwt = require("jsonwebtoken");

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).send("You need to login first");
  }

  const token = req.cookies.token;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not set in environment variables");
    return res.status(500).send("Server error. Contact the administrator.");
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid or expired token. Please log in again.");
    }
    req.user = decoded; // Attach the decoded user to the request
    next();
  });
}

// Middleware to redirect if already logged in
function redirectIfLogin(req, res, next) {
  if (req.cookies && req.cookies.token) {
    return res.redirect("/profile");
  }
  next();
}

module.exports = {
  isLoggedIn,
  redirectIfLogin,
};
