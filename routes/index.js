const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  isLoggedIn,
  redirectIfLogin,
} = require("../middlewares/login-middleware");
const userModel = require("../models/users-model");

router.get("/", redirectIfLogin, function (req, res) {
  res.render("index", { loggedin: false });
});

router.get("/profile", isLoggedIn, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("hisaab");
  res.render("profile", { user });
});

router.get("/register", redirectIfLogin, function (req, res) {
  res.render("register", { loggedin: false });
});

router.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});

router.post("/register", async function (req, res) {
  try {
    let { name, username, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.send("Sorry you already have account, please login.");

    if (process.env.JWT_SECRET) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          let createduser = await userModel.create({
            email,
            username,
            name,
            password: hash,
          });

          let token = jwt.sign(
            { email, id: createduser._id },
            process.env.JWT_SECRET
          );

          res.cookie("token", token);
          res.send("user created successfully");
        });
      });
    } else {
      res.send("you forgot the env variables");
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/login", async function (req, res) {
  try {
    let { email, password } = req.body;

    console.log(email, password);

    let user = await userModel.findOne({ email: email }).select("+password");
    if (!user) return res.send("email or password did not match");

    if (process.env.JWT_SECRET) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET);

          res.cookie("token", token);
          res.redirect("/profile");
        } else {
          res.send("koi gadbad");
        }
      });
    } else {
      res.send("you dnt have env variables setup");
    }
  } catch (err) {
    res.send(err.message);
  }
});


module.exports = router;
