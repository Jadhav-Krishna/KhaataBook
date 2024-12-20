const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");

const {landingPageController,loginPageController,logoutPageController} = require("../controllers/index-controller");
const {registerPageController,postRegisterController} = require("../controllers/register-controller");
const {profileController} = require("../controllers/profile-controller");
const { islogedin, redirectProfile } = require("../middlewares/auth-middleware");

router.get("/",redirectProfile,landingPageController);

router.get("/register",registerPageController);
router.post("/register",postRegisterController);
router.get("/profile",islogedin,redirectProfile,profileController);

router.post("/login",loginPageController);
router.get("/logout",logoutPageController);

module.exports = router; 