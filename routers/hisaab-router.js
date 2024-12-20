const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");

const { islogedin, redirectProfile } = require("../middlewares/auth-middleware");
const { createHisaabController,hisaabPageController } = require("../controllers/hisaab-controller");

router.get("/create",islogedin,hisaabPageController)
router.post("/create",islogedin,createHisaabController)

module.exports = router; 